import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/libs/supabase/schema'
import { AuthGithubService } from '~/modules/auth/services/service'
import { GistServices } from '~/modules/gist/services'
import { paymentServices } from '~/modules/payments/services/services'
import { reportServices } from '~/modules/reports/services/services'
import { UserServices } from '~/modules/users/services'

export function useServices() {
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const config = useRuntimeConfig()

  return {
    auth: AuthGithubService(supabase, {
      redirectTo: `${config.public.siteUrl}/auth/github`,
    }),
    user: UserServices(supabase),
    gist: GistServices(supabase),
    report: reportServices(supabase),
    payment: paymentServices(supabase),
  }
}
