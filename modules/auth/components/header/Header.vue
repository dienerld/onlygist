<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const emit = defineEmits<{
  (e: 'navigate-to-new-gist'): void
  (e: 'navigate-to-profile-edit'): void
  (e: 'navigate-to-sales'): void
  (e: 'navigate-to-reports'): void
  (e: 'logout'): void
}>()

const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

const menu = ref<{toggle: Function} | null>(null)

const items: MenuItem[] = [
  {
    label: 'Painel',
    icon: 'pi pi-chart-line',
    command: () => emit('navigate-to-reports')
  },
  {
    label: 'Novo Gist',
    icon: 'pi pi-plus',
    command: () => emit('navigate-to-new-gist')
  }, {
    label: 'Vendas',
    icon: 'pi pi-shopping-cart',
    command: () => emit('navigate-to-sales')
  },
  {
    label: 'Editar Perfil',
    icon: 'pi pi-user-edit',
    command: () => emit('navigate-to-profile-edit')
  },
  {
    separator: true
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => emit('logout')
  }
]

const toggleMenu = (e: Event) => menu.value?.toggle(e)

</script>

<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 py-2.5 lg:px-6">
      <div class="mx-auto flex max-w-screen-lg items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/app/panel" class="text-lg font-bold text-gray-800">
            <Logo />
          </NuxtLink>
        </div>

        <div class="flex items-center">
          <button
            class="flex items-center gap-2"
            aria-haspopup="true"
            aria-controls="header-auth-menu"
            @click="toggleMenu"
          >
            <span class="text-lg text-gray-700">Olá, {{ props.nickname }}</span>
            <div v-if="props.profilePic" class="size-9 overflow-hidden rounded-full">
              <img :src="props.profilePic" alt="Foto de Perfil do usuário">
            </div>
          </button>
        </div>

        <Menu id="header-auth-menu" ref="menu" :model="items" popup />
      </div>
    </nav>
  </header>
</template>
