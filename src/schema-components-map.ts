import { filter, startsWith } from 'es-toolkit/compat';

import type { CodeGenConfig } from './configuration';
import type { ComponentName } from './types/openapi';
import type { ComponentRawTypeData, SchemaComponent } from './types/parsed';

class SchemaComponentsMap {
  _data: SchemaComponent[] = [];
  config: Pick<CodeGenConfig, 'hooks'>;

  constructor({ config }: { config: Pick<CodeGenConfig, 'hooks'> }) {
    this.config = config;
  }

  /** `$ref` -> index in `_data` of its first component (a cache, checked on every read) */
  private refIndexes = new Map<string, number>();

  clear() {
    this._data = [];
    this.refIndexes.clear();
  }

  /** index of the first component with this `$ref` (-1 if there is none) */
  private indexOf($ref: string) {
    const cached = this.refIndexes.get($ref);
    if (cached !== undefined && this._data[cached]?.$ref === $ref) {
      return cached;
    }
    // not indexed yet, or `_data` was changed from outside (e.g. through `getComponents()`)
    const index = this._data.findIndex((c) => c.$ref === $ref);
    if (index === -1) {
      this.refIndexes.delete($ref);
    } else {
      this.refIndexes.set($ref, index);
    }
    return index;
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

    const refIndex = this.indexOf($ref);

    if (refIndex === -1) {
      this._data.push(usageComponent);
      if (!this.refIndexes.has(usageComponent.$ref)) {
        this.refIndexes.set(usageComponent.$ref, this._data.length - 1);
      }
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
    const index = this.indexOf($ref);
    return index === -1 ? null : this._data[index];
  }
}

export { SchemaComponentsMap };
