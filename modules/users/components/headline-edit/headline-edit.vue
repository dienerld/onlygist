<script setup lang="ts">
const props = defineProps<{
  username: string
  avatarUrl: string
}>()

const emit = defineEmits<{
  (e: 'share', username: string): void
  (e: 'navigate-to-profile', username: string): void
}>()
</script>

<template>
  <div class="flex items-center justify-center flex-col gap-2">
    <div class="w-24 overflow-hidden rounded-full md:w-32">
      <img :src="props.avatarUrl" alt="foto perfil usuário">
    </div>
    <h1 class="text-2xl font-bold text-gray-700 md:text-3xl">
      @{{ props.username }}
    </h1>

    <div class="mt-2 flex gap-2">
      <Button
        label="Ver Perfil"
        size="small"
        icon="pi pi-star"
        icon-pos="right"
        @click="() => emit('navigate-to-profile', props.username)"
      />
      <Button
        label="Compartilhar"
        size="small"
        icon="pi pi-share-alt"
        icon-pos="right"
        @click="() => emit('share', props.username)"
      />
    </div>
  </div>
</template>
