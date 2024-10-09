<script setup lang="ts">
import { CreateNew } from '~/modules/gist/screens/create-new'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>

<template>
  <CreateNew />
</template>
