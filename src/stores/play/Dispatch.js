import { cuid } from '@/libs/math';
import {
  createHand,
  createHandCard,
  createPlay,
  createPlayCard,
  createSession,
  createUser,
} from './State';

/**
 * @param {import('./State').Store} store
 * @param {import('./State').SessionId} sessionId
 * @param {Partial<import('./State').Session>} values
 */
export function resolveSession(store, sessionId, values) {
  let session = store.sessions[sessionId];
  if (!session) {
    session = createSession(sessionId);
    store.sessions[sessionId] = session;
  }
  Object.assign(session, values);
  if (!session.localUserId) {
    let userId = cuid();
    resolveUser(store, userId, {});
    session.localUserId = userId;
  }
  if (!session.localPlayId) {
    let playId = cuid();
    resolvePlay(store, playId, {});
    session.localPlayId = playId;
  }
  if (!session.localHandId) {
    let handId = cuid();
    resolveHand(store, handId, {});
    session.localHandId = handId;
  }
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').UserId} userId
 * @param {Partial<import('./State').User>} values
 */
export function resolveUser(store, userId, values) {
  let user = store.users[userId];
  if (!user) {
    user = createUser(userId);
    store.users[userId] = user;
  }
  Object.assign(user, values);
}

/**
 * @param {import('./State').Store} store
 * @param {import('./State').PlayId} playId
 * @param {Partial<import('./State').PlayCard>} values
 */
export function resolvePlay(store, playId, values) {
  let play = store.plays[playId];
  if (!play) {
    play = createPlay(playId);
    store.plays[playId] = play;
  }
  Object.assign(play, values);
}

/**
 * @param {import('./State').Store} store
 * @param {string} handId
 * @param {Partial<import('./State').Hand>} values
 */
export function resolveHand(store, handId, values) {
  let hand = store.hands[handId];
  if (!hand) {
    hand = createHand(handId);
    store.hands[handId] = hand;
  }
  Object.assign(hand, values);
}

/**
 * @param {import('./State').Store} store
 */
export function clearSessions(store) {
  let keys = Object.keys(store.sessions);
  for (let key of keys) {
    delete store.sessions[key];
  }
  // HACK: Just reset everything for now.
  store.sessions = {};
  store.hands = {};
  store.users = {};
  store.plays = {};
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
  const target = store.hands[handId];
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
  const card = target.cardOrder[handIndex];
  target.cardOrder.splice(handIndex, 1);
  target.cardOrder.splice(toHandIndex + (after ? 1 : 0), 0, card);
}
