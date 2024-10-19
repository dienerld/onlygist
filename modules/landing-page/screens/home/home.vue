<script setup lang="ts">
import { Header, Hero } from '../../components'

const router = useRouter()

function handleLogin() {
  router.push('/auth/login')
}

defineOgImage({
  component: 'Main',
  props: {
    title: 'OnlyGist',
    description: 'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia',
  },
})
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
