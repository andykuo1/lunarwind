import { cuid } from '@/libs/math';
import { createHand, createPlayCard } from './State';

/**
 * @param {import('./State').Store} store
 * @param {string} objectId
 * @param {Partial<import('./State').PlayCard>} values
 */
export function updatePlayCard(store, objectId, values) {
  let result = store.playCards[objectId];
  if (!result) {
    result = createPlayCard(objectId);
    store.playCards[objectId] = result;
  }
  Object.assign(result, values);
}

/**
 * @param {import('./State').Store} store
 * @param {string} objectId
 * @param {import('@/card/UseOnDragMoveHandler').Position} position
 */
export function movePlayCard(store, objectId, position) {
  let result = store.playCards[objectId];
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
  for (let key of Object.keys(store.playCards)) {
    delete store.playCards[key];
  }
}

/**
 * @param {import('./State').Store} store
 * @param {string} handId
 * @param {Partial<import('./State').Hand>} values
 */
export function updateHand(store, handId, values) {
  let result = store.hands[handId];
  if (!result) {
    result = createHand(handId);
    store.hands[handId] = result;
  }
  Object.assign(result, values);
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').HandId} handId
 * @param {string} cardName
 */
export function drawCardToHand(store, handId, cardName) {
  let target = store.hands[handId];
  target.cardOrder.push(cardName);
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').HandId} handId
 * @param {number} handIndex
 */
export function removeCardFromHand(store, handId, handIndex) {
  let target = store.hands[handId];
  target.cardOrder.splice(handIndex, 1);
}
