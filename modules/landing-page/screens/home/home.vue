<script setup lang="ts">
import { Header, Hero } from '../../components'

const router = useRouter()

const handleLogin = () => {
  router.push('/auth/login')
}
</script>

<template>
  <MainContent>
    <template #header>
      <Header @wants-be-creator="handleLogin" />
    </template>
    <template #content>
      <Hero @wants-be-creator="handleLogin" />
    </template>
  </MainContent>
</template>
