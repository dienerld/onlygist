import type { ZodFormattedError } from 'zod'
import { z } from 'zod'

import type { Code, Gist, GistVirtual, Headline } from '~/modules/gist/entities/gist'

const schema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  description: z.string().min(10, 'Uma documentação é obrigatória'),
  price: z.number(),
  content: z.string().min(10, 'Um código é obrigatório'),
  lang: z.string().optional(),
})

interface UseGistUpdateOptions {
  gist: Ref<GistVirtual | undefined>
}

export function useGistUpdate({ gist }: UseGistUpdateOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref(false)
  const errors = ref<ZodFormattedError<Gist>>()
  const headline = ref<Headline>({
    title: '',
    description: '',
    price: 0,
  })
  const code = ref<Code>({
    content: '',
    lang: 'typescript',
  })

  const safeParse = () => {
    const result = schema.safeParse({
      ...headline.value,
      ...code.value,
    })

    if (!result.success) {
      errors.value = result.error.format()
    }
    return result
  }

  const update = async () => {
    if (!gist.value) {
      return
    }
    loading.value = true
    try {
      const { id } = await services.gist.update(gist.value?.id, {
        ...headline.value,
        ...code.value,
      })
      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Gist atualizado com sucesso!',
      })
      return { id }
    }
    catch (error: any) {
      logAndTrack(error)
      toast.add({
        severity: 'error',
        summary: 'Erro ao atualizar o gist',
        detail: error.message,
      })
      return
    }
    finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value)
      return
    headline.value = {
      title: gist.value.title,
      description: gist.value.description,
      price: gist.value.price,
    }
    code.value = {
      content: gist.value.content,
      lang: gist.value.lang,
    }
  })

  return {
    errors,
    loading,
    headline,
    code,
    safeParse,
    update,
  }
}
