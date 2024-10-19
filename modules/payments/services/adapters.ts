import type { SaleVirtual } from '@/modules/payments/entities/Sale/Sale'
import type { Database } from '~/libs/supabase/schema'

type RevenueTable = Database['public']['Tables']['sales']
type GistTable = Database['public']['Tables']['gists']

export type ReadAllSalesRow = RevenueTable['Row'] & {
  gists: GistTable['Row'] | null
}

export function readAllSalesAdapter(
  data: ReadAllSalesRow[] | null,
): SaleVirtual[] {
  if (!data)
    return []

  return data.map((item) => {
    return {
      id: item.id,
      gistId: item.gist_id ?? '',
      customerEmail: item.customer_email,
      gists: {
        title: item.gists?.title ?? '',
        price: item.gists?.price ?? 0,
      },
      createdAt: new Date(item.created_at),
    }
  })
}
