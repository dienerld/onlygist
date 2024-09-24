import type { User } from '@/modules/users/entities/user';

export interface MySelfProvider {
  user: Ref<User>;
  loading: Ref<boolean>;
}
