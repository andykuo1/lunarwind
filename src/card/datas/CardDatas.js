import { Portraits } from '../portraits';
import { RarityValues } from '../values/Rarity';
import { createRandomCardData } from './RandomCardData';

/**
 * @param {Partial<import('./CardData').CardData>} values
 */
function add(values) {
  let card = createRandomCardData();
  Object.assign(card, values);
  return card;
}

export const PLEBIAN = add({
  cardId: 'core.plebian',
  title: 'Common Plebian',
  rarity: RarityValues.COMMON,
  portraitUrl: Portraits.BEAN_DOG,
  portraitAlt: 'A very-cute bean-shaped dog.',
  layout: 'customer',
  body: '4 orders of any dish. Pays $8.',
});

export const SNOOTY = add({
  cardId: 'core.snooty',
  title: 'Snooty Catfish',
  rarity: RarityValues.UNCOMMON,
  portraitUrl: Portraits.CATFISH_CAT,
  portraitAlt: 'A snooty fish-like cat.',
  layout: 'customer',
  body: '1 order of SOUP. Then 4 orders of any RARE dish. Then 2 orders of any SWEET dish. Pays $20 + $1 tip for every GREEN dish.',
});

export const DEPRESSED = add({
  cardId: 'core.depressed',
  title: 'Depressed Subfish',
  rarity: RarityValues.UNCOMMON,
  portraitUrl: Portraits.SUB_FISH,
  portraitAlt: 'A sad submarine fish.',
  layout: 'customer',
  body: '8 orders of any BLAND dish. Then 1 order of SOUP. Pays $10. ',
});

export const ALIEN = add({
  cardId: 'core.alien',
  title: 'Alien-Outta-Space',
  rarity: RarityValues.RARE,
  portraitUrl: Portraits.ASPARAGUS_ALIEN,
  portraitAlt: 'A curious and confused alien.',
  layout: 'customer',
  body: '2 orders of SOUP. Pays $2 + $10 tip for every additional full-color dish.',
});

export const SPOOKY = add({
  cardId: 'core.spooky',
  title: 'Spooked Mantis-dog',
  rarity: RarityValues.COMMON,
  portraitUrl: Portraits.MANTIS_PUP,
  portraitAlt: 'A scared mantis-dog looking for shelter.',
  layout: 'customer',
  body: '4 orders of any SOUR dish. Pays $8 + $2 tip for 1 additional any dish.',
});
