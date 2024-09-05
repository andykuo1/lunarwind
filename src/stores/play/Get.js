/**
 * @param {import('./State').Store} store
 */
export function getFirstHandIdInStore(store) {
  let target = Object.keys(store.hands);
  if (target.length <= 0) {
    return null;
  }
  return target[0];
}
