import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { oas, ok, squash } from '../generation/spec-helpers';
import { generate, makeTmpDir, typeCheck } from '../helpers/generate';

const spec = oas(
  {
    '/pets/{petId}': {
      get: {
        operationId: 'getPet',
        parameters: [{ name: 'petId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: ok({ $ref: '#/components/schemas/Pet' }),
      },
    },
  },
  {
    Pet: { type: 'object', properties: { name: { type: 'string' } } },
    Kind: { type: 'string', enum: ['cat', 'dog'] },
  }
);

const writeTemplates = (templates: Record<string, string>) => {
  const dir = makeTmpDir('sta-tpl-');
  for (const [name, content] of Object.entries(templates)) {
    fs.writeFileSync(path.join(dir, name), content);
  }
  return dir;
};

describe('templates', () => {
  it('overrides a single template and falls back to the built-in ones', async () => {
    const templates = writeTemplates({
      // `.eta` extension is supported too
      'route-name.eta': `<% const { routeInfo, utils } = it; %><%~ utils._.camelCase(\`call_\${routeInfo.operationId}\`) %>`,
    });
    const { files } = await generate(spec, { templates });
    const code = squash(files['api.ts']);
    expect(code).toContain('callGetPet:(petId:number,');
    // everything else is built-in
    expect(code).toContain('exportinterfacePet{');
    expect(code).toContain('exportclassHttpClient');
    expect(typeCheck(files)).toEqual([]);
  });

  it('can include built-in partials (@base / @default) and use utils', async () => {
    const templates = writeTemplates({
      'data-contracts.ejs': `<% const { modelTypes, utils } = it; %>
<% for (const contract of modelTypes) { %>
export const <%~ contract.name %>Name = "<%~ utils._.upperCase(contract.name) %>";
<% } %>
export const FORMATTED = "<%~ utils.formatModelName('my_model') %>";
<%~ includeFile('@base/data-contracts.ejs', it) %>`,
    });
    const { files } = await generate(spec, { templates, typePrefix: 'T' });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportconstTPetName="TPET";');
    expect(code).toContain('exportconstTKindName="TKIND";');
    expect(code).toContain('exportconstFORMATTED="TMyModel";');
    expect(code).toContain('exportinterfaceTPet{');
    expect(code).toContain('exportenumTKind{');
    expect(typeCheck(files)).toEqual([]);
  });

  it('works with modular output', async () => {
    const templates = writeTemplates({
      'http-client.ejs':
        'export class HttpClient<S = unknown> { request = async <T, E>(p: any): Promise<T> => p as T; }',
    });
    const { files } = await generate(spec, { templates, modular: true });
    expect(files['http-client.ts']).toContain(
      'request = async <T, E>(p: any): Promise<T> => p as T;'
    );
    expect(squash(files['Pets.ts'])).toContain('getPet=(petId:number,');
  });
});

describe('templateInfos', () => {
  it('replaces the template name -> file name mapping', async () => {
    const templates = writeTemplates({
      'my-contracts.ejs': 'export const CONTRACTS = <%~ it.modelTypes.length %>;',
    });
    const { files } = await generate(spec, {
      templates,
      templateInfos: [
        { name: 'api', fileName: 'api' },
        { name: 'dataContracts', fileName: 'my-contracts' },
        { name: 'httpClient', fileName: 'http-client' },
        { name: 'routeTypes', fileName: 'route-types' },
        { name: 'routeName', fileName: 'route-name' },
        { name: 'dataContractJsDoc', fileName: 'data-contract-jsdoc' },
        { name: 'interfaceDataContract', fileName: 'interface-data-contract' },
        { name: 'typeDataContract', fileName: 'type-data-contract' },
        { name: 'enumDataContract', fileName: 'enum-data-contract' },
        { name: 'objectFieldJsDoc', fileName: 'object-field-jsdoc' },
      ],
    });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportconstCONTRACTS=2;');
    expect(code).not.toContain('exportinterfacePet');
    expect(code).toContain('getPet:(petId:number,');
  });
});

describe('extraTemplates', () => {
  it('renders extra files with the same data', async () => {
    const dir = makeTmpDir('sta-extra-');
    const routesTpl = path.join(dir, 'routes.ejs');
    fs.writeFileSync(
      routesTpl,
      `<% const { routes, modelTypes, apiConfig } = it; %>
export const TITLE = "<%~ apiConfig.info.title %>";
export const MODELS = [<%~ modelTypes.map((m) => \`"\${m.name}"\`).join(', ') %>];
export const ROUTES = [<%~ routes.combined.flatMap((m) => m.routes).map((r) => \`"\${r.request.method.toUpperCase()} \${r.raw.route}"\`).join(', ') %>];`
    );
    const emptyTpl = path.join(dir, 'empty.ejs');
    fs.writeFileSync(emptyTpl, '<% /* renders nothing */ %>');

    const { files } = await generate(spec, {
      extraTemplates: [
        { name: 'routes.ts', path: routesTpl },
        { name: 'empty.ts', path: emptyTpl },
      ],
    });
    // empty output files are not written
    expect(Object.keys(files).sort()).toEqual(['api.ts', 'routes.ts']);
    expect(squash(files['routes.ts'])).toBe(
      squash(`/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ----------------------------------------------------------------------
 */
export const TITLE = "test";
export const MODELS = ["Pet", "Kind"];
export const ROUTES = ["GET /pets/{petId}"];`)
    );
    expect(typeCheck(files)).toEqual([]);
  });
});
