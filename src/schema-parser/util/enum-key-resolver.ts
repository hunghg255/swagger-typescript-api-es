import type { NameResolverConfig, NameResolverLogger } from '../../util/name-resolver';
import { NameResolver } from '../../util/name-resolver';

class EnumKeyResolver extends NameResolver {
  counter = 1;

  constructor(
    config: NameResolverConfig,
    logger: NameResolverLogger | null,
    reservedNames: (string | null | undefined)[]
  ) {
    super(config, logger, reservedNames, (variants) => {
      const generatedVariant =
        (variants[0] && `${variants[0]}${this.counter++}`) ||
        `${this.config.enumKeyResolverName}${this.counter++}`;
      this.logger?.debug('generated fallback type name for enum key - ', generatedVariant);
      return generatedVariant;
    });
  }
}

export { EnumKeyResolver };
