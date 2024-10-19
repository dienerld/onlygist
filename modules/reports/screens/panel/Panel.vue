<script setup lang="ts">
import { WidgetCondensed, WidgetGroup, WidgetGroupLoader } from '@/modules/reports/components/widget'
import { GistCardGroup, GistCardGroupLoader, GistCardItem } from '@/modules/gist/components/card'

import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { useGistsReports } from '@/modules/reports/composables/use-gists-reports/useGistsReports'
import { useGistList } from '~/modules/gist/composables/use-gist-list/useGistList'
import { useScroll } from '@vueuse/core'

const route = useRoute()
const router = useRouter()

const { user } = inject(myselfKey)!
const {
  loading: loadingReports,
  totalGists,
  totalFreeGists,
  totalPaidGists,
  totalSoldGists
} = useGistsReports({ user, isMyself: true })

const {
  gists,
  loading: loadingGists,
  fetchMoreGistsByUsername: fetchMoreGists
} = useGistList({ username: user.value.username })

const handleNavigateToDetail = (id: string) => {
  const { username } = route.params
  router.push(`/${username}/gist/${id}`)
}

const { arrivedState } = useScroll(window, { offset: { bottom: 100 } })
watch(
  () => arrivedState.bottom,
  (value) => {
    if (!value) { return }
    fetchMoreGists()
  })

</script>

<template>
  <WidgetGroup>
    <WidgetGroupLoader :loading="loadingReports" :amount="3">
      <WidgetCondensed :value="totalGists" label="Gists no total" />
      <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
      <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
      <WidgetCondensed :value="totalSoldGists" label="Gists Vendidos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault v-if="gists.length > 0" title="Todos os gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="loadingGists" :amount="5">
        <GistCardItem
          v-for="gist in gists"
          :id="gist.id"
          :key="gist.id"
          :title="gist.title"
          :description="gist.description"
          :price="gist.price"
          :lang="gist.lang"
          @tap="handleNavigateToDetail"
        />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
