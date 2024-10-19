<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'light'

useHead({
  title: '🤩 OnlyGist',
  htmlAttrs: {
    lang: 'pt-br'
  }
})

useSeoMeta({
  title: '🤩 OnlyGist - Compartilhe e monetize trechos de código!',
  ogTitle: '🤩 OnlyGist - Compartilhe e monetize trechos de código!',
  description: 'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia',
  ogDescription: 'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia'
})
</script>

<template>
  <NuxtLayout>
    <Toast />
    <NuxtPage />
  </NuxtLayout>
</template>
