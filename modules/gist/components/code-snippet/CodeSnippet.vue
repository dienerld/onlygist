<script setup lang="ts">
import { createStarryNight, common } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'
import '@wooorm/starry-night/style/light'
import Loader from './Loader.vue'

const DEFAULT_CODE_SNIPPET = `
const message = 'Você precisa pagar para ter acesso a esse Gist :P'
console.log(message)
`

const props = withDefaults(defineProps<{
  isPaid: boolean
  loading: boolean
  code: string
  lang: string
}>(), {
  isPaid: false,
  loading: false,
  code: DEFAULT_CODE_SNIPPET,
  lang: 'typescript'
})

const loading = ref(true)
const htmlCode = ref('')

const registerSyntaxHighlight = async() => {
  loading.value = true
  const starryNight = await createStarryNight(common)
  const scope = starryNight.flagToScope(props.lang)
  const tree = starryNight.highlight(props.code, scope!)
  htmlCode.value = toHtml(tree)
  loading.value = false
}

onMounted(() => {
  registerSyntaxHighlight()
})

</script>

<template>
  <Loader :loading="props.loading || loading">
    <div v-if="isPaid" class="relative w-full">
      <span class="absolute left-[50%] top-[43%] z-50">
        <i class="pi pi-lock to-gray-700 text-3xl" />
      </span>
      <pre
        :class="{'blur-sm': props.isPaid}"
        class="w-full select-none overflow-x-hidden rounded bg-gray-200 p-5"
        v-html="htmlCode"
      />
    </div>

    <pre
      v-else
      class="w-full select-none overflow-x-hidden rounded bg-gray-200 p-5"
      v-html="htmlCode"
    />
  </Loader>
</template>
