import { resolve } from 'node:path';

import type { Logger, LoggerOptions } from 'pino';
import pino from 'pino';

import { config } from 'src/config/config';
import { Environment } from 'src/config/schema';
import { getRequestId } from 'src/util/req-id';

const prepareNamespace = (ns: string): string => ns.replace(/.+\/src/, '').replace(/.(js|ts)$/, '');

export const createLogger = ({ name, options }: { name?: string; options?: LoggerOptions } = {}): Logger => {
  const pinoOptions: LoggerOptions = {
    ...config.logger,
    ...options,
    base: {},
    mixin() {
      return { reqId: getRequestId() };
    },
  };

  if (name) {
    pinoOptions.name = prepareNamespace(name);
  }

  if (config.nodeEnv === Environment.development) {
    pinoOptions.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: true,
      },
    };
  }

  let pinoInstance = pino(pinoOptions);

  if ([Environment.testing, Environment.development].includes(config.nodeEnv)) {
    // eslint-disable-next-line
    pinoInstance = require('pino-caller')(pinoInstance, {
      relativeTo: resolve(__dirname, '..'),
    });
  }

  return pinoInstance;
};

const logger = createLogger();

export const getLogger = (name?: string) => {
  if (!name) {
    return logger;
  }

  return logger.child({
    name: prepareNamespace(name),
  });
};
