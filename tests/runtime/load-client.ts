import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generate } from '../helpers/generate';

const here = path.dirname(fileURLToPath(import.meta.url));

export const runtimeSpec = JSON.parse(
  fs.readFileSync(path.resolve(here, '../fixtures/runtime-client.json'), 'utf8')
);

const repoNodeModules = path.resolve(here, '../../node_modules');

export const MODULES = ['pets', 'uploads', 'downloads', 'auth', 'status'] as const;
type ModuleName = (typeof MODULES)[number];

export interface ClientVariant {
  name: string;
  httpClientType: 'fetch' | 'axios';
  modular?: boolean;
  unwrapResponseData?: boolean;
  singleHttpClient?: boolean;
  extractRequestParams?: boolean;
  disableThrowOnError?: boolean;
  toJS?: boolean;
}

/** Uniform view over the generated client, whatever the output mode. */
export interface LoadedClient extends Record<ModuleName, Record<string, (...args: any[]) => any>> {
  /** the objects exposing `setSecurityData` / `abortRequest` (Api, module classes or the shared HttpClient) */
  httpClients: any[];
  /** raw generated module(s), for extra assertions */
  modules: Record<string, any>;
}

/**
 * Generates the runtime fixture with the variant options, imports the generated
 * TypeScript directly (vite transforms it) and returns a factory creating
 * client instances.
 */
export const loadClient = async (variant: ClientVariant) => {
  const { name: _name, ...options } = variant;
  const { output, files } = await generate(runtimeSpec, options);
  // make `import axios from "axios"` in the generated code resolvable from the temp dir
  fs.symlinkSync(repoNodeModules, path.join(path.dirname(output), 'node_modules'), 'dir');

  const ext = variant.toJS ? 'js' : 'ts';
  const modules: Record<string, any> = {};
  if (variant.modular) {
    modules['http-client'] = await import(path.join(output, `http-client.${ext}`));
    for (const moduleName of MODULES) {
      const fileName = `${moduleName[0].toUpperCase()}${moduleName.slice(1)}`;
      modules[moduleName] = await import(path.join(output, `${fileName}.${ext}`));
    }
  } else {
    modules.api = await import(path.join(output, `api.${ext}`));
  }

  const create = (config: Record<string, unknown> = {}): LoadedClient => {
    if (variant.modular) {
      const HttpClient = modules['http-client'].HttpClient;
      const shared = variant.singleHttpClient ? new HttpClient(config) : undefined;
      const client: any = { modules, httpClients: shared ? [shared] : [] };
      for (const moduleName of MODULES) {
        const exported = Object.entries(modules[moduleName]).find(
          ([key, value]) => typeof value === 'function' && key.toLowerCase() === moduleName
        );
        if (!exported) throw new Error(`module class for ${moduleName} not found`);
        const Cls = exported[1] as any;
        const instance = new Cls(shared ?? config);
        if (!shared) client.httpClients.push(instance);
        client[moduleName] = instance;
      }
      return client;
    }

    const { Api, HttpClient } = modules.api;
    const shared = variant.singleHttpClient ? new HttpClient(config) : undefined;
    const api = shared ? new Api(shared) : new Api(config);
    const client: any = { modules, httpClients: [shared ?? api] };
    for (const moduleName of MODULES) client[moduleName] = api[moduleName];
    return client;
  };

  return { create, files, output };
};
