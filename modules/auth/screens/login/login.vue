<script setup lang="ts">
import { SocialForm } from '../../components/social-form'
const services = useServices()
const loading = ref(false)

const handleGithubLogin = async() => {
  loading.value = true
  await services.auth.signInWithGithub()
}
</script>

<template>
  <section class="flex h-screen w-full flex-col items-center justify-center gap-5 bg-gray-50">
    <Logo />
    <SocialForm :loading="loading" @wants-login-with-github="handleGithubLogin" />
  </section>
</template>
