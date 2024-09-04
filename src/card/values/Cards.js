import Creature01 from '@/assets/cards/asparagusAlien.png';
import Creature02 from '@/assets/cards/beeWorm.png';
import Creature03 from '@/assets/cards/bird.png';
import Creature04 from '@/assets/cards/carrotPower.png';
import Creature05 from '@/assets/cards/cat.png';
import Creature06 from '@/assets/cards/chefRiddle.png';
import Creature07 from '@/assets/cards/elephant.png';
import Creature08 from '@/assets/cards/frogFarmer.png';
import Creature09 from '@/assets/cards/glyphMaze.png';
import Creature10 from '@/assets/cards/rugFlower.png';
import Creature11 from '@/assets/cards/shadowMirror.png';
import Creature12 from '@/assets/cards/shoreBush.png';
import Creature13 from '@/assets/cards/slugHobo.png';
import Creature14 from '@/assets/cards/spiderArrow.png';
import Creature15 from '@/assets/cards/squiggleTablet.png';
import Creature16 from '@/assets/cards/stagHead.png';
import Creature17 from '@/assets/cards/turtle.png';
import Creature18 from '@/assets/cards/wormSun.png';
import { createCard, createTastePalette } from './Card';
import { RarityValues } from './Rarity';
import { TasteValues } from './Taste';

/** @type {Record<string, import('./Card').Card>} */
const CARDS_REGISTRY = {};

registerCard('', {
  title: 'The Void',
  rarity: RarityValues.FABLED,
});
registerCard('theRedDragon', {
  title: 'The Red Dragon',
  rarity: RarityValues.FABLED,
  tastes: createTastePalette(
    TasteValues.BITTER,
    TasteValues.BITTER,
    TasteValues.BITTER
  ),
});
registerCard('cabbage', {
  title: 'Cabbage',
  rarity: RarityValues.COMMON,
  tastes: createTastePalette(TasteValues.BLAND),
});
registerCard('chopAction', {
  title: 'Chop!',
  rarity: RarityValues.COMMON,
  tastes: createTastePalette(TasteValues.BLAND, TasteValues.BLAND),
});
registerCard('threeEyedCone', {
  title: 'Three-Eyed Cone',
  rarity: RarityValues.COMMON,
  tastes: createTastePalette(TasteValues.SAVORY, TasteValues.SWEET),
  portraitUrl: Creature01,
});
registerCard('beeWorm', {
  title: 'Sap Leecher',
  rarity: RarityValues.RARE,
  tastes: createTastePalette(TasteValues.SWEET, TasteValues.BITTER),
  portraitUrl: Creature02,
});
registerCard('c03', {
  portraitUrl: Creature03,
  tastes: createTastePalette(TasteValues.BITTER, TasteValues.SALTY),
  rarity: RarityValues.RARE,
});
registerCard('c04', {
  portraitUrl: Creature04,
  tastes: createTastePalette(TasteValues.BITTER),
  rarity: RarityValues.FABLED,
});
registerCard('c05', {
  portraitUrl: Creature05,
  tastes: createTastePalette(TasteValues.SOUR, TasteValues.SWEET),
  rarity: RarityValues.RARE,
});
registerCard('c06', {
  portraitUrl: Creature06,
  tastes: createTastePalette(TasteValues.SWEET),
  rarity: RarityValues.UNCOMMON,
});
registerCard('c07', {
  portraitUrl: Creature07,
  tastes: createTastePalette(
    TasteValues.SOUR,
    TasteValues.SOUR,
    TasteValues.SOUR
  ),
  rarity: RarityValues.UNCOMMON,
});
registerCard('c08', {
  portraitUrl: Creature08,
  tastes: createTastePalette(TasteValues.SWEET, TasteValues.SWEET),
  rarity: RarityValues.UNCOMMON,
});
registerCard('c09', {
  portraitUrl: Creature09,
  tastes: createTastePalette(TasteValues.SOUR, TasteValues.SWEET),
  rarity: RarityValues.UNCOMMON,
});
registerCard('c10', {
  portraitUrl: Creature10,
  tastes: createTastePalette(
    TasteValues.SAVORY,
    TasteValues.SALTY,
    TasteValues.SALTY
  ),
  rarity: RarityValues.RARE,
});
registerCard('c11', {
  portraitUrl: Creature11,
  tastes: createTastePalette(TasteValues.SAVORY, TasteValues.SALTY),
  rarity: RarityValues.UNCOMMON,
});
registerCard('c12', {
  portraitUrl: Creature12,
  tastes: createTastePalette(TasteValues.SAVORY, TasteValues.SWEET),
  rarity: RarityValues.RARE,
});
registerCard('c13', {
  portraitUrl: Creature13,
  tastes: createTastePalette(TasteValues.SAVORY),
  rarity: RarityValues.RARE,
});
registerCard('c14', {
  portraitUrl: Creature14,
  tastes: createTastePalette(TasteValues.SAVORY),
  rarity: RarityValues.RARE,
});
registerCard('c15', {
  portraitUrl: Creature15,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.RARE,
});
registerCard('c16', {
  portraitUrl: Creature16,
  tastes: createTastePalette(TasteValues.SALTY, TasteValues.SALTY),
  rarity: RarityValues.UNCOMMON,
});
registerCard('c17', {
  portraitUrl: Creature17,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.FABLED,
});
registerCard('c18', {
  portraitUrl: Creature18,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.FABLED,
});

/**
 * @param {import('./Card').CardName} cardName
 * @param {Partial<import('./Card').Card>} card
 */
export function registerCard(cardName, card) {
  let result = createCard(cardName);
  Object.assign(result, card);
  let nextCardNumber = Object.keys(CARDS_REGISTRY).length;
  result.cardNumber = nextCardNumber;
  if (result.title.length <= 0) {
    result.title = cardName;
  }
  if (result.portraitUrl.length <= 0) {
    result.portraitUrl = Creature01;
  }
  if (result.portraitAlt.length <= 0) {
    result.portraitAlt = cardName;
  }
  CARDS_REGISTRY[result.cardName] = result;
  return cardName;
}

/**
 * @param {import('./Card').CardName} cardName
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
