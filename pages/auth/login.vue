<script setup lang="ts">
import { Login } from '@/modules/auth/screens'

useHead({
  title: 'Entrar | OnlyGist',
})
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <Login />
</template>
