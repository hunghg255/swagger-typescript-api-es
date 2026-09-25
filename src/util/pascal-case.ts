import { camelCase, upperFirst } from 'es-toolkit/compat';

/** memoized: called with the same (type / route / param) names many times */
const cache = new Map<string | undefined, string>();

const pascalCase = (value: string | undefined) => {
  let result = cache.get(value);
  if (result === undefined) {
    result = upperFirst(camelCase(value));
    cache.set(value, result);
  }
  return result;
};

export { pascalCase };
