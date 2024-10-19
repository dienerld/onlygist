import type { Code, Headline } from '~/modules/gist/entities/gist'

export type CreateOptions = Headline &
  Code & {
    profileId: string
  }

export type UpdateOptions = Partial<
  Pick<CreateOptions, 'title' | 'description' | 'lang' | 'price' | 'content'>
>

export interface ReadAllOptions {
  username: string

  to?: number
  from?: number
}
