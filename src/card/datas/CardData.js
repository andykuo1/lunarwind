import { RarityValues } from '../values';

/** @typedef {string} CardId */
/** @typedef {ReturnType<createCardData>} CardData */

export function createCardData() {
  return {
    /** @type {CardId} */
    cardId: '',
    title: '???',
    /** @type {import('../values').Rarity} */
    rarity: RarityValues.JUNK,
    portraitUrl: '',
    portraitAlt: '???',
    layout: '',
    body: '???',
    // DEPRECATED!
    tastes: [0, 0, 0, 0, 0, 0],
  };
}
