import type { GistVirtual } from '@/modules/gist/entities/gist'

interface UseGistListOptions {
  username: string
}

export function useGistList({ username }: UseGistListOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(true)
  const loadingMore = ref(true)

  const PAGE_COUNT = 6
  const page = ref(0)

  const gists = ref<GistVirtual[]>([])
  const total = ref<number>(0)

  const from = computed(() => page.value * PAGE_COUNT)
  const to = computed(() => from.value + PAGE_COUNT - 1)

  async function fetchGistsByUsername() {
    if (!username)
      return
    loading.value = true

    try {
      const response = await services.gist.readAll({
        username,
        from: from.value,
        to: to.value,
      })
      gists.value = response.results
      total.value = response.total
    }
    catch (error) {
      logAndTrack('[useGistList - fetchGistsByUsername]', error)
    }
    finally {
      loading.value = false
    }
  }

  async function fetchMoreGistsByUsername() {
    const canFetchMore = to.value <= total.value
    if (!canFetchMore)
      return
    loadingMore.value = true

    try {
      page.value += 1
      const response = await services.gist.readAll({
        username,
        from: from.value,
        to: to.value,
      })

      gists.value.push(...response.results)
      loadingMore.value = false
    }
    catch (error) {
      logAndTrack('[useGistList - fetchMoreGistsByUsername]', error)
    }
    finally {
      loadingMore.value = false
    }
  }

  onMounted(() => {
    fetchGistsByUsername()
  })

  return {
    loading,
    loadingMore,
    fetchMoreGistsByUsername,
    gists,
    total,
  }
}
