<script setup lang="ts">
import { GistCardGroup, GistCardGroupLoader, GistCardItem } from '@/modules/gist/components/card'
import { useGistList } from '@/modules/gist/composables/use-gist-list/useGistList'
import PaymentSetupAlert from '@/modules/payments/components/payment-setup-alert/PaymentSetupAlert.vue'
import { WidgetCondensed, WidgetGroup, WidgetGroupLoader } from '@/modules/reports/components/widget'
import { useGistsReports } from '@/modules/reports/composables/use-gists-reports/useGistsReports'
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'

import { useScroll } from '@vueuse/core'
import { useStripeAccountCreate } from '~/modules/payments/composables/use-stripe-account-create/useStripeAccountCreate'
import { useStripeAccountValidate } from '~/modules/payments/composables/use-stripe-account-validate/useStripeAccountValidate'

const route = useRoute()
const router = useRouter()
const { arrivedState } = useScroll(window, { offset: { bottom: 100 } })

const { user } = inject(myselfKey)!
const {
  loading: loadingReports,
  totalGists,
  totalFreeGists,
  totalPaidGists,
  totalSoldGists,
} = useGistsReports({ user, isMyself: true })

const {
  gists,
  loading: loadingGists,
  fetchMoreGistsByUsername: fetchMoreGists,
} = useGistList({ username: user.value.username })

const { create, loading: paymentCreateLoading } = useStripeAccountCreate()
const { isValid, validate } = useStripeAccountValidate()

function handleNavigateToDetail(id: string) {
  router.push(`/${user.value.username}/gist/${id}`)
}

async function handlePaymentSetup() {
  const response = await create(user.value.email)
  if (!response) {
    return
  }

  window.location.href = response.onboardingUrl
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

onMounted(async () => {
  validate(user.value.paymentConnectedAccount)
})
</script>

<template>
  <PaymentSetupAlert v-if="!isValid" :loading="paymentCreateLoading" @setup="handlePaymentSetup" />

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
