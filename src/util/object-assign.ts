import { map, merge } from 'lodash-es';

const objectAssign = (target: any, updaterFn: any) => {
  if (!updaterFn) {
    return;
  }
  const update = typeof updaterFn === 'function' ? updaterFn(target) : updaterFn;
  const undefinedKeys = map(update, (value, key) => value === undefined && key).filter(Boolean);
  Object.assign(target, merge(target, update));
  for (const key of undefinedKeys) {
    target[key as any] = undefined;
  }
};

export { objectAssign };
