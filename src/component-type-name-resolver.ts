import { NameResolver } from './util/name-resolver';
import type { NameResolverConfig, NameResolverLogger } from './util/name-resolver';

class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;
  countersByVariant = new Map<string, number>();

  constructor(
    config: NameResolverConfig,
    logger: NameResolverLogger | null,
    reservedNames: (string | null | undefined)[]
  ) {
    super(config, logger, reservedNames, (variants) => {
      // Always use the first (most preferred) variant so the output is deterministic.
      const variant = variants && variants[0];
      if (variant) {
        const variantCounter = (this.countersByVariant.get(variant) ?? 0) + 1;
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
