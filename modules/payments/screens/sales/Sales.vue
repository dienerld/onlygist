<script setup lang="ts">
import { WidgetCondensed, WidgetGroup, WidgetGroupLoader } from '@/modules/reports/components/widget'
import { formatCurrencyToBRL } from '~/libs/currency/format'

import { useSalesReport } from '~/modules/reports/composables/use-sales-report/useSalesReport'
import { myselfKey } from '~/modules/users/composables/use-myself/useMyself'

const { user } = inject(myselfKey)!

const { loading, grossRevenue, netRevenue } = useSalesReport({ userId: user.value.id })

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
    <WidgetGroupLoader :loading :amount="3">
      <WidgetCondensed :value="localeGrossRevenue" label="Valor Bruto" />
      <WidgetCondensed :value="localeNetRevenue" label="Valor para saque" />
    </WidgetGroupLoader>
  </WidgetGroup>
</template>
