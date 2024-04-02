import type { InjectionKey } from 'vue';
import { useSession } from '@/modules/auth/composables/use-session/useSession';
import type { User } from '@/modules/users/entities/user';
import type { MySelfProvider } from './types';
export const myselfKey = Symbol('myself') as InjectionKey<MySelfProvider>;

export function useMyself() {
  const { logAndTrack } = useLogger();
  const services = useServices();
  const user = ref<User>();
  const loading = ref(true);
  const session = useSession();
  provide<MySelfProvider>(myselfKey, { user, loading });

  const fetchUser = async () => {
    loading.value = true;
    try {
      const response = await services.user.getMyself(session.user.value!.id);
      if (!response) return;

      user.value = response;
    } catch (error) {
      logAndTrack('useMyself', error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchUser();
  });

  return {
    loading,
    user,
  };
}
