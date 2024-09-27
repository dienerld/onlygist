import { z } from 'zod';
import type { ZodFormattedError } from 'zod';
import type { User } from '@/modules/users/entities/user';

const schema = z.object({
  username: z.string(),
  name: z.string().min(3, 'Nome é obrigátorio').max(20),
  site: z.string().url().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
});

interface UseUserUpdateOptions {
  user: Ref<User>;
}

export function useUserUpdate({ user: userRef }: UseUserUpdateOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast();
  const services = useServices();

  const loading = ref(false);
  const user = ref<User>();
  const errors = ref<ZodFormattedError<User>>();

  const safeParse = () => {
    const result = schema.safeParse(user.value);
    if (!result.success) {
      errors.value = result.error.format();
    }

    return result
  }

  const update = async () => {
    loading.value = true;
    try {
      if (!user.value) return
      await services.user.update(user.value.id, user.value);
      toast.add({
        severity: 'success',
        summary: 'Atualizado com sucesso!',
        detail: 'Dados atualizados com sucesso!',
        life: 3000,
      })
    } catch (error) {
      logAndTrack(error);
    } finally {
      loading.value = false;

    }
  }

  watchEffect(() => {
    if (!userRef.value) return;
    user.value = userRef.value;
  })

  return {
    loading,
    errors,
    user,
    update,
    safeParse
  }

}
