import type { Database } from '~/libs/supabase/schema';
import { AuthGithubService } from '~/modules/auth/services/service';

export function useServices() {
  const supabase = useSupabaseClient<Database>();
  const config = useRuntimeConfig();

  return {
    auth: AuthGithubService(supabase, {
      redirectTo: `${config.public.siteUrl}/auth/github`,
    }),
  };
}
