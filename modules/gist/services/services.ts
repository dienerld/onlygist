import { v4 as uuidv4 } from 'uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '~/libs/supabase/schema';

import type { CreateOptions } from './types';
import { readOneAdapter, type ReadOneRow } from './adapters';

export const GistServices = (client: SupabaseClient<Database>) => ({
  async create({
    title,
    content,
    description,
    lang,
    price,
    profileId,
  }: CreateOptions) {
    const id = uuidv4();
    const isPaid = price !== 0;
    await client.from('gists').insert({
      id,
      profile_uid: profileId,
      is_paid: isPaid,
      title,
      description,
      lang,
      price,
      content,
    });

    return { id };
  },

  async readOne(id: string) {
    const response = await client
      .from('gists')
      .select(
        'id, title, description, lang, price, is_paid, profiles(id, username)',
      )
      .match({ id })
      .returns<ReadOneRow>()
      .single();

    return readOneAdapter(response.data);
  },
  async readOneContent(id: string) {
    const response = await client
      .from('gists')
      .select('id, content')
      .match({ id })
      .returns<ReadOneRow>()
      .single();

    return readOneAdapter(response.data);
  },
});
