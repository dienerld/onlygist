<script setup lang="ts">
import PublicProfile from '~/modules/users/screens/public-profile/PublicProfile.vue'

useHead({
  title: 'Perfil publico | OnlyGist',
})

definePageMeta({
  layout: 'checkout',
})
</script>

<template>
  <PublicProfile />
</template>
