<script setup lang="ts">
import { Edit } from '~/modules/gist/screens/edit'

useHead({
  title: 'Editar Gist | OnlyGist',
})
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <Edit />
</template>
