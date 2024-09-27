<!-- eslint-disable func-call-spacing -->
<script setup lang="ts">
// @ts-ignore
import getProgrammingLanguage from 'detect-programming-language'
import type { ZodFormattedError } from 'zod'

import type { Gist, Headline } from '@/modules/gists/entities/gist'

const priceOptions = [
  { value: 0, label: 'Gratis' },
  { value: 5, label: 'R$5' },
  { value: 10, label: 'R$10' },
  { value: 20, label: 'R$20' },
  { value: 50, label: 'R$50' }
]

const props = defineProps<{
  errors?: ZodFormattedError<Gist>
}>()

const emit = defineEmits<{
  (e: 'language-change', lang: string): void
}>()

const headline = defineModel<Headline>({
  required: true,
  default: {
    title: '',
    description: '',
    price: 0
  }
})

const extension = computed(() => {
  const values = headline.value.title.split('.')
  if (values.length === 0) {
    return ''
  }
  const ext = values[values.length - 1]
  return `.${ext}`
})

watch(() => headline.value.title, () => {
  const mimeType = getProgrammingLanguage(extension.value)
  if (mimeType) {
    emit('language-change', mimeType)
  }
})

</script>
<template>
  <div class="flex w-full flex-col justify-center gap-8">
    <div class="flex flex-col gap-2 md:flex-row">
      <div class="flex flex-1 flex-col gap-2">
        <label for="gist-title">Título</label>
        <InputText id="gist-title" v-model="headline.title" :errors="errors?.title" placeholder="useCurrentUser.ts" type="text" />
        <small v-if="props.errors?.title">
          {{ props.errors.title._errors[0] }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="gist-price">Preço</label>
        <SelectButton v-model="headline.price" :options="priceOptions" type="number" option-value="value" option-label="label" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="gist-description">Documentação</label>
      <Textarea id="gist-description" v-model="headline.description" rows="10" placeholder="useCurrentUser() é um hook que você consegue..." type="text" />
      <small class="text-gray-600">Markdown é suportado.</small>
    </div>
  </div>
</template>
