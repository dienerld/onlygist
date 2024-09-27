<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { HeadlineEdit } from '@/modules/gists/components/headline-edit'
import { CodeEdit } from '@/modules/gists/components/code-edit'

const { user, loading } = inject(myselfKey)!
</script>

<template>
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit />
  </WidgetDefault>

  <WidgetDefault title="Code" class="my-5">
    <ClientOnly>
      <CodeEdit />
    </ClientOnly>
  </WidgetDefault>
</template>
