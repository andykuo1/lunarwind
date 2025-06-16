import { RarityValues } from '../../card/values';

/** @typedef {ReturnType<createCustomerCardData>} CustomerCardData */

export function createCustomerCardData() {
  return {
    /** @type {import('../../card/datas/CardData').CardId} */
    cardId: '',
    title: '???',
    /** @type {import('../../card/values').Rarity} */
    rarity: RarityValues.JUNK,
    portraitUrl: '',
    portraitAlt: '???',
    layout: 'portrait',
    body: '???',
    // DEPRECATED!
    tastes: [0, 0, 0, 0, 0, 0],
  };
}
