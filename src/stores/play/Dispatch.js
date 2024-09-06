import { cuid } from '@/libs/math';
import {
  createHand,
  createHandCard,
  createPlay,
  createPlayCard,
} from './State';

/**
 * @param {import('./State').Store} store
 * @param {import('./State').PlayId} playId
 * @param {Partial<import('./State').PlayCard>} values
 */
export function updatePlay(store, playId, values) {
  let result = store.plays[playId];
  if (!result) {
    result = createPlay(playId);
    store.plays[playId] = result;
  }
  Object.assign(result, values);
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').PlayId} playId
 * @param {import('./State').PlayCardId} playCardId
 * @param {Partial<import('./State').PlayCard>} values
 */
export function updatePlayCard(store, playId, playCardId, values) {
  let result = store.plays[playId]?.playCards[playCardId];
  if (!result) {
    result = createPlayCard(playCardId);
    store.plays[playId].playCards[playCardId] = result;
  }
  Object.assign(result, values);
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').PlayId} playId
 * @param {import('./State').PlayCardId} playCardId
 * @param {import('@/card/UseOnDragMoveHandler').Position} position
 */
export function movePlayCard(store, playId, playCardId, position) {
  let result = store.plays[playId]?.playCards[playCardId];
  result.position[0] = position[0];
  result.position[1] = position[1];
  result.lastTouchedMillis = performance.now();
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').PlayId} _playId
 */
export function clearCards(store, _playId) {
  for (let playId of Object.keys(store.plays)) {
    let play = store.plays[playId];
    for (let key of Object.keys(play.playCards)) {
      delete play.playCards[key];
    }
  }
  for (let handId of Object.keys(store.hands)) {
    let hand = store.hands[handId];
    hand.cardOrder.length = 0;
    for (let key of Object.keys(hand.handCards)) {
      delete hand.handCards[key];
    }
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
 * @param {string} cardId
 */
export function drawCardToHand(store, handId, cardId) {
  let hand = store.hands[handId];
  let handCard = createHandCard();
  handCard.cardId = cardId;
  hand.handCards[handCard.handCardId] = handCard;
  hand.cardOrder.push(handCard.handCardId);
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').HandId} handId
 * @param {number} handIndex
 * @param {import('./State').PlayId} playId
 * @param {import('@/card/UseOnDragMoveHandler').Position} initialPosition
 */
export function playCardFromHand(
  store,
  handId,
  handIndex,
  playId,
  initialPosition
) {
  let hand = store.hands[handId];
  if (!hand) {
    throw new Error(`Missing existing hand for id - got ${handId}.`);
  }
  // Remove it from hand.
  const handCardId = hand.cardOrder[handIndex];
  const handCard = hand.handCards[handCardId];
  hand.cardOrder.splice(handIndex, 1);
  delete hand.handCards[handCardId];
  // Add it to play.
  updatePlayCard(store, playId, cuid(), {
    cardId: handCard.cardId,
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
