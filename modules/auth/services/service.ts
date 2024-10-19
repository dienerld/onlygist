import type { SupabaseClient } from '@supabase/supabase-js'

interface ServiceOptions {
  redirectTo: string
}

export function AuthGithubService(client: SupabaseClient, options: ServiceOptions) {
  return {
    async signInWithGithub() {
      const response = await client.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: options.redirectTo,
        },
      })
      return response
    },

    async signOut() {
      const response = await client.auth.signOut()
      return response
    },
  }
}
