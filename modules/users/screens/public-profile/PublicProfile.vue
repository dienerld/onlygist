<script setup lang="ts">
import { PublicHeadline, PublicHeadlineEmpty } from '@/modules/users/components/public-headline'
import { useScroll } from '@vueuse/core'
import { GistCardGroup, GistCardGroupLoader, GistCardItem } from '~/modules/gist/components/card'
import { useGistList } from '~/modules/gist/composables/use-gist-list/useGistList'
import { WidgetCondensed, WidgetGroup, WidgetGroupLoader } from '~/modules/reports/components/widget'
import { useGistsReports } from '~/modules/reports/composables/use-gists-reports/useGistsReports'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => services.user.readOneByUsername(route.params.username as string))
const {
  loading: loadingReports,
  totalGists,
  totalFreeGists,
  totalPaidGists,
} = useGistsReports({ user, isMyself: false })

const {
  gists,
  fetchMoreGistsByUsername: fetchMoreGists,
} = useGistList({ username: route.params.username as string })

const { arrivedState } = useScroll(window, { offset: { bottom: 100 } })

function handleNavigateToDetail(id: string) {
  const username = route.params.username as string
  router.push(`/${username}/gist/${id}`)
}

watch(
  () => arrivedState.bottom,
  (value) => {
    if (!value) {
      return
    }
    fetchMoreGists()
  },
)

defineOgImage({
  component: 'PublicProfile',
  props: {
    avatarUrl: user.value?.avatarUrl,
    author: user.value?.name,
    bio: user.value?.bio,
  },
})

useSeoMeta({
  title: `${user.value?.name} - @${user.value?.username}`,
  ogTitle: `${user.value?.name} - @${user.value?.username}`,
  description: `Veja os gists feitos por @${user.value?.username}`,
  ogDescription: `Veja os gists feitos por @${user.value?.username}`,
})
</script>

<template>
  <PublicHeadline
    v-if="user"
    :name="user.name"
    :avatar-url="user.avatarUrl"
    :bio="user.bio"
    :city="user.address?.city"
    :state="user.address?.state"
  />
  <PublicHeadlineEmpty v-else />

  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="loadingReports" :amount="3">
      <WidgetCondensed :value="totalGists" label="Gists no total" />
      <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
      <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault v-if="gists.length > 0" title="Todos os gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="loading" :amount="5">
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
