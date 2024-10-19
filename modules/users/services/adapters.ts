import type { Address } from '../entities/address';
import type { User } from '../entities/user';
import type { Database } from '~/libs/supabase/schema';
import type { SearchAddressResponse } from './types';

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

export function searchAddressByZipCodeAdapter(
  data: SearchAddressResponse,
): Address {
  return {
    city: data.localidade,
    state: data.uf,
    zipCode: data.cep,
    neighborhood: data.bairro,
    complement: data.complemento,
    street: data.logradouro,
    number: '',
  };
}

export function readOneByUsernameAdapter(data: Row | null): User | null {
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
