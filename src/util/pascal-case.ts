import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

const pascalCase = (value: any) => upperFirst(camelCase(value));

export { pascalCase };
