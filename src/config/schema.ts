import type { FromSchema } from 'json-schema-to-ts';

import { getEnumSchema } from 'src/util/json-schema';

export enum Environment {
  // noinspection JSUnusedGlobalSymbols
  testing = 'testing',
  development = 'development',
  production = 'production',
}

export enum LoggerLevel {
  // noinspection JSUnusedGlobalSymbols
  'trace' = 'trace',
  'debug' = 'debug',
  'info' = 'info',
  'warn' = 'warn',
  'error' = 'error',
  'fatal' = 'fatal',
  'silent' = 'silent',
}

export const configSchema = {
  type: 'object',
  properties: {
    nodeEnv: getEnumSchema(Environment),

    server: {
      type: 'object',
      properties: {
        port: { type: 'number' },
        host: { type: 'string' },
      },
      required: ['port', 'host'],
      additionalProperties: false,
    },

    logger: {
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        level: getEnumSchema(LoggerLevel),
      },
      additionalProperties: false,
    },

    github: {
      type: 'object',
      properties: {
        token: { type: 'string', minLength: 1 },
      },
      required: ['token'],
      additionalProperties: false,
    },

    redis: {
      type: 'object',
      properties: {
        port: { type: 'number' },
        host: { type: 'string' },
      },
      required: ['port', 'host'],
      additionalProperties: false,
    },
  },
  required: ['nodeEnv', 'server', 'github', 'redis'],
  additionalProperties: false,
} as const;

export type Config = FromSchema<typeof configSchema>;
