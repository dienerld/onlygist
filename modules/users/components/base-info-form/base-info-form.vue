<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import type { User } from '@/modules/users/entities/user'

const props = defineProps<{
  errors?: ZodFormattedError<User>
}>()

const user = defineModel<User>({
  required: false,
  default: {
    name: '',
    site: '',
    bio: '',
    phone: ''
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 md:flex-row">
      <div class="flex flex-1 flex-col gap-2">
        <label for="name" class="text-sm font-medium text-gray-700">Nome</label>
        <InputText id="name" v-model="user.name" placeholder="Diener" />
        <small v-if="props.errors?.name">{{ props.errors?.name?._errors[0] }}</small>
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <label for="site" class="text-sm font-medium text-gray-700">Site</label>
        <InputText id="name" v-model="user.site" placeholder="dienerld.dev" />
        <small v-if="props.errors?.site">{{ props.errors?.site?._errors[0] }}</small>
      </div>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
      <div class="flex flex-1 flex-col gap-2">
        <label for="bio" class="text-sm font-medium text-gray-700">Bio</label>
        <InputText id="name" v-model="user.bio" placeholder="Software Engineer" />
        <small v-if="props.errors?.bio">{{ props.errors?.bio?._errors[0] }}</small>
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <label for="phone" class="text-sm font-medium text-gray-700">Telefone</label>
        <InputText id="phone" v-model="user.phone" placeholder="+55 (33) 99999-9999" />
        <small v-if="props.errors?.phone">{{ props.errors?.phone?._errors[0] }}</small>
      </div>
    </div>
  </div>
</template>
