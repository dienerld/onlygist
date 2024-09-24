<script setup lang="ts">
import { HeadlineEdit, HeadlineEditLoader } from '@/modules/users/components/headline-edit'
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { useUserProfileActions } from '@/modules/users/composables/use-user-profile-actions/use-user-profile-actions'
import { BasicInfoForm } from '@/modules/users/components/base-info-form'
import { AddressForm } from '@/modules/users/components/address-form'

const { loading, user } = inject(myselfKey)!
const router = useRouter()
const { share } = useUserProfileActions()
const handleShare = (username: string) => {
  share(username)
}

const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}

</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      :avatar-url="user.avatarUrl"
      :username="user.username"
      class="my-10"
      @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
    />
  </HeadlineEditLoader>

  <WidgetDefault title="Informações Básicas">
    <BasicInfoForm />
  </WidgetDefault>
  <WidgetDefault class="mt-5" title="Endereço">
    <AddressForm :loading="false" />
  </WidgetDefault>
</template>
<style scoped>

</style>
