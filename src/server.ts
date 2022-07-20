import { buildFastify } from 'src/build-fastify';
import { config } from 'src/config/config';
import { Environment } from 'src/config/schema';

export const start = async () => {
  const fastify = await buildFastify({
    swaggerToFile: config.nodeEnv === Environment.development,
  });

  await fastify.listen(config.server);
};
