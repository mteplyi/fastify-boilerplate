import type { GetRepositoriesQuery, Sdk } from 'src/sdk/github-graphql/sdk';
import { getSdk } from 'src/sdk/github-graphql/sdk';

export type GithubSdk = Sdk;
export const getGithubSdk = getSdk;

export namespace GetRepositoriesNs {
  export type RepositoryNode = NonNullable<
    NonNullable<NonNullable<GetRepositoriesQuery['user']>['repositories']['nodes']>[number]
  >;

  export type RefNode = NonNullable<NonNullable<NonNullable<RepositoryNode['refs']>['nodes']>[number]>;

  export type RefNodeTarget = NonNullable<RefNode['target']>;
}
