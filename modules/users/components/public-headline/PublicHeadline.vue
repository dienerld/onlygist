<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  avatarUrl: string
  bio?: string
  city?: string
  state?: string
}>(), {
  name: 'Usuário anônimo',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1792733?v=4',
  bio: undefined,
  city: undefined,
  state: undefined,
})
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-2">
    <div class="w-24 overflow-hidden rounded-full md:w-32">
      <img :src="props.avatarUrl" alt="Foto do usuário" class="w-full">
    </div>
    <h1 class="text-center text-2xl font-bold text-gray-700 md:text-3xl">
      {{ props.name }}
    </h1>
    <p
      v-if="props.bio"
      class="text-center font-normal text-gray-700 md:text-lg"
    >
      {{ props.bio }}
    </p>
    <p
      v-if="props.city && props.state"
      class="text-center text-sm font-normal text-gray-500 md:text-base"
    >
      {{ props.city }}, {{ props.state }}
    </p>
  </div>
</template>
