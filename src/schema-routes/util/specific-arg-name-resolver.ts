import { NameResolver } from '../../util/name-resolver';
import type { NameResolverConfig, NameResolverLogger } from '../../util/name-resolver';

/** resolves names of route method arguments (`query`, `data`, `params`, ...) */
class SpecificArgNameResolver extends NameResolver {
  counter = 1;

  constructor(
    config: NameResolverConfig,
    logger: NameResolverLogger | null,
    reservedNames: (string | null | undefined)[]
  ) {
    super(config, logger, reservedNames, (variants) => this.createFallbackName(variants));
  }

  /** `query1`, `query2`, ... (or `arg1`, `arg2`, ... without variants) */
  createFallbackName = (variants: string[]) => {
    const generatedVariant =
      (variants[0] && `${variants[0]}${this.counter++}`) ||
      `${this.config.specificArgNameResolverName}${this.counter++}`;
    this.logger?.debug('generated fallback type name for specific arg - ', generatedVariant);
    return generatedVariant;
  };

  /**
   * Resolves a free argument name.
   * Names are always resolved (a fallback name is generated when every variant is reserved).
   */
  resolveArgName(variants: string[]): string {
    return this.resolve(variants) ?? this.createFallbackName(variants);
  }
}

export { SpecificArgNameResolver };
