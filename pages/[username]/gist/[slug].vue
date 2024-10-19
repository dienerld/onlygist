<script setup lang="ts">
import { MoreDetail } from '~/modules/gist/screens/more-detail'

useHead({
  title: 'Detalhes do Gist | OnlyGist',
})

definePageMeta({
  layout: 'checkout',
})
</script>

<template>
  <MoreDetail />
</template>
