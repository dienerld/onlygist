<script setup lang="ts">
import { Panel } from '~/modules/reports/screens'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

</script>

<template>
  <Panel />
</template>
