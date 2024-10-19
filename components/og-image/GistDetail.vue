<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center bg-[#f97316]">
    <h1 class="text-center text-6xl font-bold text-white">
      {{ props.title }}
    </h1>

    <p class="text-center text-4xl font-normal text-white ">
      {{ props.description }}
    </p>
  </div>
</template>
