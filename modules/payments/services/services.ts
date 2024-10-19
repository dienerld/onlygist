import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/libs/supabase/schema';
import { readAllSalesAdapter, type ReadAllSalesRow } from './adapters';

export const paymentServices = (client: SupabaseClient<Database>) => ({
  async readAllSales(userId: string) {
    const response = await client
      .from('sales')
      .select(
        'id, customer_email, created_at, gists(title, price, profile_uid)',
      )
      .eq('gists.profile_uid', userId)
      .returns<ReadAllSalesRow[]>();

    return readAllSalesAdapter(response.data);
  },
});
