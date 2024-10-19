<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="flex flex-col items-center gap-2 py-8">
    <Skeleton shape="circle" size="10rem" />
    <Skeleton width="18rem" height="2rem" />
    <div class="flex gap-2">
      <Skeleton width="8rem" height="2rem" />
      <Skeleton width="8rem" height="2rem" />
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>
