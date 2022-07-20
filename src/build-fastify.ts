import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import rTracer from 'cls-rtracer';
import Fastify from 'fastify';

import { api } from 'src/api';
import { requestIdHeader } from 'src/config/constants';
import { getLogger } from 'src/logger';
import { healthCheckPlugin } from 'src/plugins/health-check.plugin';
import { fastifyHelmetOptions } from 'src/plugins/options/fastify-helmet.options';
import { fastifyRateLimitOptions } from 'src/plugins/options/fastify-rate-limit.options';
import { fastifySwaggerOptions } from 'src/plugins/options/fastify-swagger.options';
import { rTracerOptions } from 'src/plugins/options/rtracer.options';
import { swaggerToFilePlugin } from 'src/plugins/swagger-to-file.plugin';
import type { MainFastifyInstance } from 'src/types';
import { generateRequestId } from 'src/util/req-id';

export interface BuildFastifyOptions {
  swaggerToFile?: boolean;
  swaggerToFileBail?: boolean;
}

export const buildFastify = async (opts: BuildFastifyOptions = {}): Promise<MainFastifyInstance> => {
  const fastify: MainFastifyInstance = Fastify({
    logger: getLogger(__filename),
    requestIdHeader,
    genReqId: generateRequestId,
    ajv: {
      customOptions: {
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true,
        allErrors: true,
      },
    },
  }).withTypeProvider<JsonSchemaToTsProvider>();

  await fastify.register(fastifySensible);
  await fastify.register(fastifyHelmet, fastifyHelmetOptions);
  await fastify.register(fastifyRateLimit, fastifyRateLimitOptions);
  await fastify.register(rTracer.fastifyPlugin, rTracerOptions);

  await fastify.register(fastifySwagger, fastifySwaggerOptions);
  if (opts.swaggerToFile) {
    await fastify.register(swaggerToFilePlugin, { bail: opts.swaggerToFileBail });
  }

  await fastify.register(healthCheckPlugin, { prefix: 'healthcheck' });
  await fastify.register(api, { prefix: 'api' });

  return fastify;
};
