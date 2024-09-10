import { createPlayer } from './State';

/**
 * @param {import('./State').Store} store
 * @param {import('./State').PlayerId} playerId
 * @param {Partial<import('./State').Player>} values
 */
export function resolvePlayer(store, playerId, values) {
  let player = store.players[playerId];
  if (!player) {
    player = createPlayer(playerId);
    store.players[playerId] = player;
  }
  Object.assign(player, values);
}
