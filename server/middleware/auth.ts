import { serverSupabaseUser } from '#supabase/server'

export interface AuthContext {
  isAuthenticated: boolean
  user: { id: string | null } | null
}
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const user = await serverSupabaseUser(event)

  const isApiCall = url.pathname.startsWith('/api')

  const isWebHook = url.pathname.startsWith('/webhooks')
  if (isWebHook) {
    return
  }

  if (!isApiCall) {
    return
  }

  const context: AuthContext = {
    isAuthenticated: Boolean(user),
    user,
  }

  event.context.auth = context
})
