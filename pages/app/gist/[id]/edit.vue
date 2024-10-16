<script setup lang="ts">
import { Edit } from '~/modules/gist/screens/edit'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>

<template>
  <Edit />
</template>
