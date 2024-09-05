import { cuid } from '@/libs/math';
import { attachZustyUpgradeSchema } from '@/libs/zusty';

/** @typedef {ReturnType<createStore>} Store */
/** @typedef {ReturnType<createPlayCard>} PlayCard */

/** @typedef {string} ObjectId */
/** @typedef {'card'} ObjectType */

/** @typedef {string} HandId */
/** @typedef {ReturnType<createHand>} Hand */

/** @typedef {string} HandCardId */

export function createStore() {
  return {
    /** @type {Record<ObjectId, PlayCard>} */
    playCards: {},
    /** @type {Record<HandId, Hand>} */
    hands: {},
  };
}
attachZustyUpgradeSchema(createStore, {
  playCards: (prev) => createPlayCard(prev.objectId),
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
    /** @type {Record<HandCardId, import('@/card/values').CardName>} */
    handCards: {},
  };
}

/**
 * @param {ObjectId} objectId
 */
export function createPlayCard(objectId = cuid()) {
  return {
    objectId,
    /** @type {ObjectType} */
    objectType: 'card',
    position: [0, 0],
    lastTouchedMillis: performance.now(),
    cardName: '',
  };
}
