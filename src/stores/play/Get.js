/**
 * @param {import('@/libs/type/DeepReadonly').DeepReadonly<import('./State').Store>} store
 */
export function getFirstHandIdInStore(store) {
  const target = Object.keys(store.hands);
  if (target.length <= 0) {
    return null;
  }
  return target[0];
}

/**
 * @param {import('@/libs/type/DeepReadonly').DeepReadonly<import('./State').Store>} store
 */
export function getFirstPlayIdInStore(store) {
  let target = Object.keys(store.plays);
  if (target.length <= 0) {
    return null;
  }
  return target[0];
}
