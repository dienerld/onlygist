import { useSession } from '@/modules/auth/composables/use-session/useSession'

export default defineNuxtRouteMiddleware((to) => {
  const session = useSession()
  const isLogged = session.isLogged()

  if (!isLogged) {
    if (to.path === '/auth/login')
      return

    return navigateTo('/auth/login')
  }
})
