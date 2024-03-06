<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wants-be-creator'): void
}>()
</script>

<template>
  <section class="flex size-full flex-col items-center justify-center">
    <h1 class="mb-4 text-balance text-center text-3xl font-extrabold text-black lg:text-5xl">
      Compartilhe e monetize trechos de códigos
    </h1>
    <p class="mb-8 text-balance text-center text-xl text-black lg:text-3xl">
      Ganhe uma renda extra com os códigos que você faz no dia-a-dia
    </p>
    <div class="flex flex-col items-center justify-center">
      <Button
        label="Continuar como creator"
        icon-pos="right"
        icon="pi pi-arrow-right"
        @click="()=>emit('wants-be-creator')"
      />
    </div>
  </section>
</template>
