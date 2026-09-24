import { camelCase, upperFirst } from 'lodash-es';

const pascalCase = (value: string | undefined) => upperFirst(camelCase(value));

export { pascalCase };
