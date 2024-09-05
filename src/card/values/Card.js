import { RarityValues } from './Rarity';

/** @typedef {string} CardId */
/** @typedef {ReturnType<createCard>} Card */

/**
 * @param {CardId} cardId
 */
export function createCard(cardId) {
  return {
    cardId,
    cardNumber: -1,
    /** @type {string} */
    title: '',
    /** @type {import('./Rarity').Rarity} */
    rarity: RarityValues.COMMON,
    tastes: createTastePalette(),
    portraitUrl: '',
    portraitAlt: '',
  };
}

/**
 * @param {Array<import('./Taste').Taste>} values
 */
export function createTastePalette(...values) {
  let result = [0, 0, 0, 0, 0, 0];
  for (let value of values) {
    result[value] += 1;
  }
  return result;
}
