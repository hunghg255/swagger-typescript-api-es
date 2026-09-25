import { camelCase, lowerCase } from 'es-toolkit/compat';

const internalCase = (value: string | undefined) => camelCase(lowerCase(value));

export { internalCase };
