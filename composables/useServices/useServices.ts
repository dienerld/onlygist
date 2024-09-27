import type { Database } from '~/libs/supabase/schema';
import { AuthGithubService } from '~/modules/auth/services/service';
import { UserServices } from '~/modules/users/services';
import { GistServices } from '~/modules/gists/services';

export function useServices() {
  const supabase = useSupabaseClient<Database>();
  const config = useRuntimeConfig();

  return {
    auth: AuthGithubService(supabase, {
      redirectTo: `${config.public.siteUrl}/auth/github`,
    }),
    user: UserServices(supabase),
    gist: GistServices(supabase),
  };
}
