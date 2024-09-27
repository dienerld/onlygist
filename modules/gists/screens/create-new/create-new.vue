<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { HeadlineEdit } from '@/modules/gists/components/headline-edit'

const { user, loading } = inject(myselfKey)!
</script>

<template>
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit />
  </WidgetDefault>
</template>
