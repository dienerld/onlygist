<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'setup'): void
}>()
</script>

<template>
  <Card>
    <template #content>
      <div class="flex items-center gap-4">
        <i class="pi pi-info-circle text-yellow-700 !text-4xl" />

        <div class="flex flex-col flex-1">
          <h4 class="text-yellow-700 text-xl">
            Complete os dados de pagamento!
          </h4>
          <p class="text-base">
            É necessário fazer a criação da conta de pagamentos para ativar sua conta.
          </p>
        </div>
        <Button
          :loading="props.loading"
          label="Completar"
          icon-pos="right"
          icon="pi pi-arrow-right"
          size="small"
          @click="() => emit('setup')"
        />
      </div>
    </template>
  </Card>
</template>
