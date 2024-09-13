import { RarityValues } from '../values/Rarity';
import { createRandomCardData } from './RandomCardData';

export const CARD_DATA = (() => {
  /** @type {Array<import('./CardData').CardData>} */
  let result = [];

  /**
   * @param {Partial<import('./CardData').CardData>} values
   */
  function add(values) {
    let card = createRandomCardData();
    Object.assign(card, values);
    result.push(card);
  }

  // == Start of cards ==

  add({
    cardId: 'core.plebian',
    title: 'Common Plebian',
    rarity: RarityValues.COMMON,
    portraitUrl: 'beanDog.png',
    portraitAlt: 'A very-cute bean-shaped dog.',
    layout: 'customer',
    body: '4 orders of any dish. Pays $8.',
  });

  add({
    cardId: 'core.snooty',
    title: 'Snooty Catfish',
    rarity: RarityValues.UNCOMMON,
    portraitUrl: 'catfishCat.png',
    portraitAlt: 'A snooty fish-like cat.',
    layout: 'customer',
    body: '1 order of SOUP. Then 4 orders of any RARE dish. Then 2 orders of any SWEET dish. Pays $20 + $1 tip for every GREEN dish.',
  });

  add({
    cardId: 'core.depressed',
    title: 'Depressed Subfish',
    rarity: RarityValues.UNCOMMON,
    portraitUrl: 'subFish.png',
    portraitAlt: 'A sad submarine fish.',
    layout: 'customer',
    body: '8 orders of any BLAND dish. Then 1 order of SOUP. Pays $10. ',
  });

  add({
    cardId: 'core.alien',
    title: 'Alien-Outta-Space',
    rarity: RarityValues.RARE,
    portraitUrl: 'asparagusAlien.png',
    portraitAlt: 'A curious and confused alien.',
    layout: 'customer',
    body: '2 orders of SOUP. Pays $2 + $10 tip for every additional full-color dish.',
  });

  add({
    cardId: 'core.spooky',
    title: 'Spooked Mantis-dog',
    rarity: RarityValues.COMMON,
    portraitUrl: 'mantisPup.png',
    portraitAlt: 'A scared mantis-dog looking for shelter.',
    layout: 'customer',
    body: '4 orders of any SOUR dish. Pays $8 + $2 tip for 1 additional any dish.',
  });

  // == End of cards ==

  return result;
})();
