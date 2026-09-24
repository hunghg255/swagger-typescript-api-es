import {
  BOOLEAN_OPTIONS,
  HTTP_CLIENTS,
  type HttpClient,
  type PlaygroundOptions,
  STRING_OPTIONS,
  type StringOption,
} from '../api-types';
import { badRequest } from './errors';

export const MAX_URL_LENGTH = 2048;
export const MAX_STRING_OPTION_LENGTH = 100;
export const MAX_MODULE_NAME_INDEX = 20;

/** validated request: exactly one of `spec` / `url` */
export type ValidatedRequest =
  | { spec: string; url?: undefined; options: PlaygroundOptions }
  | { spec?: undefined; url: string; options: PlaygroundOptions };

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const IDENTIFIER_PART = /^[\w$]*$/;

/** per string option: a pattern and a description of it for the error message */
const STRING_RULES: Record<StringOption, { pattern: RegExp; hint: string }> = {
  // a plain file name: no path separators, no leading dot, `.ts` or no extension
  name: {
    pattern: /^[A-Za-z0-9_][\w-]{0,63}(\.ts)?$/,
    hint: 'a file name made of letters, digits, "_" or "-", optionally ending with ".ts"',
  },
  apiClassName: { pattern: IDENTIFIER, hint: 'a valid identifier' },
  typePrefix: { pattern: IDENTIFIER_PART, hint: 'letters, digits, "_" or "$"' },
  typeSuffix: { pattern: IDENTIFIER_PART, hint: 'letters, digits, "_" or "$"' },
  enumKeyPrefix: { pattern: IDENTIFIER_PART, hint: 'letters, digits, "_" or "$"' },
  enumKeySuffix: { pattern: IDENTIFIER_PART, hint: 'letters, digits, "_" or "$"' },
  // a TypeScript type (`void`, `unknown`, `Record<string, any>`, ...) on a single line
  defaultResponseType: {
    pattern: /^[\w$<>[\]{}|&,.:;?'" ()-]+$/,
    hint: 'a single-line TypeScript type',
  },
};

/**
 * Whitelists and type-checks the playground options. Unknown keys are dropped silently;
 * known keys with a wrong type / value are rejected with a 400.
 */
export function validateOptions(input: unknown): PlaygroundOptions {
  if (input === undefined || input === null) return {};
  if (!isPlainObject(input)) throw badRequest('"options" must be an object.');

  const options: PlaygroundOptions = {};

  for (const key of BOOLEAN_OPTIONS) {
    const value = input[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'boolean') throw badRequest(`options.${key} must be a boolean.`);
    options[key] = value;
  }

  for (const key of STRING_OPTIONS) {
    const value = input[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'string') throw badRequest(`options.${key} must be a string.`);
    const trimmed = value.trim();
    // empty string = "use the default"
    if (trimmed === '') continue;
    if (trimmed.length > MAX_STRING_OPTION_LENGTH) {
      throw badRequest(`options.${key} is too long (max ${MAX_STRING_OPTION_LENGTH} characters).`);
    }
    const rule = STRING_RULES[key];
    if (!rule.pattern.test(trimmed)) {
      throw badRequest(`options.${key} must be ${rule.hint}.`);
    }
    options[key] = trimmed;
  }

  const { httpClientType, moduleNameIndex } = input;
  if (httpClientType !== undefined && httpClientType !== null) {
    if (!HTTP_CLIENTS.includes(httpClientType as HttpClient)) {
      throw badRequest(`options.httpClientType must be one of: ${HTTP_CLIENTS.join(', ')}.`);
    }
    options.httpClientType = httpClientType as HttpClient;
  }
  if (moduleNameIndex !== undefined && moduleNameIndex !== null) {
    if (
      typeof moduleNameIndex !== 'number' ||
      !Number.isInteger(moduleNameIndex) ||
      moduleNameIndex < 0 ||
      moduleNameIndex > MAX_MODULE_NAME_INDEX
    ) {
      throw badRequest(
        `options.moduleNameIndex must be an integer between 0 and ${MAX_MODULE_NAME_INDEX}.`
      );
    }
    options.moduleNameIndex = moduleNameIndex;
  }

  return options;
}

/** validates the (already JSON-parsed) request body */
export function validateRequest(body: unknown): ValidatedRequest {
  if (!isPlainObject(body)) throw badRequest('The request body must be a JSON object.');

  const { spec, url } = body;
  const hasSpec = spec !== undefined && spec !== null && spec !== '';
  const hasUrl = url !== undefined && url !== null && url !== '';
  if (hasSpec === hasUrl) {
    throw badRequest('Provide exactly one of "spec" (schema text) or "url".');
  }

  const options = validateOptions(body.options);

  if (hasSpec) {
    if (typeof spec !== 'string') throw badRequest('"spec" must be a string (JSON or YAML text).');
    return { spec, options };
  }

  if (typeof url !== 'string') throw badRequest('"url" must be a string.');
  const trimmedUrl = url.trim();
  if (trimmedUrl.length > MAX_URL_LENGTH) {
    throw badRequest(`"url" is too long (max ${MAX_URL_LENGTH} characters).`);
  }
  return { url: trimmedUrl, options };
}
