import type { SaleVirtual } from '../../entities/Sale/Sale';

interface UseSalesListOptions {
  userId: string;
}

export function useSalesList({ userId }: UseSalesListOptions) {
  const services = useServices();
  const { logAndTrack } = useLogger();
  const loading = ref(true);
  const sales = ref<SaleVirtual[]>([]);

  async function fetchSales() {
    try {
      const response = await services.payment.readAllSales(userId);
      sales.value = response;
    } catch (error) {
      logAndTrack('[useSalesList]', error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    fetchSales();
  });

  return {
    loading,
    sales,
  };
}
