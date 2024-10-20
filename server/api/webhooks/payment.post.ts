import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import { useCompiler } from '#vue-email'
import { z, zh } from 'h3-zod'
import JSZip from 'jszip'
import { Resend } from 'resend'
import { v4 as uuidV4 } from 'uuid'
import type { Database } from '~/libs/supabase/schema'

interface StripeEvent {
  cliente_reference_id: string
  customer_details: {
    name: string
    email: string
  }
}

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event)

  const config = useRuntimeConfig()
  const stripe = await useServerStripe(event)
  const supabase = await serverSupabaseClient<Database>(event)

  const signature = getHeader(event, 'Stripe-Signature') ?? ''
  const stripeEvent = stripe.webhooks.constructEvent(rawBody!, signature, config.stripeWebhookSecret)

  const ALLOWED_EVENTS = ['checkout.session.completed']
  if (!ALLOWED_EVENTS.includes(stripeEvent.type)) {
    return
  }
  const paymentIntentEvent = stripeEvent.data.object as unknown as StripeEvent

  const gist = await supabase
    .from('gists')
    .select('id, content, title, description')
    .eq('id', paymentIntentEvent.cliente_reference_id)
    .maybeSingle()

  await supabase
    .from('sales')
    .insert({
      id: uuidV4(),
      customer_email: paymentIntentEvent.customer_details.email,
      gist_id: paymentIntentEvent.cliente_reference_id,
    })

  const zip = new JSZip()
  zip.file(gist.data!.title, gist.data!.content)
  zip.file('README.md', gist.data!.description)

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

  const template = await useCompiler('GistSales.vue', {
    props: {
      name: paymentIntentEvent.customer_details.name,
    },
  })

  const resend = new Resend(config.resendKey)
  resend.emails.send({
    from: 'noreply@dienerld.dev',
    to: paymentIntentEvent.customer_details.email,
    subject: 'Seu gist chegou! 🎉 OnlyGist',
    html: template,
    attachments: [
      {
        filename: `${gist.data!.title}.zip`,
        content: zipBuffer,
      },
    ],
  })
})
