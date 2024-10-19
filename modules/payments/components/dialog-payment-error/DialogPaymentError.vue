<script setup lang="ts">
const visible = defineModel<boolean>('visible')
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erro ao efetuar a compra!"
    :style="{ width: '400px' }"
  >
    <div class="m-0 flex w-full flex-col items-center justify-center">
      <i class="pi pi-check-circle my-5 text-6xl text-primary-500" />
      <p class="text-center text-gray-700">
        Sentimos muito por isso! <br>
        Por favor, tente efetuar a compra novamente.
      </p>
    </div>

    <template #footer>
      <div class="flex w-full justify-center">
        <Button
          label="Voltar"
          icon="pi pi-arrow-left"
          @click="visible = false"
        />
      </div>
    </template>
  </Dialog>
</template>
