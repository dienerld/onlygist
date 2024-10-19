<script setup lang="ts">
import { formatCurrencyToBRL } from '~/libs/currency/format'
import { WidgetCondensed, WidgetGroup, WidgetGroupLoader } from '@/modules/reports/components/widget'
import { useSalesReport } from '~/modules/reports/composables/use-sales-report/useSalesReport'
import { myselfKey } from '~/modules/users/composables/use-myself/useMyself'
import { useSalesList } from '~/modules/payments/composables/use-sales-list/useSalesList'
import { SalesTableLoader } from '../../components/sales-table'
import SalesTable from '../../components/sales-table/SalesTable.vue'

const { user } = inject(myselfKey)!

const { loading: loadingRevenue, grossRevenue, netRevenue } = useSalesReport({ userId: user.value.id })
const { loading, sales } = useSalesList({ userId: user.value.id })

const localeGrossRevenue = computed(() => {
  if (!grossRevenue.value) { return 'R$ 0' }

  return formatCurrencyToBRL(grossRevenue.value)
})
const localeNetRevenue = computed(() => {
  if (!netRevenue.value) { return 'R$ 0' }

  return formatCurrencyToBRL(netRevenue.value)
})
</script>

<template>
  <WidgetGroup>
    <WidgetGroupLoader :loading="loadingRevenue" :amount="3">
      <WidgetCondensed :value="localeGrossRevenue" label="Valor Bruto" />
      <WidgetCondensed :value="localeNetRevenue" label="Valor para saque" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault v-if="sales.length !== 0" title="Listagem de vendas">
    <SalesTableLoader :loading="loading">
      <SalesTable :sales="sales" />
    </SalesTableLoader>
  </WidgetDefault>
</template>
