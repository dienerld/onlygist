import { applyPayoutFeesToGrossValue } from '@/modules/payments/entities/Sale/Sale'

interface UseSalesReportOptions {
  userId: string
}

export function useSalesReport({ userId }: UseSalesReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()
  const loading = ref(true)
  const grossRevenue = ref(0)
  const netRevenue = ref(0)

  async function fetchTotalRevenue() {
    if (!userId)
      return
    loading.value = true

    try {
      const total = await services.report.totalRevenue(userId)
      grossRevenue.value = total
      netRevenue.value = total === 0 ? 0 : applyPayoutFeesToGrossValue(total)
    }
    catch (error) {
      logAndTrack('[useSalesReport]', error)
    }
    finally {
      loading.value = false
    }
  }
  onMounted(() => {
    fetchTotalRevenue()
  })

  return {
    loading,
    grossRevenue,
    netRevenue,
  }
}
