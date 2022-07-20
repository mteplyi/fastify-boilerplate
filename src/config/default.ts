import type { PartialDeep } from 'type-fest';

import type { Config } from 'src/config/schema';
import { Environment, LoggerLevel } from 'src/config/schema';

export const defaultConfig: PartialDeep<Config> = {
  nodeEnv: Environment.development,

  server: {
    port: 3000,
    host: '127.0.0.1',
  },

  logger: {
    enabled: true,
    level: LoggerLevel.info,
  },
};
