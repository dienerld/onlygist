<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="flex w-full flex-col justify-center gap-4 rounded bg-white p-5">
    <div class="flex gap-4">
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
    </div>
    <Skeleton height="10rem" width="100%" />
  </div>
  <slot v-else />
</template>
