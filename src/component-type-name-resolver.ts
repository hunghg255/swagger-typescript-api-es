import { NameResolver } from './util/name-resolver';

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
      // Always use the first (most preferred) variant so the output is deterministic.
      const variant = variants && variants[0];
      if (variant) {
        if (!this.countersByVariant.has(variant)) {
          this.countersByVariant.set(variant, 0);
        }
        const variantCounter = this.countersByVariant.get(variant) + 1;
        this.countersByVariant.set(variant, variantCounter);
        const dirtyResolvedName = `${variant}${variantCounter}`;
        this.logger?.debug(
          'Generated dirty resolved type name for component - ',
          dirtyResolvedName
        );
        return dirtyResolvedName;
      }

      const fallbackName = `${this.config.typeNameResolverName}${this.fallbackNameCounter++}`;
      this.logger?.debug('Generated fallback type name for component - ', fallbackName);
      return fallbackName;
    });
  }
}

export { ComponentTypeNameResolver };
