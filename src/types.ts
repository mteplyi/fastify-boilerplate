import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import type {
  ContextConfigDefault,
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from 'fastify';
import type { FastifyLoggerInstance } from 'fastify/types/logger';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { FastifySchema } from 'fastify/types/schema';
import type { RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify/types/utils';

import type { HttpError } from 'src/core/errors';

export type MainFastifyTypeProvider = JsonSchemaToTsProvider;

export type MainFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyLoggerInstance,
  MainFastifyTypeProvider
>;

export type MainFastifyErrorHandler<TError extends Error = FastifyError | HttpError> = (
  error: TError,
  request: FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression,
    FastifySchema,
    MainFastifyTypeProvider
  >,
  reply: FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    RouteGenericInterface,
    ContextConfigDefault,
    FastifySchema,
    MainFastifyTypeProvider
  >,
) => unknown | Promise<unknown>;

export type MainFastifyPluginCallback<Options extends FastifyPluginOptions = Record<never, never>> =
  FastifyPluginCallback<Options, RawServerDefault, MainFastifyTypeProvider>;

export type MainFastifyPluginAsync<Options extends FastifyPluginOptions = Record<never, never>> = FastifyPluginAsync<
  Options,
  RawServerDefault,
  MainFastifyTypeProvider
>;
