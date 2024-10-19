<script setup lang="ts">
import { CreateNew } from '~/modules/gist/screens/create-new'

useHead({
  title: 'Criar Gist | OnlyGist',
})
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <CreateNew />
</template>
