import type { GistVirtual } from '@/modules/gist/entities/gist'

interface UseGistContentOptions {
  gist: Ref<GistVirtual | undefined | null>
}

export function useGistContent({ gist }: UseGistContentOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref(false)
  const gistId = ref('')
  const isPaid = ref(false)
  const gistContent = ref('')

  async function fetchGistContent() {
    if (!gist.value)
      return
    if (isPaid.value) {
      gistContent.value = ''
      return
    }
    loading.value = true
    try {
      const response = await services.gist.readOneContent(gistId.value)
      if (response)
        gistContent.value = response.content
    }
    catch (error) {
      logAndTrack(error)
    }
    finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value)
      return
    gistId.value = gist.value.id
    isPaid.value = gist.value.isPaid
  })

  onMounted(() => {
    fetchGistContent()
  })

  return {
    loading,
    gistContent,
    refetch: fetchGistContent,
  }
}
