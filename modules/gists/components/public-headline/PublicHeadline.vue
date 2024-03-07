<script setup lang="ts">
const { render } = useMarkdown()

const props = withDefaults(defineProps<{
  title: string
  lang: string
  description: string
  author: string
}>(), {
  title: 'currency_format.py',
  lang: 'python',
  description: 'Função para formatar valores _monetários_',
  author: 'dienerld'
})

const description = computed(() => render(props.description))
</script>

<template>
  <div class="flex w-full flex-col justify-center gap-2 py-5">
    <div class="flex flex-wrap items-center gap-2">
      <h1 class="text-2xl font-bold text-gray-700 md:text-3xl">
        {{ props.title }}
      </h1>
      <Chip :label="props.lang" class="text-sm" icon="pi pi-bolt" />
    </div>
    <div class="to-gray-700 font-normal md:text-xl" v-html="description" />
    <p class="text-sm text-gray-500 md:text-base">
      <i class="pi pi-star" /> by <NuxtLink :to="`/${props.author}`" class="text-primary-500">
        @{{ props.author }}
      </NuxtLink>
    </p>
  </div>
</template>
