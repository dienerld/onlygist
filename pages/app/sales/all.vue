<script setup lang="ts">
import Sales from '@/modules/payments/screens/sales/Sales.vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})
</script>

<template>
  <Sales />
</template>
