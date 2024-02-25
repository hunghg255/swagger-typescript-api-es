import _ from 'lodash';

const pascalCase = (value: any) => _.upperFirst(_.camelCase(value));

export { pascalCase };
