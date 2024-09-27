import type { Code, Headline } from '@/modules/gists/entities/gist';

export type CreateOptions = Headline &
  Code & {
    profileId: string;
  };
