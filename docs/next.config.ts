import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { NextConfig } from 'next';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(rootDir, '..');

/** packages imported by the library entry (`dist/index.mjs` + `dist/shared/*`), not its CLI */
const LIBRARY_RUNTIME_DEPENDENCIES = [
  'eta',
  'js-yaml',
  'lodash-es',
  'oxfmt',
  'picocolors',
  'swagger2openapi',
  'typescript',
  'undici',
];

interface LockPackage {
  dev?: boolean;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

/**
 * Runtime dependency tree of the library (resolved with the root `package-lock.json`), as trace
 * globs relative to `docs/`.
 *
 * The library is loaded at runtime from `../dist/index.mjs` (see `lib/server/generate.ts`), so the
 * tracer cannot follow its imports: its dependencies (`swagger2openapi`, `oxfmt` + native binding,
 * `typescript`, `eta`, ...) are included explicitly. `docs/` dependencies are traced by Next.js.
 */
function libraryRuntimeDependencies(): string[] {
  let packages: Record<string, LockPackage>;
  try {
    packages = (
      JSON.parse(readFileSync(path.join(repoRoot, 'package-lock.json'), 'utf8')) as {
        packages: Record<string, LockPackage>;
      }
    ).packages;
  } catch {
    return LIBRARY_RUNTIME_DEPENDENCIES.map((name) => `../node_modules/${name}/**`);
  }

  // node resolution inside the lockfile: `<from>/node_modules/<name>`, then the parent folders
  const resolve = (from: string, name: string): string | undefined => {
    let base = from;
    for (;;) {
      const key = base ? `${base}/node_modules/${name}` : `node_modules/${name}`;
      if (packages[key]) return key;
      if (!base) return undefined;
      const index = base.lastIndexOf('/node_modules/');
      base = index === -1 ? '' : base.slice(0, index);
    }
  };

  const found = new Set<string>();
  const queue = LIBRARY_RUNTIME_DEPENDENCIES.map((name) => resolve('', name)).filter(
    (key): key is string => !!key
  );
  while (queue.length > 0) {
    const key = queue.pop()!;
    if (found.has(key)) continue;
    found.add(key);
    const info = packages[key];
    for (const name of Object.keys({ ...info.dependencies, ...info.optionalDependencies })) {
      const dep = resolve(key, name);
      if (dep && !found.has(dep)) queue.push(dep);
    }
  }
  return [...found].sort().map((key) => `../${key}/**`);
}

const nextConfig: NextConfig = {
  // `NEXT_OUTPUT_STANDALONE=1 next build` builds a self-contained server (`.next/standalone`),
  // used to check that the traced files are enough to run the generator (what Vercel deploys)
  output: process.env.NEXT_OUTPUT_STANDALONE ? 'standalone' : undefined,
  // the generator uses a native formatter (oxfmt) and the TypeScript compiler (toJS),
  // they must run as regular Node.js packages instead of being bundled
  serverExternalPackages: ['swagger-typescript-api-es', 'oxfmt', 'typescript', 'swagger2openapi'],
  // `swagger-typescript-api-es` is linked from the repository root (file:..)
  outputFileTracingRoot: repoRoot,
  outputFileTracingIncludes: {
    // the library is imported at runtime from `../dist` (not bundled, see `lib/server/generate.ts`)
    // and reads its templates (`dist/templates`) with `fs`
    '/api/generate': [
      '../dist/index.mjs',
      '../dist/shared/**',
      '../dist/templates/**',
      ...libraryRuntimeDependencies(),
    ],
  },
};

export default nextConfig;
