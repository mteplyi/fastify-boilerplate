import type { FastifyHelmetOptions } from '@fastify/helmet';

export const fastifyHelmetOptions: Readonly<FastifyHelmetOptions> = {
  contentSecurityPolicy: false,
  dnsPrefetchControl: false,
  hidePoweredBy: false,
  ieNoOpen: false,
  referrerPolicy: false,
  xssFilter: false,
};
