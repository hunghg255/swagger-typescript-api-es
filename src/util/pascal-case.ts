import { camelCase, upperFirst } from 'lodash-es';

const pascalCase = (value: any) => upperFirst(camelCase(value));

export { pascalCase };
