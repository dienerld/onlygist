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
    createdAt: data.created_at,
  };
}
