<script setup lang="ts">
import { PublicHeadline } from '../../components/public-headline'
import { DialogPaymentSuccess as LazyDialogPaymentSuccess } from '@/modules/payments/components/dialog-payment-success'
import { GistCodeSnippet } from '@/modules/gists/components/code-snippet'
import { DialogPaymentError as LazyDialogPaymentError } from '~/modules/payments/components/dialog-payment-error'

const route = useRoute()
const isPaymentSuccessfully = ref(false)
const isPaymentFail = ref(false)

onMounted(() => {
  const { success_payment: success, fail_payment: fail } = route.query
  if (success) {
    isPaymentSuccessfully.value = true
  }

  if (fail) {
    isPaymentFail.value = true
  }
})
</script>

<template>
  <PublicHeadline />
  <GistCodeSnippet />
  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFail" />
</template>
