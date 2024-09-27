import { v4 as uuidv4 } from 'uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '~/libs/supabase/schema';

import type { CreateOptions } from './types';

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
});
