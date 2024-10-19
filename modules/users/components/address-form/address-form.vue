<script setup lang="ts">
import type { Address } from '@/modules/users/entities/address'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  errors?: ZodFormattedError<Address>
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'trigger-address-search'): void
}>()

const address = defineModel<Address>({
  required: false,
  default: {
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 lg:flex-row">
      <div class="flex flex-1 flex-col gap-2 lg:flex-row">
        <div class="flex flex-1 flex-col gap-2">
          <label for="cep">CEP
            <i v-if="props.loading" class="pi pi-spinner pi-spin animate-spin text-2xl text-gray-500" />
          </label>
          <InputText
            id="cep"
            v-model="address.zipCode"
            v-maska
            placeholder="00000-000"
            data-maska="#####-###"
            @blur="() => emit('trigger-address-search')"
          />
        </div>

        <div class="flex flex-1 flex-col gap-2">
          <label for="number">Número</label>
          <InputText id="number" v-model="address.number" placeholder="123" />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 lg:flex-row">
      <div class="flex flex-1 flex-col gap-2 md:flex-row">
        <div class="flex flex-1 flex-col gap-2">
          <label for="city">Cidade</label>
          <InputText id="city" v-model="address.city" placeholder="São Paulo" />
        </div>

        <div class="flex flex-1 flex-col gap-2">
          <label for="state">Estado</label>
          <InputText id="state" v-model="address.state" placeholder="SP" />
          <small v-if="props.errors?.state">{{ props.errors?.state?._errors[0] }}</small>
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-2 md:flex-row">
        <div class="flex flex-1 flex-col gap-2">
          <label for="neighborhood">Bairro</label>
          <InputText id="neighborhood" v-model="address.neighborhood" placeholder="Centro" />
        </div>

        <div class="flex flex-1 flex-col gap-2">
          <label for="complement">Complemento</label>
          <InputText id="complement" v-model="address.complement" placeholder="SP" />
          <small v-if="props.errors?.complement">{{ props.errors?.complement?._errors[0] }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
