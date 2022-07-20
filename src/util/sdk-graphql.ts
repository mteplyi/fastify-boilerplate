import type { GraphQLError } from 'graphql-request/dist/types';

import type { PartiallyNullable } from 'src/util/types';

export const prepareGraphqlSdkResponseType = <TRes extends { data: unknown }>(
  res: TRes,
):
  | TRes
  | (Omit<TRes, 'data'> & {
      data: PartiallyNullable<TRes['data']>;
      errors: (GraphQLError & {
        type?: 'NOT_FOUND';
      })[];
    }) => res;
