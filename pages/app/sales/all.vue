<script setup lang="ts">
import Sales from '~/modules/payments/screens/sales/Sales.vue'

useHead({
  title: 'Minhas Vendas | OnlyGist',
})

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})
</script>

<template>
  <Sales />
</template>
