import type { SupabaseClient } from '@supabase/supabase-js';

interface ServiceOptions {
  redirectTo: string;
}

export const AuthGithubService = (
  client: SupabaseClient,
  options: ServiceOptions,
) => ({
  async signInWithGithub() {
    const response = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: options.redirectTo,
      },
    });
    return response;
  },

  async signOut() {
    const response = await client.auth.signOut();
    return response;
  },
});
