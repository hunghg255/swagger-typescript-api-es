/**
 * Synthetic OpenAPI 3 document: `schemas` object models (with enums, arrays, $refs, oneOf, nullable)
 * and `operations` operations spread over 50 paths prefixes and 30 tags.
 */
export const generateSpec = ({ schemas = 1500, operations = 3000 } = {}) => {
  const componentsSchemas = {};
  for (let i = 0; i < schemas; i++) {
    componentsSchemas[`Model${i}`] = {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string', description: `name ${i}` },
        status: { type: 'string', enum: ['a', 'b', 'c'] },
        tags: { type: 'array', items: { type: 'string' } },
        nested:
          i > 0
            ? { $ref: `#/components/schemas/Model${i - 1}` }
            : { type: 'object', additionalProperties: true },
        createdAt: { type: 'string', format: 'date-time', nullable: true },
        ...(i % 5 === 0
          ? {
              poly: {
                oneOf: [
                  { $ref: `#/components/schemas/Model${Math.max(0, i - 2)}` },
                  { type: 'string' },
                ],
              },
            }
          : {}),
      },
    };
  }

  const paths = {};
  for (let j = 0; j < operations / 2; j++) {
    const ref = { $ref: `#/components/schemas/Model${j % schemas}` };
    const id = { name: 'id', in: 'path', required: true, schema: { type: 'integer' } };
    paths[`/res${j % 50}/items${j}/{id}`] = {
      get: {
        tags: [`tag${j % 30}`],
        operationId: `get${j}`,
        parameters: [id, { name: 'q', in: 'query', schema: { type: 'string' } }],
        responses: { 200: { description: 'ok', content: { 'application/json': { schema: ref } } } },
      },
      post: {
        tags: [`tag${j % 30}`],
        operationId: `post${j}`,
        parameters: [id],
        requestBody: { required: true, content: { 'application/json': { schema: ref } } },
        responses: { 201: { description: 'ok', content: { 'application/json': { schema: ref } } } },
      },
    };
  }

  return {
    openapi: '3.0.3',
    info: { title: 'bench', version: '1.0.0' },
    paths,
    components: { schemas: componentsSchemas },
  };
};
