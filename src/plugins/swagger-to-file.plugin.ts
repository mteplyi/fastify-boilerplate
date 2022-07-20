import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { MainFastifyPluginCallback } from 'src/types';

export interface SwaggerToFilePluginOptions {
  filePath?: string;
  bail?: boolean;
}

export const swaggerToFilePlugin: MainFastifyPluginCallback<SwaggerToFilePluginOptions> = (fastify, opts, done) => {
  const { filePath = 'docs/swagger.yaml', bail = false } = opts;

  fastify.addHook('onReady', async () => {
    if (typeof fastify.swagger !== 'function') {
      fastify.log.error('Fastify Swagger plugin was not registered');
      return;
    }

    const swaggerDocument = fastify.swagger({ yaml: true }) as unknown as string;

    const existingSwaggerDocument = await readFile(filePath, 'utf8').catch(() => {});

    if (swaggerDocument === existingSwaggerDocument) {
      return;
    }

    if (bail) {
      const relativeFilePath = path.relative('', filePath);
      throw new Error(
        `Swagger document(${relativeFilePath}) is not up-to-date. You can update it with a script \`swagger:gen-doc\`.`,
      );
    }

    await writeFile(filePath, swaggerDocument);
  });

  done();
};
