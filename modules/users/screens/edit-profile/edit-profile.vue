<script setup lang="ts">
import { HeadlineEdit, HeadlineEditLoader } from '@/modules/users/components/headline-edit'
import { myselfKey } from '../../composables/use-myself/useMyself'

const { loading, user } = inject(myselfKey)!

const handleShare = (username: string) => {
  console.log('Compartilhar perfil de', username)
}

const handleNavigateToProfile = (username: string) => {
  console.log('Navegar para perfil de', username)
}

</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      v-if=" user"
      :avatar-url="user.avatarUrl"
      :username="user.username"
      class="my-10"
      @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
    />
  </HeadlineEditLoader>
</template>
<style scoped>

</style>
