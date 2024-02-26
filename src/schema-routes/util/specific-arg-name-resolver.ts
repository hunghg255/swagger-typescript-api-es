import { NameResolver } from '../../util/name-resolver';

class SpecificArgNameResolver extends NameResolver {
  counter = 1;
  /**
   * @param {CodeGenConfig} config;
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(config: any, logger: any, reservedNames: any) {
    super(config, logger, reservedNames, (variants: any) => {
      const generatedVariant =
        (variants[0] && `${variants[0]}${this.counter++}`) ||
        `${this.config.specificArgNameResolverName}${this.counter++}`;
      this.logger.debug('generated fallback type name for specific arg - ', generatedVariant);
      return generatedVariant;
    });
  }
}

export { SpecificArgNameResolver };
