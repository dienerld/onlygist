import type { Code, Headline } from '~/modules/gist/entities/gist';

export type CreateOptions = Headline &
  Code & {
    profileId: string;
  };
