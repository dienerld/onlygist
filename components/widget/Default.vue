<script setup lang="ts">
type Props = {
  title?: string
  subTitle?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="w-full rounded-lg bg-white p-5">
    <div v-if="props.title" class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h3 class="text-left text-lg font-bold text-gray-700">
          {{ props.title }}
        </h3>
        <p v-if="props.subTitle" class="text-left text-sm text-gray-500">
          {{ props.subTitle }}
        </p>
      </div>
      <slot name="header-actions" />
    </div>

    <div class="py-2">
      <slot />
    </div>
  </div>
</template>
