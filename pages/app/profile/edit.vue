<script setup lang="ts">
import { EditProfile } from '@/modules/users/screens/edit-profile'
useHead({
  title: 'Editar Perfil | OnlyGist'
})
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <EditProfile />
</template>
