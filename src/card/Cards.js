/** @typedef {string} CardName */
/** @typedef {ReturnType<createCard>} Card */

import { Rarity } from './Rarity';

/** @type {Record<string, Card>} */
const CARDS_REGISTRY = {};

registerCard('', {
  title: 'The Void',
  rarity: Rarity.FABLED,
});
registerCard('theRedDragon', {
  title: 'The Red Dragon',
  rarity: Rarity.FABLED,
});
registerCard('cabbage', {
  title: 'Cabbage',
  rarity: Rarity.COMMON,
});
registerCard('chopAction', {
  title: 'Chop!',
  rarity: Rarity.COMMON,
});

/**
 * @param {CardName} cardName
 * @param {Partial<Card>} card
 */
export function registerCard(cardName, card) {
  let result = createCard(cardName);
  Object.assign(result, card);
  let nextCardNumber = Object.keys(CARDS_REGISTRY).length;
  result.cardNumber = nextCardNumber;
  CARDS_REGISTRY[result.cardName] = result;
}

/**
 * @param {CardName} cardName
 */
export function getCardByName(cardName) {
  return CARDS_REGISTRY[cardName];
}

export function getRandomCard() {
  let keys = Object.keys(CARDS_REGISTRY);
  let index = Math.trunc(Math.random() * keys.length);
  let key = keys[index];
  return CARDS_REGISTRY[key];
}

/**
 * @param {CardName} cardName
 */
export function createCard(cardName) {
  return {
    cardName,
    cardNumber: -1,
    /** @type {string} */
    title: '???',
    /** @type {import('@/libs/type').ValueOf<Rarity>} */
    rarity: Rarity.COMMON,
  };
}
