import type { Database } from '~/libs/supabase/schema';
import type { GistVirtual } from '~/modules/gist/entities/gist';

type ProfileTable = Database['public']['Tables']['profiles'];
type GistTable = Database['public']['Tables']['gists'];

export type ReadOneRow = GistTable['Row'] & {
  profiles: ProfileTable['Row'] | null;
};

export function readOneAdapter(data: ReadOneRow | null): GistVirtual | null {
  if (!data) return null;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    profileId: data.profiles?.id || '',
    lang: data.lang,
    price: data.price,
    isPaid: data.is_paid,
    profiles: {
      id: data.profiles?.id,
      username: data.profiles?.username,
    },
    content: data.content,
    createdAt: new Date(data.created_at),
  };
}

export type ReadAllRow = GistTable['Row'] & {
  profiles: ProfileTable['Row'] | null;
};

export function readAllAdapter(data: ReadAllRow[] | null): GistVirtual[] {
  if (!data) return [];

  return data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      profileId: item.profiles?.id || '',
      lang: item.lang,
      price: item.price,
      isPaid: item.is_paid,
      profiles: {
        id: item.profiles?.id,
        username: item.profiles?.username,
      },
      content: item.content,
      createdAt: new Date(item.created_at),
    };
  });
}
