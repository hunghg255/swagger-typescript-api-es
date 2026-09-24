export interface ExampleSpec {
  id: string;
  label: string;
  description: string;
  /** path under /public */
  path: string;
  format: 'json' | 'yaml';
}

export const EXAMPLES: ExampleSpec[] = [
  {
    id: 'petstore',
    label: 'Petstore',
    description: 'OpenAPI 3.0 · JSON · tags, enums, auth, oneOf',
    path: '/examples/petstore.json',
    format: 'json',
  },
  {
    id: 'swagger2',
    label: 'Swagger 2 store',
    description: 'Swagger 2.0 · YAML · converted automatically',
    path: '/examples/swagger2.yaml',
    format: 'yaml',
  },
  {
    id: 'minimal',
    label: 'Minimal todo API',
    description: 'OpenAPI 3.0 · YAML · three routes',
    path: '/examples/minimal.yaml',
    format: 'yaml',
  },
];

export const DEFAULT_EXAMPLE_ID = 'petstore';

export function findExample(id: string | null | undefined): ExampleSpec | undefined {
  return EXAMPLES.find((e) => e.id === id);
}

const cache = new Map<string, Promise<string>>();

export function loadExample(example: ExampleSpec): Promise<string> {
  let promise = cache.get(example.id);
  if (!promise) {
    promise = fetch(example.path).then((r) => {
      if (!r.ok) throw new Error(`Could not load the ${example.label} example (HTTP ${r.status}).`);
      return r.text();
    });
    promise.catch(() => cache.delete(example.id));
    cache.set(example.id, promise);
  }
  return promise;
}
