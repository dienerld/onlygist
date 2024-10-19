import type { User } from '@/modules/users/entities/user';

interface UseGistsReportsOptions {
  user: Ref<User | undefined | null>;
  isMyself: boolean;
}

export function useGistsReports({ user, isMyself }: UseGistsReportsOptions) {
  const services = useServices();
  const { logAndTrack } = useLogger();
  const loading = ref(true);
  const userId = ref<string>();

  const totalGists = ref(0);
  const totalFreeGists = ref(0);
  const totalPaidGists = ref(0);
  const totalSoldGists = ref(0);

  async function fetchGistsReports() {
    if (!userId.value) return;
    loading.value = true;

    try {
      const requests = [
        services.report.totalGistsPublished(userId.value),
        services.report.totalFreeGistsPublished(userId.value),
        services.report.totalPaidGistsPublished(userId.value),
      ];
      if (isMyself) {
        requests.push(services.report.totalSoldGistsPublished(userId.value));
      }
      const [total, free, paid, sold] = await Promise.all(requests);
      totalGists.value = total ?? 0;
      totalFreeGists.value = free ?? 0;
      totalPaidGists.value = paid ?? 0;
      totalSoldGists.value = sold ?? 0;
    } catch (error) {
      logAndTrack('[useGistsReports]', error);
    } finally {
      loading.value = false;
    }
  }

  watchEffect(() => {
    if (!user.value) return;
    userId.value = user.value.id;
    fetchGistsReports();
  });

  return {
    loading,
    totalGists,
    totalFreeGists,
    totalPaidGists,
    totalSoldGists,
  };
}
