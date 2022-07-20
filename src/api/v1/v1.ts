import { errorHandler } from 'src/api/v1/error-handler';
import { repositories } from 'src/api/v1/repositories';
import type { MainFastifyPluginAsync } from 'src/types';

export const v1: MainFastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler(errorHandler);

  // fastify.addHook('onRequest', (request, reply, done) => {
  //   const { headers } = request;
  //
  //   const supportedAcceptType = 'application/json';
  //
  //   if (headers.accept && !headers.accept.includes(supportedAcceptType)) {
  //     throw new NotAcceptableError(
  //       `Accept type '${headers.accept}' is not supported; '${supportedAcceptType}' is only one supported.`,
  //     );
  //   }
  //
  //   done();
  // });

  await fastify.register(repositories);
};
