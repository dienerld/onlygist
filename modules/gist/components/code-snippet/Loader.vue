<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="flex w-full flex-col gap-2 py-8">
    <Skeleton width="100%" height="20rem" />
  </div>

  <slot v-else />
</template>
