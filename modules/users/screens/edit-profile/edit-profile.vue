<script setup lang="ts">
import { HeadlineEdit, HeadlineEditLoader } from '@/modules/users/components/headline-edit'
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { useUserProfileActions } from '@/modules/users/composables/use-user-profile-actions/use-user-profile-actions'
import { useAddressUpdate } from '@/modules/users/composables/use-address-update/use-address-update'
import { useUserUpdate } from '@/modules/users/composables/use-user-update/use-user-update'
import { BasicInfoForm } from '@/modules/users/components/base-info-form'
import { AddressForm } from '@/modules/users/components/address-form'

const { loading, user } = inject(myselfKey)!
const router = useRouter()
const { share } = useUserProfileActions()
const {
  loading: addressLoading,
  searchZipCode,
  address
} = useAddressUpdate({ user })


const {
  loading: updateLoading,
  erros,
  update,
  safeParse
} = useUserUpdate({ user })


const handleShare = (username: string) => {
  share(username)
}

const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}


const handleUpdateProfile = () => {
  const isValid = safeParse().success
  if (!isValid || !user.value) return
  user.value.address = address.value
  update()
}

</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit :avatar-url="user.avatarUrl" :username="user.username" class="my-10" @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile" />
  </HeadlineEditLoader>

  <WidgetDefault title="Informações Básicas">
    <BasicInfoForm v-model="user" :erros="erros" />
  </WidgetDefault>
  <WidgetDefault class="mt-5" title="Endereço">
    <AddressForm :loading="addressLoading" v-model="address" @trigger-address-search="searchZipCode" />
  </WidgetDefault>

  <Button label="Atualizar" @click="handleUpdateProfile()" :loading="updateLoading" class="mt-5 w-full md:w-auto"
    icon="pi pi-pencil" icon-pos="right" />
</template>
<style scoped></style>
