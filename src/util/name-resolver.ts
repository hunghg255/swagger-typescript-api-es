/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-null */
import _ from 'lodash';

class NameResolver {
  reservedNames = [];
  getFallbackName = null;

  /** @type {CodeGenConfig} */
  config;
  /** @type {Logger} */
  logger;

  /**
   * @param {CodeGenConfig} config;
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(config: any, logger: any, reservedNames: any, getFallbackName: any) {
    this.config = config;
    this.logger = logger;
    this.getFallbackName = getFallbackName;
    this.reserve(reservedNames);
  }

  /**
   * @param {string[]} names
   */
  reserve(names: any) {
    const fixedNames = _.uniq(_.compact(names));
    for (const name of fixedNames) {
      // @ts-ignore
      if (!this.reservedNames.includes(name)) {
        // @ts-ignore
        this.reservedNames.push(name);
      }
    }
  }

  unreserve(names: any) {
    this.reservedNames.filter((reservedName) => !names.includes(reservedName));
  }

  isReserved(name: any) {
    return _.some(this.reservedNames, (reservedName) => reservedName === name);
  }

  /**
   *
   * @param {(string[])} variants
   * @param {(reserved: string[]) => string)} [resolver]
   * @param {any} [extras]
   * @returns {string | null}
   */
  // @ts-ignore
  resolve(variants: any, resolver: any, extras: any, shouldReserve = true) {
    if (typeof resolver === 'function') {
      let usageName = null;
      while (usageName === null) {
        const variant = resolver(variants, extras);

        if (variant === undefined) {
          this.logger.warn('unable to resolve name. current reserved names: ', this.reservedNames);
          return null;
        }
        if (!shouldReserve || !this.isReserved(variant)) {
          usageName = variant;
        }
      }

      shouldReserve && this.reserve([usageName]);
      return usageName;
    } else if (Array.isArray(variants)) {
      let usageName: any = null;
      const uniqVariants = _.uniq(_.compact(variants));

      _.forEach(uniqVariants, (variant) => {
        if (!usageName && (!shouldReserve || !this.isReserved(variant))) {
          usageName = variant;
        }
      });

      if (usageName) {
        shouldReserve && this.reserve([usageName]);
        return usageName;
      }

      this.logger.debug(
        'trying to resolve name with using fallback name generator using variants',
        variants,
      );
      return this.resolve(variants, this.getFallbackName, extras);
    }

    this.logger.debug('problem with reserving names. current reserved names: ', this.reservedNames);
    return null;
  }
}

export { NameResolver };
