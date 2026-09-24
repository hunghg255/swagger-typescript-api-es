import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { FormatConfig } from 'oxfmt';

import packageJson from '../package.json';

const RESERVED_QUERY_ARG_NAMES = ['query', 'queryParams', 'queryArg'];
const RESERVED_BODY_ARG_NAMES = ['data', 'body', 'reqBody'];
const RESERVED_REQ_PARAMS_ARG_NAMES = ['params', 'requestParams', 'reqParams', 'httpParams'];
const RESERVED_PATH_ARG_NAMES = ['path', 'pathParams'];
const RESERVED_HEADER_ARG_NAMES = ['headers', 'headersParams'];

const SCHEMA_TYPES = {
  ARRAY: 'array',
  OBJECT: 'object',
  ENUM: 'enum',
  REF: '$ref',
  PRIMITIVE: 'primitive',
  COMPLEX: 'complex',
  DISCRIMINATOR: 'discriminator',
  COMPLEX_ONE_OF: 'oneOf',
  COMPLEX_ANY_OF: 'anyOf',
  COMPLEX_ALL_OF: 'allOf',
  COMPLEX_NOT: 'not',
  COMPLEX_UNKNOWN: '__unknown',
} as const;

const HTTP_CLIENT = {
  FETCH: 'fetch',
  AXIOS: 'axios',
} as const;

const PROJECT_VERSION = packageJson.version;

const FILE_PREFIX = `/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ----------------------------------------------------------------------
 */

`;
const DEFAULT_BODY_ARG_NAME = 'data';

/**
 * Default oxfmt options for generated code.
 * Overridden by the project's `.oxfmtrc.json` (cwd) and then by `oxfmtOptrions`.
 */
const OXC_FORMAT_OPTIONS: FormatConfig = {
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  sortImports: {
    groups: [
      'builtin',
      'external',
      ['internal', 'subpath'],
      ['parent', 'sibling', 'index'],
      'style',
      'unknown',
    ],
  },
};

export const __dirname_esm =
  typeof __dirname === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : __dirname;

/**
 * Directory with the built-in templates.
 * - from sources: `src/constants.ts` -> `<root>/templates`
 * - from the build: `dist/shared/*.mjs` (or `dist/*.mjs`) -> `dist/templates`
 */
const TEMPLATES_DIR = (() => {
  const candidates = [
    resolve(__dirname_esm, '../templates'),
    resolve(__dirname_esm, 'templates'),
    resolve(__dirname_esm, '../../templates'),
  ];

  return candidates.find((candidate) => fs.existsSync(resolve(candidate, 'base'))) || candidates[0];
})();

export {
  FILE_PREFIX,
  DEFAULT_BODY_ARG_NAME,
  PROJECT_VERSION,
  SCHEMA_TYPES,
  HTTP_CLIENT,
  RESERVED_QUERY_ARG_NAMES,
  RESERVED_BODY_ARG_NAMES,
  RESERVED_REQ_PARAMS_ARG_NAMES,
  RESERVED_PATH_ARG_NAMES,
  RESERVED_HEADER_ARG_NAMES,
  OXC_FORMAT_OPTIONS,
  TEMPLATES_DIR,
};
