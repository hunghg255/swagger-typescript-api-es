import _ from 'lodash';

const internalCase = (value: any) => _.camelCase(_.lowerCase(value));

export { internalCase };
