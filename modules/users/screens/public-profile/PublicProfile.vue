<script setup lang="ts">
import { PublicHeadline } from '../../components/public-headline'
import { WidgetCondensed, WidgetGroup, WidgetGroupLoader } from '@/modules/reports/components/widget'
import { GistCardGroup, GistCardGroupLoader, GistCardItem } from '@/modules/gists/components/card'

const route = useRoute()
const router = useRouter()
const load = ref(false)

const handleNavigateToDetail = (id: string) => {
  const { username } = route.params
  router.push(`/${username}/gist/${id}`)
}

const gists = [
  {
    id: '0',
    title: 'useCurrentUser.ts',
    description: 'Hook para controlar o **usuário** logado',
    price: 10,
    lang: 'typescript'
  },
  {
    id: '1',
    title: 'useStorage.ts',
    description: 'Hook para controlar o **armazenamento** local',
    price: 0,
    lang: 'typescript'

  }
]

</script>

<template>
  <PublicHeadline name="Diener Dornelas" avatar-url="https://github.com/dienerld.png" />
  <WidgetGroup>
    <WidgetGroupLoader :loading="load" :amount="3">
      <WidgetCondensed :value="8" label="Gists no total" />
      <WidgetCondensed :value="4" label="Gists gratuitos" />
      <WidgetCondensed :value="4" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists" sub-title="any">
    <GistCardGroup>
      <GistCardGroupLoader :loading="load" :amount="5">
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
