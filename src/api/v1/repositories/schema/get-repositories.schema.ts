export const getRepositoriesSchema = {
  querystring: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1 },
    },
    required: ['login'],
    additionalProperties: false,
  },

  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          ownerLogin: { type: 'string' },
          branches: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                lastCommitOid: { type: 'string' },
              },
              required: ['name', 'lastCommitOid'],
              additionalProperties: false,
            },
          },
        },
        required: ['name', 'ownerLogin', 'branches'],
        additionalProperties: false,
      },
    },
  },
} as const;
