import yaml from 'js-yaml';

import { MAX_SPEC_BYTES } from '../api-types';
import { HttpError, badRequest } from './errors';

/** hard limits on the parsed document (protect against YAML alias bombs / deep nesting) */
export const MAX_SPEC_NODES = 500_000;
export const MAX_SPEC_DEPTH = 256;

export type SpecDocument = Record<string, unknown>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Walks the parsed document as a tree (so shared YAML aliases are counted every time they are
 * used, the way the generator would walk them) and rejects documents that are too big, too deep,
 * cyclic or that contain `$ref`s to other files / URLs.
 */
function inspectDocument(root: unknown): void {
  let nodes = 0;
  const stack: Array<[value: unknown, depth: number]> = [[root, 0]];
  while (stack.length > 0) {
    const [value, depth] = stack.pop()!;
    if (++nodes > MAX_SPEC_NODES) {
      throw new HttpError(413, 'The schema is too complex (too many nodes). Try a smaller schema.');
    }
    if (depth > MAX_SPEC_DEPTH) {
      throw badRequest('The schema is nested too deeply (or contains a recursive YAML alias).');
    }
    if (Array.isArray(value)) {
      for (const item of value) stack.push([item, depth + 1]);
    } else if (isPlainObject(value)) {
      for (const [key, item] of Object.entries(value)) {
        if (key === '$ref' && typeof item === 'string' && !item.startsWith('#')) {
          throw badRequest(
            `External $ref "${item.slice(0, 100)}" is not supported in the playground. ` +
              'Bundle the schema into a single document first.'
          );
        }
        stack.push([item, depth + 1]);
      }
    }
  }
}

/** parses the schema text (JSON or YAML) and checks it looks like an OpenAPI / Swagger document */
export function parseSpecText(text: string): SpecDocument {
  if (Buffer.byteLength(text, 'utf8') > MAX_SPEC_BYTES) {
    throw new HttpError(
      413,
      `The schema is too large (max ${Math.round(MAX_SPEC_BYTES / 1024 / 1024)} MB).`
    );
  }
  const source = text.replace(/^﻿/, '');
  if (source.trim() === '') throw badRequest('The schema is empty.');

  let parsed: unknown;
  const trimmed = source.trimStart();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      parsed = JSON.parse(source);
    } catch (error) {
      throw badRequest(`Invalid JSON: ${(error as Error).message}`);
    }
  } else {
    try {
      // js-yaml v4 `load` uses the safe DEFAULT_SCHEMA (no JS functions / regexps)
      parsed = yaml.load(source, { json: true });
    } catch (error) {
      const message = error instanceof yaml.YAMLException ? error.message : String(error);
      throw badRequest(`Invalid YAML: ${message.split('\n')[0]}`);
    }
  }

  if (!isPlainObject(parsed)) {
    throw badRequest('The schema must be a JSON / YAML object.');
  }
  const version = parsed.openapi ?? parsed.swagger;
  if (typeof version !== 'string' && typeof version !== 'number') {
    throw badRequest(
      'Not an OpenAPI / Swagger document: missing the "openapi" or "swagger" field.'
    );
  }
  const supported = parsed.openapi != null ? /^3(\.|$)/ : /^2(\.|$)/;
  if (!supported.test(String(version))) {
    throw badRequest(
      `Unsupported schema version "${String(version).slice(0, 20)}" (supported: Swagger 2.0, OpenAPI 3.x).`
    );
  }
  inspectDocument(parsed);
  return parsed;
}
