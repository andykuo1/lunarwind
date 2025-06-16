import { createCustomerCardData } from '../CustomerCardData';
import * as Portraits from '../Portraits';
import { RarityValues } from '../Rarity';

/** @typedef {ReturnType<create>} PlebianCard */

/**
 * @param {object} opts
 */
function create(opts) {
  return {
    ...createCustomerCardData(),
    ...opts,
  };
}

export const PLEBIAN = create({
  cardId: 'core.plebian',
  title: 'Common Plebian',
  rarity: RarityValues.COMMON,
  portraitUrl: Portraits.BEAN_DOG,
  portraitAlt: 'A very-cute bean-shaped dog.',
  layout: 'customer',
  body: '{ORDER} - 4x any dish.\nPays 8 {COIN}',
});

export const SNOOTY = create({
  cardId: 'core.snooty',
  title: 'Snooty Catfish',
  rarity: RarityValues.UNCOMMON,
  portraitUrl: Portraits.CATFISH_CAT,
  portraitAlt: 'A snooty fish-like cat.',
  layout: 'customer',
  body: '{ORDER} - 1x SOUP > 4x RARE DISH > 2x SWEET DISH.\nPays 20 {COIN} + 1 {COIN} tip for every GREEN dish',
});

export const DEPRESSED = create({
  cardId: 'core.depressed',
  title: 'Depressed Subfish',
  rarity: RarityValues.UNCOMMON,
  portraitUrl: Portraits.SUB_FISH,
  portraitAlt: 'A sad submarine fish.',
  layout: 'customer',
  body: '{ORDER} - 8x any BLAND DISH > 1x SOUP.\nPays 10 {COIN}',
});

export const ALIEN = create({
  cardId: 'core.alien',
  title: 'Alien-Outta-Space',
  rarity: RarityValues.RARE,
  portraitUrl: Portraits.ASPARAGUS_ALIEN,
  portraitAlt: 'A curious and confused alien.',
  layout: 'customer',
  body: '{ORDER} - 2x SOUP.\nPays 2 {COIN} + 10 {COIN} tip for every additional full-color dish',
});

export const SPOOKY = create({
  cardId: 'core.spooky',
  title: 'Spooked Mantis-dog',
  rarity: RarityValues.COMMON,
  portraitUrl: Portraits.MANTIS_PUP,
  portraitAlt: 'A scared mantis-dog looking for shelter.',
  layout: 'customer',
  body: '{ORDER} - 4x any SOUR dish.\nPays 8 {COIN} + 2 {COIN} tip for 1 additional any dish',
});
