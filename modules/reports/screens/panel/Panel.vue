<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'

const { user } = inject(myselfKey)!

</script>

<template>
  <div>
    {{ user?.name ?? 'Carregando' }}
  </div>
</template>
