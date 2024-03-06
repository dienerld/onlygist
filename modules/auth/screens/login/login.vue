<script setup lang="ts">
import SocialForm from '@/modules/auth/components/social-form/social-form.vue'
const loading = ref(false)

const handleGithubLogin = async() => {
  loading.value = true
  // TODO: call api
  // sleep
  await new Promise(resolve => setTimeout(resolve, 2000))
}
</script>

<template>
  <section class="flex h-screen w-full flex-col items-center justify-center gap-5 bg-gray-50">
    <Logo />
    <SocialForm :loading="loading" @wants-login-with-github="handleGithubLogin" />
  </section>
</template>
