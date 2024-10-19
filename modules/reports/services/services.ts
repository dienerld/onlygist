import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/libs/supabase/schema';
import { totalRevenueAdapter, type RevenueRow } from './adapters';

export const reportServices = (client: SupabaseClient<Database>) => ({
  async totalGistsPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact', head: true })
      .match({ profile_uid: userId });

    return response.count;
  },

  async totalFreeGistsPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact', head: true })
      .match({ profile_uid: userId, is_paid: false });

    return response.count;
  },

  async totalPaidGistsPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact', head: true })
      .match({ profile_uid: userId, is_paid: true });

    return response.count;
  },

  async totalSoldGistsPublished(userId: string) {
    const response = await client
      .from('sales')
      .select('*, gists(profile_uid)', { count: 'exact', head: true })
      .match({ 'gists.profile_uid': userId });

    return response.count;
  },

  async totalRevenue(userId: string) {
    const response = await client
      .from('sales')
      .select('gists(price, profile_uid)')
      .match({ 'gists.profile_uid': userId })
      .returns<RevenueRow[]>();

    return totalRevenueAdapter(response.data);
  },
});
