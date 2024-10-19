import type { Database } from '~/libs/supabase/schema'

type RevenueTable = Database['public']['Tables']['sales']
type GistTable = Database['public']['Tables']['gists']

export type RevenueRow = RevenueTable['Row'] & {
  gists: GistTable['Row'] | null
}
export function totalRevenueAdapter(data: RevenueRow[] | null): number {
  if (!data)
    return 0

  return data.reduce((acc, item) => {
    const price = item.gists?.price ?? 0
    return acc + price
  }, 0)
}
