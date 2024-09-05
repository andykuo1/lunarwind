import { cuid } from '@/libs/math';
import { createPlayCard } from './State';

/**
 * @param {import('./State').Store} store
 * @param {string} objectId
 * @param {Partial<import('./State').PlayCard>} values
 */
export function updatePlayCard(store, objectId, values) {
  let result = store.cards[objectId];
  if (!result) {
    result = createPlayCard(objectId);
    store.cards[objectId] = result;
  }
  Object.assign(result, values);
}

/**
 * @param {import('./State').Store} store
 * @param {string} objectId
 * @param {import('@/card/UseOnDragMoveHandler').Position} position
 */
export function movePlayCard(store, objectId, position) {
  let result = store.cards[objectId];
  result.position[0] = position[0];
  result.position[1] = position[1];
  result.lastTouchedMillis = performance.now();
}

/**
 * @param {import('./State').Store} store
 * @param {string} cardName
 * @param {import('@/card/UseOnDragMoveHandler').Position} [initialPosition]
 */
export function playCard(store, cardName, initialPosition = [0, 0]) {
  updatePlayCard(store, cuid(), {
    cardName,
    position: initialPosition,
  });
}

/**
 * @param {import('./State').Store} store
 */
export function clearCards(store) {
  for (let key of Object.keys(store.cards)) {
    delete store.cards[key];
  }
}
