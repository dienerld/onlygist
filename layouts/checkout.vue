<script setup lang="ts">
import { Header, HeaderLoader } from '~/modules/auth/components/header'
import { Header as HeaderNotAuthenticated } from '~/modules/landing-page/components/header'
import { useSession } from '~/modules/auth/composables/use-session/useSession'
import { useMyself } from '~/modules/users/composables/use-myself/useMyself'

const router = useRouter()
const session = useSession()

const { loading, user } = useMyself()
const nickname = computed(() => {
  if (!user.value?.name) {
    return 'Usuário'
  }
  const [nick] = user.value.name.split(' ')
  return nick
})

const profilePic = computed(() => {
  if (!user.value?.avatarUrl) {
    return 'https://www.gravatar.com/avatar/'
  }
  return user.value.avatarUrl
})

const handleLogout = async() => {
  const { error } = await session.logout()

  if (!error) {
    router.push('/')
  }
}

const handleWantsBeCreator = () => {
  router.push('/auth/login')
}

</script>

<template>
  <div class="flex size-full flex-col items-center">
    <MainContent>
      <template #header>
        <HeaderLoader :loading="loading">
          <Header
            v-if="session.isLogged()"
            :profile-pic="profilePic"
            :nickname="nickname"
            @navigate-to-new-gist="() => router.push('/app/gist/create')"
            @navigate-to-profile-edit="() => router.push('/app/profile/edit')"
            @navigate-to-sales="() => router.push('/app/sales/all')"
            @navigate-to-reports="() => router.push('/app/panel')"
            @logout="handleLogout"
          />
          <HeaderNotAuthenticated v-else @wants-be-creator="handleWantsBeCreator" />
        </HeaderLoader>
      </template>
      <template #content>
        <Splash :loading="loading" />
        <slot />
      </template>
    </MainContent>
  </div>
</template>
