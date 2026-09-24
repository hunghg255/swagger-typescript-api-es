import { camelCase, lowerCase } from 'lodash-es';

const internalCase = (value: string | undefined) => camelCase(lowerCase(value));

export { internalCase };
