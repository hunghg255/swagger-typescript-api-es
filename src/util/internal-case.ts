import camelCase from 'lodash/camelCase';
import lowerCase from 'lodash/lowerCase';

const internalCase = (value: any) => camelCase(lowerCase(value));

export { internalCase };
