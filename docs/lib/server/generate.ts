import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import type { GeneratedFileDto, PlaygroundOptions } from '../api-types';
import { HttpError } from './errors';
import type { SpecDocument } from './parse-spec';

export const GENERATION_TIMEOUT_MS = 20_000;

type Library = typeof import('swagger-typescript-api-es');
let library: Promise<Library> | undefined;

/**
 * Loads the generator at runtime as a plain Node.js ES module from the repository root `dist/`.
 *
 * It must NOT be bundled: the package is linked from the repository root (`file:..`), so Turbopack
 * would bundle it (`serverExternalPackages` only applies to packages resolved inside
 * `node_modules`) and replace its `__dirname` with a build-time placeholder, which breaks the
 * lookup of its templates (the output would be empty). It is not imported through the
 * `node_modules/swagger-typescript-api-es` symlink either, because the symlink is not part of the
 * deployed function. `process.cwd()` is the `docs/` directory in `next dev` / `next start`, in the
 * standalone server, in vitest and in the Vercel function (its launcher does `chdir(__dirname)`).
 * The files are added to the function with `outputFileTracingIncludes` (see `next.config.ts`).
 */
export const loadLibrary = (): Promise<Library> =>
  (library ??= (async () => {
    const candidates = [
      path.resolve(/* turbopackIgnore: true */ process.cwd(), '../dist/index.mjs'),
      path.resolve(/* turbopackIgnore: true */ process.cwd(), 'dist/index.mjs'),
    ];
    const entry = candidates.find((file) => existsSync(/* turbopackIgnore: true */ file));
    if (entry) {
      return (await import(
        /* turbopackIgnore: true */ /* webpackIgnore: true */ /* @vite-ignore */ pathToFileURL(
          entry
        ).href
      )) as Library;
    }
    return import(
      /* turbopackIgnore: true */ /* webpackIgnore: true */ 'swagger-typescript-api-es'
    );
  })().catch((error: unknown) => {
    // retry on the next request
    library = undefined;
    throw error;
  }));

/**
 * Runs the generator on an in-memory document with the whitelisted options only.
 * `output: false` / `silent: true` / `cleanOutput: false` are forced: nothing is written to disk,
 * nothing is fetched (the document is passed as `spec`), and no hooks / templates / functions
 * can reach the generator.
 */
export async function generateFiles(
  spec: SpecDocument,
  options: PlaygroundOptions,
  timeoutMs = GENERATION_TIMEOUT_MS
): Promise<GeneratedFileDto[]> {
  // a failure to load the library is a server error (500), not a generation error
  const { generateApi } = await loadLibrary();

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new HttpError(
            422,
            `Generation timed out after ${Math.round(timeoutMs / 1000)}s. Try a smaller schema.`
          )
        ),
      timeoutMs
    );
  });

  try {
    const result = await Promise.race([
      generateApi({
        ...options,
        spec: spec as never,
        output: false,
        silent: true,
        cleanOutput: false,
        debug: false,
      }),
      timeout,
    ]);
    return result.files.map((file) => ({
      name: `${file.fileName}${file.fileExtension}`,
      content: file.fileContent,
    }));
  } catch (error) {
    if (error instanceof HttpError) throw error;
    const message = error instanceof Error ? error.message : String(error);
    throw new HttpError(422, `Generation failed: ${message.split('\n')[0].slice(0, 500)}`);
  } finally {
    clearTimeout(timer);
  }
}
