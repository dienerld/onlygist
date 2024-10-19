<script setup lang="ts">
import type { Sale } from '@/modules/payments/entities/Sale/Sale'
import { formatCurrencyToBRL } from '~/libs/currency/format'

const props = defineProps<{
  sales: Sale[]
}>()
</script>

<template>
  <DataTable
    :value="props.sales"
    table-class="min-width: 40rem"
    size="large"
  >
    <Column field="gists.title" header="Gist" />
    <Column field="customerEmail" header="Cliente" />
    <Column header="Preço">
      <template #body="{ data }">
        {{ formatCurrencyToBRL(data.gists.price) }}
      </template>
    </Column>

    <Column header="Data">
      <template #body="{ data }">
        {{ data.createdAt.toLocaleDateString('pt-BR') }}
      </template>
    </Column>
  </DataTable>
</template>
