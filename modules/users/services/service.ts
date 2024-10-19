import type { User } from '@/modules/users/entities/user'
import type { SupabaseClient } from '@supabase/supabase-js'

import type { SearchAddressResponse } from './types'

import type { Database } from '~/libs/supabase/schema'
import {
  getMyselfAdapter,
  readOneByUsernameAdapter,
  searchAddressByZipCodeAdapter,
} from './adapters'

export function UserServices(client: SupabaseClient<Database>) {
  return {
    async getMyself(id: string) {
      const response = await client
        .from('profiles')
        .select('*')
        .eq('id', id)
        .limit(1)
        .single()
      const user = getMyselfAdapter(response.data)
      return user
    },

    async searchAddressByZipCode(zipCode: string) {
      const url = `https://viacep.com.br/ws/${zipCode}/json/`
      const response = await $fetch<SearchAddressResponse>(url)
      const address = searchAddressByZipCodeAdapter(response)
      return { data: address }
    },

    async update(id: string, { name, site, bio, phone, address }: User) {
      await client
        .from('profiles')
        .update({
          name,
          site,
          bio,
          phone,
          address: {
            zipCode: address?.zipCode,
            street: address?.street,
            number: address?.number,
            complement: address?.complement,
            neighborhood: address?.neighborhood,
            city: address?.city,
            state: address?.state,
          },
        })
        .eq('id', id)

      return { id }
    },

    async readOneByUsername(username: string) {
      const response = await client
        .from('profiles')
        .select()
        .eq('username', username)
        .limit(1)
        .single()

      const user = readOneByUsernameAdapter(response.data)
      return user
    },
  }
}
