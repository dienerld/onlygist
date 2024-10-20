import type { SupabaseClient } from '@supabase/supabase-js'
import type { CreateCheckoutOptions, CreateCheckoutResponse, CreatePayoutAccountResponse, IsAccountValidResponse } from './types'
import type { Database } from '~/libs/supabase/schema'
import { readAllSalesAdapter, type ReadAllSalesRow } from './adapters'

export function paymentServices(client: SupabaseClient<Database>) {
  return {
    async readAllSales(userId: string) {
      const response = await client
        .from('sales')
        .select(
          'id, customer_email, created_at, gists(title, price, profile_uid)',
        )
        .eq('gists.profile_uid', userId)
        .returns<ReadAllSalesRow[]>()

      return readAllSalesAdapter(response.data)
    },
    async createCheckout({ gistId, username }: CreateCheckoutOptions): Promise<CreateCheckoutResponse> {
      const response = await $fetch<CreateCheckoutResponse>(`/api/payments/checkout`, {
        method: 'POST',
        body: { username, gistId },
      })
      return response
    },
    async createPayoutAccount(email: string): Promise<CreatePayoutAccountResponse> {
      const response = await $fetch<CreatePayoutAccountResponse>(`/api/payments/accounts`, {
        method: 'POST',
        body: { email },
      })
      return response
    },
    async isAccountValid(accountId: string): Promise<IsAccountValidResponse> {
      const response = await $fetch<IsAccountValidResponse>(`/api/payments/accounts/${accountId}/valid`)
      return response
    },
  }
}
