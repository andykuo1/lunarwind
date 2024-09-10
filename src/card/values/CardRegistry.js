import Creature01 from '@/assets/cards/asparagusAlien.png';
import { createCard } from './Card';

/** @type {Record<string, import('./Card').Card>} */
const CARDS_REGISTRY = {};

/**
 * @param {import('./Card').CardId} cardId
 * @param {Partial<import('./Card').Card>} card
 */
export function registerCard(cardId, card) {
  let result = createCard(cardId);
  Object.assign(result, card);
  let nextCardNumber = Object.keys(CARDS_REGISTRY).length;
  result.cardNumber = nextCardNumber;
  if (result.title.length <= 0) {
    result.title = cardId;
  }
  if (result.portraitUrl.length <= 0) {
    result.portraitUrl = Creature01;
  }
  if (result.portraitAlt.length <= 0) {
    result.portraitAlt = cardId;
  }
  CARDS_REGISTRY[result.cardId] = result;
  return result;
}

/**
 * @param {import('./Card').CardId} cardId
 */
export function getCardById(cardId) {
  return CARDS_REGISTRY[cardId] ?? CARDS_REGISTRY[''];
}

export function getRandomCardId() {
  let keys = Object.keys(CARDS_REGISTRY);
  let index = Math.trunc(Math.random() * keys.length);
  return keys[index];
}
