<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wants-login-with-github'): void
}>()

const props = defineProps<{
loading: boolean
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 rounded bg-gray-50 p-6">
    <h2 class="text-gray-700">
      Entre com sua conta.
    </h2>

    <Button
      :loading="props.loading"
      label="Continuar com Github"
      icon="pi pi-github"
      icon-pos="right"
      @click="()=>emit('wants-login-with-github')"
    />
  </div>
</template>
