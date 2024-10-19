<script setup lang="ts">
const props = defineProps<{
  author: string
  avatarUrl: string
  bio?: string
}>()
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center bg-[#f97316]">
    <img :src="props.avatarUrl" alt="Foto do usuário" width="170" height="170" class="rounded-full">
    <h1 class="text-center text-6xl font-bold text-white">
      {{ props.author }}
    </h1>

    <p v-if="props.bio" class="text-center text-4xl font-normal text-white ">
      {{ props.bio }}
    </p>
  </div>
</template>
