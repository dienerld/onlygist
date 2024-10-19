import type { GistVirtual } from '@/modules/gist/entities/gist';

interface UseGistDeleteOptions {
  gist: Ref<GistVirtual | undefined>;
}

export function useGistDelete({ gist }: UseGistDeleteOptions) {
  const { logAndTrack } = useLogger();
  const toast = useToast();
  const services = useServices();
  const loading = ref(false);
  const gistId = ref<string>();

  const remove = async () => {
    if (!gistId.value) return;
    loading.value = true;

    try {
      await services.gist.delete(gistId.value);
      toast.add({
        severity: 'success',
        summary: 'Gist deletado com sucesso',
        detail: 'O gist foi deletado com sucesso',
        life: 3000,
      });
    } catch (error) {
      logAndTrack('[useGistDelete]', error);
    } finally {
      loading.value = false;
    }
  };

  watchEffect(() => {
    if (!gist.value) return;
    gistId.value = gist.value.id;
  });

  return {
    loading,
    remove,
  };
}
