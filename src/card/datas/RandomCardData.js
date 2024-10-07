import cuid2 from '@paralleldrive/cuid2';

import { Portraits } from '../portraits';
import { RarityValues } from '../values/Rarity';
import { createCustomerCardData } from './CustomerCardData';

const RAND4 = cuid2.init({ length: 4 });

/**
 * @template T
 * @param {Array<T>} array
 */
export function randChoose(array) {
  return array[Math.trunc(Math.random() * array.length)];
}

function randCardId() {
  return `Card#${RAND4()}`;
}

function randPortraitUrl() {
  return randChoose(Object.values(Portraits));
}

function randRarity() {
  return randChoose(Object.values(RarityValues));
}

export function createRandomCardData() {
  let card = createCustomerCardData();
  card.cardId = randCardId();
  card.title = card.cardId;
  card.portraitUrl = randPortraitUrl();
  card.portraitAlt = 'Unknown';
  card.layout = 'customer';
  card.rarity = randRarity();
  card.body = 'This does nothing.';
  return card;
}
