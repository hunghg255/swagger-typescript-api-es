export const petSpec = {
  openapi: '3.0.0',
  info: { title: 'Pets', version: '1' },
  paths: {
    '/pets/{id}': {
      get: {
        operationId: 'getPet',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'ok',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'integer' }, name: { type: 'string' } },
      },
    },
  },
};

export const swagger2Spec = {
  swagger: '2.0',
  info: { title: 'Upload', version: '1' },
  paths: {
    '/upload': {
      post: {
        operationId: 'upload',
        consumes: ['multipart/form-data'],
        parameters: [
          { name: 'file', in: 'formData', type: 'file', required: true },
          { name: 'note', in: 'formData', type: 'string' },
        ],
        responses: { 200: { description: 'ok', schema: { type: 'string' } } },
      },
    },
    '/items/{id}': {
      put: {
        operationId: 'putItem',
        consumes: ['multipart/form-data'],
        parameters: [
          { name: 'id', in: 'path', type: 'integer', required: true },
          { name: 'title', in: 'formData', type: 'string' },
        ],
        responses: { 200: { description: 'ok' } },
      },
    },
  },
};
