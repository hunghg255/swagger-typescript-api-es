import _ from 'lodash';

const objectAssign = (target: any, updaterFn: any) => {
  if (!updaterFn) {
    return;
  }
  const update = typeof updaterFn === 'function' ? updaterFn(target) : updaterFn;
  const undefinedKeys = _.map(update, (value, key) => value === undefined && key).filter(Boolean);
  Object.assign(target, _.merge(target, update));
  for (const key of undefinedKeys) {
    target[key as any] = undefined;
  }
};

export { objectAssign };
