import type { Address } from '../entities/address';
import type { User } from '../entities/user';
import type { Database } from '~/libs/supabase/schema';

type ProfileTable = Database['public']['Tables']['profiles'];
type Row = ProfileTable['Row'];

export function getMyselfAdapter(data: Row | null): User | null {
  if (!data) {
    return null;
  }

  return {
    id: data.id,
    username: data.username,
    name: data.name,
    avatarUrl: data.avatar_url,
    bio: data.bio ?? undefined,
    phone: data.phone ?? undefined,
    site: data.site ?? undefined,
    address: data.address as unknown as Address,
    createdAt: new Date(data.created_at),
  };
}
