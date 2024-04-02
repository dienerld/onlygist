<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

</script>

<template>
  <div v-if="props.loading" class="flex size-full items-center justify-center">
    <span class="animate-pulse text-6xl">🤩</span>
  </div>
  <slot v-else />
</template>
