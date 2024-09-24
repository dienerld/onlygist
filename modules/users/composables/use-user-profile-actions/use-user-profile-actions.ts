import { useClipboard, useShare } from '@vueuse/core';

export function useUserProfileActions() {
  const { share: nativeShare, isSupported } = useShare();
  const { copy } = useClipboard();
  const toast = useToast();

  const share = async (username: string) => {
    const url = `${window.location.origin}/${username}`;

    if (!isSupported.value) {
      await copy(url);

      toast.add({
        severity: 'info',
        summary: 'Sucesso',
        detail: 'Link de perfil copiado!',
        life: 2_500,
      });
      return;
    }

    nativeShare({
      url,
      title: 'Compartilhe seu perfil do Onlygist',
      text: `Veja este perfil do @${username} no Onlygist`,
    });
  };

  return {
    share,
  };
}
