<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  title: string
  description: string
  price: number
  lang: string
}>(), {
  id: '0',
  title: 'useCurrentUser.ts',
  description: 'Hook para controlar o **usuário** logado',
  price: 10,
  lang: 'typescript',
})

const emit = defineEmits<{
  (event: 'tap', id: string): void
}>()

const { render } = useMarkdown()
const isFree = computed(() => props.price === 0)
const description = computed(() => render(props.description))
const amount = computed(() => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price))

const handleTap = () => emit('tap', props.id)
</script>

<template>
  <div class="">
    <Card>
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ props.title }}
          <Chip :label="props.lang" icon="pi pi-bolt" class="text-sm" />
        </div>
      </template>
      <template #content>
        <div v-html="description" />
      </template>
      <template #footer>
        <Button
          v-if="isFree"
          label="Baixar Gratuitamente"
          class="w-full"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          @click="handleTap"
        />
        <Button
          v-else
          :label="`Comprar por ${amount}`"
          class="w-full"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          @click="handleTap"
        />
      </template>
    </Card>
  </div>
</template>
