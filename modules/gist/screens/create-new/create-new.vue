<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { CodeEdit } from '~/modules/gist/components/code-edit'
import { HeadlineEdit } from '~/modules/gist/components/headline-edit'
import { useGistCreate } from '~/modules/gist/composables/use-gist-create/useGistCreate'

const router = useRouter()
const { user } = inject(myselfKey)!
const { code, create, errors, headline, loading, safeParse } = useGistCreate({ user })

function handleLanguageChange(lang: string) {
  code.value.lang = lang
}
async function handleCreateGist() {
  const isValid = safeParse().success
  if (!isValid) {
    return
  }

  const response = await create()
  if (response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}
</script>

<template>
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgetDefault title="Code" class="my-5">
    <ClientOnly>
      <CodeEdit v-model="code" :errors />
    </ClientOnly>
  </WidgetDefault>

  <Button
    class="mt-5 w-full md:w-auto"
    :loading
    label="Criar"
    icon="pi pi-plus"
    icon-pos="right"
    @click="handleCreateGist"
  />
</template>
