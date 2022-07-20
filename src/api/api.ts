import { v1 } from 'src/api/v1';
import type { MainFastifyPluginAsync } from 'src/types';

export const api: MainFastifyPluginAsync = async (fastify) => {
  if (typeof fastify.rateLimit === 'function') {
    fastify.addHook('onRequest', fastify.rateLimit());
  }

  await fastify.register(v1, { prefix: 'v1' });
  // await fastify.register(v2, { prefix: 'v2' });
};
