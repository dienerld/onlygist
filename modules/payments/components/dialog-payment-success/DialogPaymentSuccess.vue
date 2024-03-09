<script setup lang="ts">

const visible = defineModel<boolean>('visible')

</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Compra efetuada com sucesso!"
    :style="{width: '400px'}"
  >
    <div class="m-0 flex w-full flex-col items-center justify-center">
      <i class="pi pi-check-circle my-5 text-6xl text-primary-500" />
      <p class="text-center text-gray-700">
        Parabéns! Sua compra foi efetuada com sucesso. <br>
        Você receberá no e-mail fornecido no checkout o seu gist.
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
