<script setup lang="ts">
import { CreateNew } from '@/modules/gists/screens/create-new'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>

<template>
  <CreateNew />
</template>
