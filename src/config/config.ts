import Ajv from 'ajv';
import camelCase from 'camelcase';
import { deepmerge } from 'deepmerge-ts';
import dotenv from 'dotenv';
import { envSchema } from 'env-schema';
import { flatten, unflatten } from 'flat';

import { configKeyDelimiter } from 'src/config/constants';
import { defaultConfig } from 'src/config/default';
import type { Config } from 'src/config/schema';
import { configSchema } from 'src/config/schema';
import { snakeCase } from 'src/util/text';

export const getEnvUnflatten = (obj: Record<string, unknown>): Record<string, unknown> => {
  return unflatten(obj, { delimiter: configKeyDelimiter, transformKey: camelCase });
};

export const getEnvFlatten = <TReturnValue = unknown>(obj: Record<string, unknown>): Record<string, TReturnValue> => {
  return flatten(obj, { delimiter: configKeyDelimiter, transformKey: snakeCase });
};

const prepareConfig = (data: Record<string, unknown>): Config => {
  return envSchema<Config>({
    data: deepmerge(defaultConfig, data),
    schema: configSchema,
    ajv: new Ajv({
      allErrors: true,
      removeAdditional: true,
      useDefaults: true,
      coerceTypes: true,
      allowUnionTypes: true,
    }),
  });
};

dotenv.config();

const unflattenProcessEnv = getEnvUnflatten(process.env);

export const config = prepareConfig(unflattenProcessEnv);
