import { getRepositoriesSchema } from 'src/api/v1/repositories/schema/get-repositories.schema';
import { repositoryService } from 'src/core/context';
import { SwaggerTag } from 'src/plugins/options/fastify-swagger.options';
import type { MainFastifyPluginCallback } from 'src/types';

export const repositories: MainFastifyPluginCallback = (fastify, options, done) => {
  const tags = [SwaggerTag.Repositories] as const;

  fastify.route({
    method: 'GET',
    url: '/repositories',
    schema: { tags, ...getRepositoriesSchema },
    async handler(req) {
      const { login } = req.query;
      return repositoryService.findAll({ login });
    },
  });

  done();
};
