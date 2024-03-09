<script setup lang="ts">
import { Header } from '~/modules/auth/components/header'
import { useSession } from '~/modules/auth/composables/use-session/useSession'

const router = useRouter()

const session = useSession()
const handleLogout = async() => {
  const { error } = await session.logout()

  if (!error) {
    router.push('/')
  }
}

</script>

<template>
  <div class="flex size-full flex-col items-center">
    <MainContent>
      <template #header>
        <Header
          profile-pic="dsd"
          nickname="dsd"
          @navigate-to-new-gist="() => router.push('/app/gists/create')"
          @navigate-to-profile-edit="() => router.push('/app/profile/edit')"
          @navigate-to-sales="() => router.push('/app/sales/all')"
          @navigate-to-reports="() => router.push('/app/panel')"
          @logout="handleLogout"
        />
      </template>
      <template #content>
        <slot />
      </template>
    </MainContent>
  </div>
</template>
