import { NameResolver } from './util/name-resolver';
import { getRandomInt } from './util/random';

class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;
  countersByVariant = new Map();

  /**
   * @param {CodeGenConfig} config;
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(config: any, logger: any, reservedNames: any) {
    super(config, logger, reservedNames, (variants: any) => {
      const randomVariant = variants[getRandomInt(0, variants.length - 1)];
      if (randomVariant) {
        if (!this.countersByVariant.has(randomVariant)) {
          this.countersByVariant.set(randomVariant, 0);
        }
        const variantCounter = this.countersByVariant.get(randomVariant) + 1;
        this.countersByVariant.set(randomVariant, variantCounter);
        const dirtyResolvedName = `${randomVariant}${variantCounter}`;
        this.logger.debug('Generated dirty resolved type name for component - ', dirtyResolvedName);
        return dirtyResolvedName;
      }

      const fallbackName = `${this.config.componentTypeNameResolver}${this.fallbackNameCounter++}`;
      this.logger.debug('Generated fallback type name for component - ', fallbackName);
      return fallbackName;
    });
  }
}

export { ComponentTypeNameResolver };
