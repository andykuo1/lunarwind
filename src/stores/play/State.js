import { cuid } from '@/libs/math';
import { attachZustyUpgradeSchema } from '@/libs/zusty';

/** @typedef {ReturnType<createStore>} Store */

/** @typedef {string} PlayId */
/** @typedef {ReturnType<createPlay>} Play */

/** @typedef {string} PlayCardId */
/** @typedef {ReturnType<createPlayCard>} PlayCard */

/** @typedef {string} HandId */
/** @typedef {ReturnType<createHand>} Hand */

/** @typedef {string} HandCardId */
/** @typedef {ReturnType<createHandCard>} HandCard */

export function createStore() {
  return {
    /** @type {Record<PlayId, Play>} */
    plays: {},
    /** @type {Record<HandId, Hand>} */
    hands: {},
  };
}
attachZustyUpgradeSchema(createStore, {
  plays: (prev) => createPlay(prev.playId),
  hands: (prev) => createHand(prev.handId),
});

/**
 * @param {HandId} handId
 */
export function createHand(handId = cuid()) {
  return {
    handId,
    /** @type {Array<HandCardId>} */
    cardOrder: [],
    /** @type {Record<HandCardId, HandCard>} */
    handCards: {},
  };
}
attachZustyUpgradeSchema(createHand, {
  handCards: (prev) => createHandCard(prev.handCardId),
});

/**
 * @param {HandCardId} handCardId
 */
export function createHandCard(handCardId = cuid()) {
  return {
    handCardId,
    cardId: '',
  };
}

/**
 * @param {PlayId} playId
 */
export function createPlay(playId = cuid()) {
  return {
    playId,
    /** @type {Record<PlayCardId, PlayCard>} */
    playCards: {},
  };
}
attachZustyUpgradeSchema(createPlay, {
  playCards: (prev) => createPlayCard(prev.playCardId),
});

/**
 * @param {PlayCardId} playCardId
 */
export function createPlayCard(playCardId = cuid()) {
  return {
    playCardId,
    cardId: '',
    position: [0, 0],
    lastTouchedMillis: performance.now(),
  };
}
