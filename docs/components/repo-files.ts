import 'server-only';

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Finds a file of the repository root (the docs app lives in `<repo>/docs`, and
 * Vercel may build it with `docs` as root directory). Walks up from the cwd.
 */
export function findRepoFile(name: string, marker = 'swagger-typescript-api-es'): string | null {
  const cwd = process.cwd();
  const starts = [cwd, path.join(/*turbopackIgnore: true*/ cwd, 'docs')];
  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 5; i++) {
      const candidate = path.join(/*turbopackIgnore: true*/ dir, name);
      if (existsSync(/*turbopackIgnore: true*/ candidate)) {
        try {
          const content = readFileSync(/*turbopackIgnore: true*/ candidate, 'utf8');
          if (content.includes(marker)) return candidate;
        } catch {}
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

export function readRepoFile(name: string, marker?: string): string | null {
  const file = findRepoFile(name, marker);
  return file ? readFileSync(/*turbopackIgnore: true*/ file, 'utf8') : null;
}

export function getLibraryVersion(): string | null {
  try {
    const pkg = readRepoFile('package.json', '"name": "swagger-typescript-api-es"');
    return pkg ? (JSON.parse(pkg).version as string) : null;
  } catch {
    return null;
  }
}
