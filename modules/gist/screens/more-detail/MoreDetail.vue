<script setup lang="ts">
import type { MySelfProvider } from '@/modules/users/composables/use-myself/types'
import { useSession } from '@/modules/auth/composables/use-session/useSession'
import { PublicHeadline, PublicHeadlineEmpty, PublicHeadlineLoader } from '@/modules/gist/components/public-headline'
import { useGistContent } from '@/modules/gist/composables/use-gist-content/useGistContent'
import { DialogPaymentError as LazyDialogPaymentError } from '@/modules/payments/components/dialog-payment-error'
import { DialogPaymentSuccess as LazyDialogPaymentSuccess } from '@/modules/payments/components/dialog-payment-success'
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { GistCodeSnippet } from '~/modules/gist/components/code-snippet'

const route = useRoute()
const router = useRouter()

const { user } = inject(myselfKey) as MySelfProvider
const session = useSession()
const services = useServices()

const isPaymentSuccessfully = ref(false)
const isPaymentFail = ref(false)

function handleNavigateToGistEdit() {
  router.push(`/app/gist/${route.params.id}/edit`)
}

const { data: gist, pending: loading } = await useLazyAsyncData('gist-detail', () => services.gist.readOne(route.params.slug as string))

const { gistContent, loading: loadingGistContent, refetch } = useGistContent({ gist })

onMounted(() => {
  const { success_payment: success, fail_payment: fail } = route.query
  if (success) {
    isPaymentSuccessfully.value = true
  }

  if (fail) {
    isPaymentFail.value = true
  }
})

watch(gist, () => {
  refetch()
})

defineOgImage({
  component: 'GistDetail',
  props: {
    title: `${gist.value?.title} - @${gist.value?.profiles.username}`,
    description: gist.value?.description,
  },
})

useSeoMeta({
  title: `${gist.value?.title} - @${gist.value?.profiles.username}`,
  ogTitle: `${gist.value?.title} - @${gist.value?.profiles.username}`,
  description: `Veja o gist "${gist.value?.title}" feito por @${gist.value?.profiles.username}`,
  ogDescription: `Veja o gist "${gist.value?.title}" feito por @${gist.value?.profiles.username}`,
})
</script>

<template>
  <PublicHeadlineLoader :loading>
    <PublicHeadline
      v-if="gist"
      :title="gist.title"
      :description="gist.description"
      :price="gist.price"
      :author="gist.profiles.username"
      :lang="gist.lang"
    />
    <PublicHeadlineEmpty v-else />
  </PublicHeadlineLoader>
  <GistCodeSnippet
    v-if="gist"
    :loading="loadingGistContent"
    :lang="gist.lang"
    :code="gistContent"
    :is-paid="gist.isPaid"
  />
  <div
    v-if="gist"
    class="flex flex-col gap-2 md:flex-row"
  >
    <Button
      v-if="user?.username !== route.params.username"
      label="Comprar por 10"
      class="mt-5 w-full md:w-auto"
      icon-pos="right"
      icon="pi pi-shopping-bag"
    />
    <Button
      v-if="user?.username === route.params.username && session.isLogged()"
      label="Editar este gist"
      class="mt-5 w-full md:w-auto"
      icon-pos="right"
      icon="pi pi-pencil"
      @click="handleNavigateToGistEdit"
    />
  </div>
  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFail" />
</template>
