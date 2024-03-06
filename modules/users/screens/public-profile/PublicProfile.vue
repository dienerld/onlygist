<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/public-headline/PublicHeadline.vue'
import WidgetGroupLoader from '@/modules/reports/components/widget/group/Loader.vue'
import WidgetGroup from '@/modules/reports/components/widget/group/Group.vue'
import WidgetCondensed from '@/modules/reports/components/widget/condensed/Condensed.vue'

const load = ref(true)
</script>

<template>
  <PublicHeadline name="Diener Dornelas" avatar-url="https://github.com/dienerld.png" />
  <WidgetGroup>
    <WidgetGroupLoader :loading="load" :amount="3">
      <WidgetCondensed :value="8" label="Gists no total" />
      <WidgetCondensed :value="4" label="Gists gratuitos" />
      <WidgetCondensed :value="4" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists" sub-title="any">
    gists
  </WidgetDefault>

  <Button @click="load = !load">
    Click me
  </Button>
</template>
