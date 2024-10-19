<script setup lang="ts">
import type { MySelfProvider } from '../../composables/use-myself/types'
import { AddressForm } from '@/modules/users/components/address-form'
import { BasicInfoForm } from '@/modules/users/components/base-info-form'
import { HeadlineEdit, HeadlineEditLoader } from '@/modules/users/components/headline-edit'
import { useAddressUpdate } from '@/modules/users/composables/use-address-update/use-address-update'
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { useUserProfileActions } from '@/modules/users/composables/use-user-profile-actions/use-user-profile-actions'
import { useUserUpdate } from '@/modules/users/composables/use-user-update/use-user-update'

const { loading, user } = inject(myselfKey) as MySelfProvider
const router = useRouter()
const { share } = useUserProfileActions()
const {
  loading: addressLoading,
  searchZipCode,
  address,
} = useAddressUpdate({ user })

const {
  loading: updateLoading,
  errors,
  update,
  safeParse,
} = useUserUpdate({ user })

function handleShare(username: string) {
  share(username)
}

function handleNavigateToProfile(username: string) {
  router.push(`/${username}`)
}

function handleUpdateProfile() {
  const isValid = safeParse().success
  if (!isValid || !user.value)
    return
  user.value.address = address.value
  update()
}
</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      :avatar-url="user.avatarUrl" :username="user.username" class="my-10" @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
    />
  </HeadlineEditLoader>

  <WidgetDefault title="Informações Básicas">
    <BasicInfoForm v-model="user" :erros="errors" />
  </WidgetDefault>
  <WidgetDefault class="mt-5" title="Endereço">
    <AddressForm v-model="address" :loading="addressLoading" @trigger-address-search="searchZipCode" />
  </WidgetDefault>

  <Button
    label="Atualizar" :loading="updateLoading" class="mt-5 w-full md:w-auto" icon="pi pi-pencil"
    icon-pos="right" @click="handleUpdateProfile()"
  />
</template>

<style scoped></style>
