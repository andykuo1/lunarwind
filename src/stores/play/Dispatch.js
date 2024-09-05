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
  let handCardId = cuid();
  target.cardOrder.push(handCardId);
  target.handCards[handCardId] = cardName;
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').HandId} handId
 * @param {number} handIndex
 * @param {import('@/card/UseOnDragMoveHandler').Position} initialPosition
 */
export function playCardFromHand(store, handId, handIndex, initialPosition) {
  let target = store.hands[handId];
  if (!target) {
    throw new Error(`Missing existing hand for id - got ${handId}.`);
  }
  let handCardId = target.cardOrder[handIndex];
  target.cardOrder.splice(handIndex, 1);
  let cardName = target.handCards[handCardId];
  delete target.handCards[handCardId];
  updatePlayCard(store, cuid(), {
    cardName,
    position: initialPosition,
  });
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').HandId} handId
 * @param {number} handIndex
 * @param {number} toHandIndex
 * @param {boolean} after
 */
export function moveCardThroughHand(
  store,
  handId,
  handIndex,
  toHandIndex,
  after
) {
  let target = store.hands[handId];
  if (!target) {
    throw new Error(`Missing existing hand for id - got ${handId}.`);
  }
  if (handIndex === toHandIndex) {
    // Already in the correct position.
    return;
  }
  if (toHandIndex === -1) {
    // Send to the front.
    toHandIndex = target.cardOrder.length;
  }
  let card = target.cardOrder[handIndex];
  target.cardOrder.splice(handIndex, 1);
  target.cardOrder.splice(toHandIndex + (after ? 1 : 0), 0, card);
}
