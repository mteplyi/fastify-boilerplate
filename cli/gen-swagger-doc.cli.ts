import '../src/bootstrap';

import { buildFastify } from 'src/build-fastify';

const swaggerToFileBail = process.argv.includes('--bail');

(async () => {
  const fastify = await buildFastify({
    swaggerToFile: true,
    swaggerToFileBail,
  });

  await fastify.ready();

  process.exit();
})().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
