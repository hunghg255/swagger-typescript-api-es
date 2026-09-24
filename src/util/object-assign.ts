import { merge, omitBy } from 'lodash-es';

/**
 * Deep merges `update` into `target`.
 * Keys whose value is `undefined` are skipped, so options that were not set
 * (e.g. `{ name: undefined }`) never wipe out the defaults.
 */
const objectAssign = (target: any, updaterFn: any) => {
  if (!updaterFn) {
    return;
  }
  const update = typeof updaterFn === 'function' ? updaterFn(target) : updaterFn;

  if (!update || typeof update !== 'object') {
    return;
  }

  merge(
    target,
    omitBy(update, (value) => value === undefined)
  );
};

export { objectAssign };
