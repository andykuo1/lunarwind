/**
 * @param {import('./State').Store} store
 * @param {import('./State').WorldId} worldId
 * @param {Partial<import('./State').World>} values
 */
export function resolveWorld(store, worldId, values) {
  if (worldId !== store.world.worldId) {
    return;
  }
  Object.assign(store.world, values);
}
