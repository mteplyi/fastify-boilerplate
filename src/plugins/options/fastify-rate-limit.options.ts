import type { RateLimitPluginOptions } from '@fastify/rate-limit';
import Redis from 'ioredis';

import { config } from 'src/config/config';
import { TooManyRequestsError } from 'src/core/errors/TooManyRequestsError';

export const fastifyRateLimitOptions: Readonly<RateLimitPluginOptions> = {
  global: false,
  // allowList: ['127.0.0.1'],
  redis: new Redis(config.redis),
  max: 20,
  timeWindow: 1000,
  skipOnError: true,
  addHeadersOnExceeding: {
    'x-ratelimit-limit': false,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
  },
  addHeaders: {
    'x-ratelimit-limit': false,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
    'retry-after': false,
  },
  errorResponseBuilder() {
    return new TooManyRequestsError();
  },
};
