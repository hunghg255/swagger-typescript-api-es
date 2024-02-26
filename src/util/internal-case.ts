import { camelCase, lowerCase } from 'lodash-es';

const internalCase = (value: any) => camelCase(lowerCase(value));

export { internalCase };
