import { merge, omitBy } from 'es-toolkit/compat';

/** changes, or a function receiving the target and returning the changes */
export type ObjectUpdater<T, U> = U | ((target: T) => U);

const isUpdaterFunction = <T, U>(updater: ObjectUpdater<T, U>): updater is (target: T) => U =>
  typeof updater === 'function';

/**
 * Deep merges `update` into `target`.
 * Keys whose value is `undefined` are skipped, so options that were not set
 * (e.g. `{ name: undefined }`) never wipe out the defaults.
 * `update` can be a function receiving `target` and returning the changes.
 */
const objectAssign = <T extends object, U = unknown>(
  target: T,
  updaterFn: ObjectUpdater<T, U> | null | undefined
): void => {
  if (!updaterFn) {
    return;
  }
  const update: unknown = isUpdaterFunction(updaterFn) ? updaterFn(target) : updaterFn;

  if (!update || typeof update !== 'object') {
    return;
  }

  merge(
    target,
    omitBy(update, (value) => value === undefined)
  );
};

export { objectAssign };
