<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import type { Code, Gist } from '~/modules/gist/entities/gist'

const props = defineProps<{
  errors?: ZodFormattedError<Gist>
}>()

const DEFAULT_CODE = `
interface User {
  name: string,
  role: string
}

function useCurrentUser(): User {
  return {
    name: 'John Doe',
    role: 'admin'
  }
}
`

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  padding: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  fontSize: 15,
}

const code = defineModel<Code>({
  required: true,
  default: {
    content: DEFAULT_CODE,
    lang: 'typescript',
  },
})
</script>

<template>
  <div class="flex h-[500px] w-full flex-col gap-2">
    <label for="editor">Escreva o código</label>
    <VueMonacoEditor
      id="editor"
      v-model:value="code.content"
      theme="vs"
      :options="MONACO_EDITOR_OPTIONS"
      class="border-2 border-solid bg-gray-100"
      :default-language="code.lang"
      :language="code.lang.toLowerCase()"
    />
    <small v-if="props.errors?.content">
      {{ props.errors.content._errors[0] }}
    </small>
  </div>
</template>
