import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import { z, zh } from 'h3-zod'

import type { Database } from '~/libs/supabase/schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = await serverSupabaseClient<Database>(event)
  const body = await zh.useSafeValidatedBody(event, z.object({
    username: z.string(),
    gistId: z.string(),
  }))

  if (!body.success) {
    throw createError({ status: 400, message: body.error.message })
  }
  const { username, gistId } = body.data

  const { data: gistDb } = await supabase.from('gists').select('id,price').eq('id', gistId).single()

  if (!gistDb?.price) {
    throw createError({ status: 400, message: 'Gist not found' })
  }

  const price = gistDb.price as 5 | 10 | 15

  const prices = {
    5: config.prices[5],
    10: config.prices[10],
    15: config.prices[15],
  }

  const stripe = await useServerStripe(event)

  const response = await supabase
    .from('profiles')
    .select('payment_connected_account')
    .eq('username', username)
    .maybeSingle()

  if (!response.data) {
    throw createError({ status: 404, message: 'User not found' })
  }

  if (!response.data.payment_connected_account) {
    throw createError({ status: 422, message: `stripe account of ${username} not configured` })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: prices[price],
        quantity: 1,
      },
    ],
    payment_intent_data: {
      transfer_data: {
        amount: Math.round(price * 100),
        destination: response.data.payment_connected_account,
      },
    },
    client_reference_id: gistId,
    success_url: `${config.public.siteUrl}/${username}/gist/${gistId}?success_payment=t`,
    cancel_url: `${config.public.siteUrl}/${username}/gist/${gistId}?fail_payment=t`,
  })

  return {
    id: session.id,
    checkoutUrl: session.url,
  }
})
