import type { FastifyPluginCallback } from 'fastify';

import { SwaggerTag } from 'src/plugins/options/fastify-swagger.options';

export const healthCheckPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '',

    schema: {
      tags: [SwaggerTag.Common],

      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'number', const: 200 },
            Message: { type: 'string', const: 'OK' },
          },
          required: ['status'],
          additionalProperties: false,
        },
      },
    } as const,

    handler(request, reply) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      reply.preventCache();
      return { status: 200, Message: 'OK' } as const;
    },
  });

  done();
};
