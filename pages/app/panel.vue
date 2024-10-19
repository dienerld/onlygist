<script setup lang="ts">
import { Panel } from '~/modules/reports/screens'
useHead({
  title: 'Painel | OnlyGist'
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

</script>

<template>
  <Panel />
</template>
