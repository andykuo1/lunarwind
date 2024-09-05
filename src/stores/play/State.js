import { cuid } from '@/libs/math';
import { attachZustyUpgradeSchema } from '@/libs/zusty';

/** @typedef {ReturnType<createStore>} Store */
/** @typedef {ReturnType<createPlayCard>} PlayCard */
/** @typedef {string} ObjectId */
/** @typedef {'card'} ObjectType */

export function createStore() {
  return {
    /** @type {Record<string, PlayCard>} */
    cards: {},
  };
}
attachZustyUpgradeSchema(createStore, {
  objects: (prev) => createPlayCard(prev.objectId),
});

/**
 * @param {string} objectId
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
