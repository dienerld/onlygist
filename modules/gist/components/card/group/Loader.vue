<script setup lang="ts">
const props = withDefaults(defineProps<{
  loading: boolean
  amount: number
}>(), {
  loading: false,
  amount: 3,
})
</script>

<template>
  <template v-if="props.loading">
    <Skeleton
      v-for="i in props.amount"
      :key="i"
      width="100%"
      height="15rem"
    />
  </template>
  <template v-else>
    <slot />
  </template>
</template>
