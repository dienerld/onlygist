import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'

interface RequestOptions {
  email: string
}

export default defineEventHandler(async (event) => {
  const payload = await readBody<RequestOptions>(event)

  if (!payload.email) {
    throw createError({ status: 400, message: 'Email is required' })
  }

  if (!event.context.auth.isAuthenticated) {
    throw createError({ status: 401, message: 'User not authenticated' })
  }

  return 'ok'
})
