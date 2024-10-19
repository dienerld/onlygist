import type { SupabaseClient } from '@supabase/supabase-js'
import type { CreateOptions, ReadAllOptions, UpdateOptions } from './types'

import { v4 as uuidv4 } from 'uuid'

import type { Database } from '~/libs/supabase/schema'
import {
  readAllAdapter,
  type ReadAllRow,
  readOneAdapter,
  type ReadOneRow,
} from './adapters'

export function GistServices(client: SupabaseClient<Database>) {
  return {
    async readAll({ username, from = 0, to = 10 }: ReadAllOptions) {
      const [total, gists] = await Promise.all([
      // count
        client
          .from('gists')
          .select('profiles!inner(id, username)', { count: 'exact', head: true })
          .eq('profiles.username', username),

        // data
        client
          .from('gists')
          .select(
            'id, title, description, lang, price, is_paid, created_at, profiles!inner(id, username)',
          )
          .eq('profiles.username', username)
          .order('created_at', { ascending: true })
          .range(from, to)
          .returns<ReadAllRow[]>(),
      ])

      return { total: total.count ?? 0, results: readAllAdapter(gists.data) }
    },

    async create({
      title,
    content,
    description,
    lang,
    price,
    profileId,
    }: CreateOptions) {
      const id = uuidv4()
      const isPaid = price !== 0
      await client.from('gists').insert({
        id,
        profile_uid: profileId,
        is_paid: isPaid,
        title,
        description,
        lang,
        price,
        content,
      })

      return { id }
    },

    async readOne(id: string) {
      const response = await client
        .from('gists')
        .select(
          'id, title, description, lang, price, is_paid, profiles(id, username)',
        )
        .match({ id })
        .returns<ReadOneRow>()
        .single()

      return readOneAdapter(response.data)
    },

    async readOneContent(id: string) {
      const response = await client
        .from('gists')
        .select('id, content')
        .match({ id })
        .returns<ReadOneRow>()
        .single()

      return readOneAdapter(response.data)
    },

    async update(id: string, data: UpdateOptions) {
      const isPaid = data.price !== 0

      await client
        .from('gists')
        .update({
          title: data.title,
          description: data.description,
          lang: data.lang,
          price: data.price,
          content: data.content,
          is_paid: isPaid,
        })
        .match({ id })

      return { id }
    },

    async delete(id: string) {
      await client.from('gists').delete().match({ id })
      return { id }
    },
  }
}
