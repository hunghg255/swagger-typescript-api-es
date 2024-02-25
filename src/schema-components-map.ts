/* eslint-disable unicorn/no-null */
import _ from 'lodash';

class SchemaComponentsMap {
  /** @type {SchemaComponent[]} */
  _data = [];
  /** @type {CodeGenConfig} */
  config;

  constructor({ config }: any) {
    this.config = config;
  }

  clear() {
    this._data = [];
  }

  createRef = (paths: any) => {
    return ['#', ...paths].join('/');
  };

  parseRef = (ref: any) => {
    return ref.split('/');
  };

  createComponent($ref: any, rawTypeData: any) {
    const parsed = this.parseRef($ref);
    const typeName = parsed.at(-1);
    const componentName = parsed.at(-2);
    const componentSchema = {
      $ref,
      typeName,
      rawTypeData,
      componentName,
      /** result from schema parser */
      typeData: null,
    };

    const usageComponent: any =
      this.config.hooks.onCreateComponent(componentSchema) || componentSchema;

    const refIndex = this._data.findIndex((c: any) => c.$ref === $ref);

    if (refIndex === -1) {
      // @ts-ignore
      this._data.push(usageComponent);
    } else {
      // @ts-ignore
      this._data[refIndex] = usageComponent;
    }

    return usageComponent;
  }

  /**
   * @returns {SchemaComponent[]}
   */
  getComponents() {
    return this._data;
  }

  /**
   * @params {...string[]} componentNames
   * @returns {SchemaComponent[]}
   */
  filter(...componentNames: any) {
    return _.filter(this._data, (it: any) =>
      componentNames.some((componentName: any) =>
        _.startsWith(it.$ref, `#/components/${componentName}`),
      ),
    );
  }

  get($ref: any) {
    return this._data.find((c: any) => c.$ref === $ref) || null;
  }
}

export { SchemaComponentsMap };
