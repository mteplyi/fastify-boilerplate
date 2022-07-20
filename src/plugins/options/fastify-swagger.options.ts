import type { SwaggerOptions } from '@fastify/swagger';
import packageJson from 'package.json';

import { requestIdHeader } from 'src/config/constants';

export enum SwaggerTag {
  Common = 'Common',
  Repositories = 'Repositories',
}

export const fastifySwaggerOptions: Readonly<SwaggerOptions> = {
  mode: 'dynamic',
  routePrefix: '/doc',
  uiConfig: { docExpansion: 'none', deepLinking: true },
  openapi: {
    info: {
      title: `${packageJson.name} swagger`,
      description:
        `### Global Response Headers\n` +
        `\`\`\`\n` +
        `   - ${requestIdHeader} - the ID of the tracing forest\n` +
        `\`\`\`\n`,
      version: packageJson.version,
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    // servers: [{ url: `http://${config.server.host}:${config.server.port}` }],
    // components: {
    //   securitySchemes: {
    //     http: { type: 'http', scheme: 'Bearer' },
    //   },
    // },
    tags: [
      {
        name: SwaggerTag.Common,
        description: 'Common endpoints',
      },
      {
        name: SwaggerTag.Repositories,
        description: 'Repositories related endpoints',
      },
    ],
  },
  exposeRoute: true,
  hideUntagged: true,
};
