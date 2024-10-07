import { RarityValues } from '../values';

/** @typedef {ReturnType<createCustomerCardData>} CustomerCardData */

export function createCustomerCardData() {
  return {
    /** @type {import('./CardData').CardId} */
    cardId: '',
    title: '???',
    /** @type {import('../values').Rarity} */
    rarity: RarityValues.JUNK,
    portraitUrl: '',
    portraitAlt: '???',
    layout: 'portrait',
    body: '???',
    // DEPRECATED!
    tastes: [0, 0, 0, 0, 0, 0],
  };
}
