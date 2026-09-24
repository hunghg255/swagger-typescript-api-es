import { filter, startsWith } from 'lodash-es';

import type { CodeGenConfig } from './configuration';
import type { ComponentName } from './types/openapi';
import type { ComponentRawTypeData, SchemaComponent } from './types/parsed';

class SchemaComponentsMap {
  _data: SchemaComponent[] = [];
  config: Pick<CodeGenConfig, 'hooks'>;

  constructor({ config }: { config: Pick<CodeGenConfig, 'hooks'> }) {
    this.config = config;
  }

  clear() {
    this._data = [];
  }

  /** `["components", "schemas", "Pet"]` -> `#/components/schemas/Pet` */
  createRef = (paths: string[]) => {
    return ['#', ...paths].join('/');
  };

  parseRef = (ref: string) => {
    return ref.split('/');
  };

  createComponent($ref: string, rawTypeData: ComponentRawTypeData): SchemaComponent {
    const parsed = this.parseRef($ref);
    const typeName = parsed[parsed.length - 1];
    const componentName: ComponentName = parsed[parsed.length - 2];
    const componentSchema: SchemaComponent = {
      $ref,
      typeName,
      rawTypeData,
      componentName,
      /** result from schema parser */
      typeData: null,
    };

    const usageComponent = this.config.hooks.onCreateComponent(componentSchema) || componentSchema;

    const refIndex = this._data.findIndex((c) => c.$ref === $ref);

    if (refIndex === -1) {
      this._data.push(usageComponent);
    } else {
      this._data[refIndex] = usageComponent;
    }

    return usageComponent;
  }

  getComponents() {
    return this._data;
  }

  /**
   * @param componentNames `schemas`, `responses`, ...
   * @returns components of the given sections
   */
  filter(...componentNames: ComponentName[]) {
    return filter(this._data, (it) =>
      componentNames.some((componentName) => startsWith(it.$ref, `#/components/${componentName}`))
    );
  }

  get($ref: string) {
    return this._data.find((c) => c.$ref === $ref) || null;
  }
}

export { SchemaComponentsMap };
