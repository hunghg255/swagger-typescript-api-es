import { camelCase, upperFirst } from 'es-toolkit/compat';

const pascalCase = (value: string | undefined) => upperFirst(camelCase(value));

export { pascalCase };
