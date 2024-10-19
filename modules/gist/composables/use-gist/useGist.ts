import type { GistVirtual } from '../../entities/gist';

interface UseGistOptions {
  id: string;
}

export function useGist({ id }: UseGistOptions) {
  const { logAndTrack } = useLogger();
  const services = useServices();
  const loading = ref(false);
  const gist = ref<GistVirtual>();

  const fetchGistById = async () => {
    loading.value = true;
    try {
      const [gistReadOne, gistReadOneContent] = await Promise.all([
        services.gist.readOne(id),
        services.gist.readOneContent(id),
      ]);
      if (!gistReadOne || !gistReadOneContent) return null;
      gist.value = gistReadOne;
      gist.value.content = gistReadOneContent?.content;
    } catch (error) {
      logAndTrack('[useGist]', error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchGistById();
  });

  return {
    loading,
    gist,
    fetchGistById,
  };
}
