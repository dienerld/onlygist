<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/use-myself/useMyself'
import { HeadlineEdit } from '~/modules/gist/components/headline-edit'
import { CodeEdit } from '~/modules/gist/components/code-edit'
import { useGistUpdate } from '~/modules/gist/composables/use-gist-update/useGistUpdate'
import { useGist } from '@/modules/gist/composables/use-gist/useGist'
import { useGistDelete } from '@/modules/gist/composables/use-gist-delete/useGistDelete'

const router = useRouter()
const route = useRoute()
const confirm = useConfirm()
const { user } = inject(myselfKey)!

const { gist } = useGist({ id: route.params.slug as string })
const { code, update, errors, headline, loading, safeParse } = useGistUpdate({ gist })
const { loading: loadingDelete, remove: deleteGist } = useGistDelete({ gist })

confirm.require({
  message: 'Tem certeza que deseja excluir este gist?',
  header: 'Excluir gist?',
  rejectLabel: 'Cancelar',
  acceptLabel: 'Quero excluir!',
  icon: 'pi pi-exclamation-triangle',
  accept: async() => {
    await deleteGist()
    router.push(`/${user.value.username}`)
  }
})

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}
const handleUpdateGist = async() => {
  const isValid = safeParse().success
  if (!isValid) {
    return
  }

  const response = await update()
  if (response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}

const handleDeleteGist = () => {

}

</script>

<template>
  <ConfirmDialog />

  <WidgetDefault title="Atualize seu gist!" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgetDefault title="Code" class="my-5">
    <ClientOnly>
      <CodeEdit v-model="code" :errors />
    </ClientOnly>
  </WidgetDefault>
  <div class="flex gap-2">
    <Button
      class="mt-5 w-full md:w-auto"
      :loading
      label="Criar"
      icon="pi pi-plus"
      icon-pos="right"
      @click="handleUpdateGist"
    />
    <Button
      class="mt-5 w-full md:w-auto"
      :loading="loadingDelete"
      severity="danger"
      label="Excluir"
      @click="handleDeleteGist"
    />
  </div>
</template>
