import { compact, some, uniq } from 'es-toolkit/compat';

import type { CodeGenConfig } from '../configuration';
import type { Logger } from './logger';

/** config fields used by name resolvers */
export type NameResolverConfig = Partial<
  Pick<
    CodeGenConfig,
    'typeNameResolverName' | 'enumKeyResolverName' | 'specificArgNameResolverName'
  >
>;

export type NameResolverLogger = Pick<Logger, 'debug' | 'warn'>;

/**
 * Returns a name candidate (`undefined` - unable to resolve).
 * Called until it returns a name which is not reserved.
 */
export type NameResolverFn = (variants: string[] | null, extras?: unknown) => string | undefined;

/** generates a name when every variant is reserved */
export type FallbackNameFn = (variants: string[], extras?: unknown) => string | undefined;

class NameResolver {
  reservedNames: string[] = [];
  getFallbackName: FallbackNameFn | null = null;

  config: NameResolverConfig;
  logger: NameResolverLogger | null;

  constructor(
    config: NameResolverConfig,
    logger: NameResolverLogger | null,
    reservedNames: (string | null | undefined)[],
    getFallbackName: FallbackNameFn | null
  ) {
    this.config = config;
    this.logger = logger;
    this.getFallbackName = getFallbackName;
    this.reserve(reservedNames);
  }

  reserve(names: (string | null | undefined)[]) {
    const fixedNames = uniq(compact(names));
    for (const name of fixedNames) {
      if (!this.reservedNames.includes(name)) {
        this.reservedNames.push(name);
      }
    }
  }

  unreserve(names: string[]) {
    this.reservedNames = this.reservedNames.filter((reservedName) => !names.includes(reservedName));
  }

  isReserved(name: string) {
    return some(this.reservedNames, (reservedName) => reservedName === name);
  }

  /**
   * @param variants name candidates, the first free one is used
   * @param [resolver] custom name generator (used instead of `variants`)
   * @param [extras] passed to `resolver`
   * @param [shouldReserve] reserve the resolved name
   * @returns resolved name or `null`
   */
  resolve(
    variants: string[] | null,
    resolver?: NameResolverFn | null,
    extras?: unknown,
    shouldReserve = true
  ): string | null {
    if (typeof resolver === 'function') {
      let usageName: string | null = null;
      while (usageName === null) {
        const variant = resolver(variants, extras);

        if (variant === undefined) {
          this.logger?.warn('unable to resolve name. current reserved names: ', this.reservedNames);
          return null;
        }
        if (!shouldReserve || !this.isReserved(variant)) {
          usageName = variant;
        }
      }

      if (shouldReserve) {
        this.reserve([usageName]);
      }
      return usageName;
    } else if (Array.isArray(variants)) {
      let usageName: string | null = null;
      const uniqVariants = uniq(compact(variants));

      for (const variant of uniqVariants) {
        if (!usageName && (!shouldReserve || !this.isReserved(variant))) {
          usageName = variant;
        }
      }

      if (usageName) {
        if (shouldReserve) {
          this.reserve([usageName]);
        }
        return usageName;
      }

      this.logger?.debug(
        'trying to resolve name with using fallback name generator using variants',
        variants
      );
      const { getFallbackName } = this;
      return this.resolve(
        variants,
        getFallbackName && (() => getFallbackName(variants, extras)),
        extras,
        shouldReserve
      );
    }

    this.logger?.debug(
      'problem with reserving names. current reserved names: ',
      this.reservedNames
    );
    return null;
  }
}

export { NameResolver };
