import { capitalizeFirst } from '@/libs/string';
import { isRank, of as rankOf } from '../ranks/PokerRanks';
import { isSuit } from '../suits/PokerSuits';
// Diamonds
import PokerCard01 from './poker1.png';
import PokerCard02 from './poker2.png';
import PokerCard03 from './poker3.png';
import PokerCard04 from './poker4.png';
import PokerCard05 from './poker5.png';
import PokerCard06 from './poker6.png';
import PokerCard07 from './poker7.png';
import PokerCard08 from './poker8.png';
import PokerCard09 from './poker9.png';
import PokerCard10 from './poker10.png';
import PokerCard11 from './poker11.png';
import PokerCard12 from './poker12.png';
import PokerCard13 from './poker13.png';
// Clubs
import PokerCard14 from './poker14.png';
import PokerCard15 from './poker15.png';
import PokerCard16 from './poker16.png';
import PokerCard17 from './poker17.png';
import PokerCard18 from './poker18.png';
import PokerCard19 from './poker19.png';
import PokerCard20 from './poker20.png';
import PokerCard21 from './poker21.png';
import PokerCard22 from './poker22.png';
import PokerCard23 from './poker23.png';
import PokerCard24 from './poker24.png';
import PokerCard25 from './poker25.png';
import PokerCard26 from './poker26.png';
// Hearts
import PokerCard27 from './poker27.png';
import PokerCard28 from './poker28.png';
import PokerCard29 from './poker29.png';
import PokerCard30 from './poker30.png';
import PokerCard31 from './poker31.png';
import PokerCard32 from './poker32.png';
import PokerCard33 from './poker33.png';
import PokerCard34 from './poker34.png';
import PokerCard35 from './poker35.png';
import PokerCard36 from './poker36.png';
import PokerCard37 from './poker37.png';
import PokerCard38 from './poker38.png';
import PokerCard39 from './poker39.png';
// Spades
import PokerCard40 from './poker40.png';
import PokerCard41 from './poker41.png';
import PokerCard42 from './poker42.png';
import PokerCard43 from './poker43.png';
import PokerCard44 from './poker44.png';
import PokerCard45 from './poker45.png';
import PokerCard46 from './poker46.png';
import PokerCard47 from './poker47.png';
import PokerCard48 from './poker48.png';
import PokerCard49 from './poker49.png';
import PokerCard50 from './poker50.png';
import PokerCard51 from './poker51.png';
import PokerCard52 from './poker52.png';

export const ACE_OF_HEARTS = create('hearts', 1, PokerCard27);
export const TWO_OF_HEARTS = create('hearts', 2, PokerCard28);
export const THREE_OF_HEARTS = create('hearts', 3, PokerCard29);
export const FOUR_OF_HEARTS = create('hearts', 4, PokerCard30);
export const FIVE_OF_HEARTS = create('hearts', 5, PokerCard31);
export const SIX_OF_HEARTS = create('hearts', 6, PokerCard32);
export const SEVEN_OF_HEARTS = create('hearts', 7, PokerCard33);
export const EIGHT_OF_HEARTS = create('hearts', 8, PokerCard34);
export const NINE_OF_HEARTS = create('hearts', 9, PokerCard35);
export const TEN_OF_HEARTS = create('hearts', 10, PokerCard36);
export const JACK_OF_HEARTS = create('hearts', 11, PokerCard37);
export const QUEEN_OF_HEARTS = create('hearts', 12, PokerCard38);
export const KING_OF_HEARTS = create('hearts', 13, PokerCard39);

export const ACE_OF_DIAMONDS = create('diamonds', 1, PokerCard01);
export const TWO_OF_DIAMONDS = create('diamonds', 2, PokerCard02);
export const THREE_OF_DIAMONDS = create('diamonds', 3, PokerCard03);
export const FOUR_OF_DIAMONDS = create('diamonds', 4, PokerCard04);
export const FIVE_OF_DIAMONDS = create('diamonds', 5, PokerCard05);
export const SIX_OF_DIAMONDS = create('diamonds', 6, PokerCard06);
export const SEVEN_OF_DIAMONDS = create('diamonds', 7, PokerCard07);
export const EIGHT_OF_DIAMONDS = create('diamonds', 8, PokerCard08);
export const NINE_OF_DIAMONDS = create('diamonds', 9, PokerCard09);
export const TEN_OF_DIAMONDS = create('diamonds', 10, PokerCard10);
export const JACK_OF_DIAMONDS = create('diamonds', 11, PokerCard11);
export const QUEEN_OF_DIAMONDS = create('diamonds', 12, PokerCard12);
export const KING_OF_DIAMONDS = create('diamonds', 13, PokerCard13);

export const ACE_OF_SPADES = create('spades', 1, PokerCard40);
export const TWO_OF_SPADES = create('spades', 2, PokerCard41);
export const THREE_OF_SPADES = create('spades', 3, PokerCard42);
export const FOUR_OF_SPADES = create('spades', 4, PokerCard43);
export const FIVE_OF_SPADES = create('spades', 5, PokerCard44);
export const SIX_OF_SPADES = create('spades', 6, PokerCard45);
export const SEVEN_OF_SPADES = create('spades', 7, PokerCard46);
export const EIGHT_OF_SPADES = create('spades', 8, PokerCard47);
export const NINE_OF_SPADES = create('spades', 9, PokerCard48);
export const TEN_OF_SPADES = create('spades', 10, PokerCard49);
export const JACK_OF_SPADES = create('spades', 11, PokerCard50);
export const QUEEN_OF_SPADES = create('spades', 12, PokerCard51);
export const KING_OF_SPADES = create('spades', 13, PokerCard52);

export const ACE_OF_CLUBS = create('clubs', 1, PokerCard14);
export const TWO_OF_CLUBS = create('clubs', 2, PokerCard15);
export const THREE_OF_CLUBS = create('clubs', 3, PokerCard16);
export const FOUR_OF_CLUBS = create('clubs', 4, PokerCard17);
export const FIVE_OF_CLUBS = create('clubs', 5, PokerCard18);
export const SIX_OF_CLUBS = create('clubs', 6, PokerCard19);
export const SEVEN_OF_CLUBS = create('clubs', 7, PokerCard20);
export const EIGHT_OF_CLUBS = create('clubs', 8, PokerCard21);
export const NINE_OF_CLUBS = create('clubs', 9, PokerCard22);
export const TEN_OF_CLUBS = create('clubs', 10, PokerCard23);
export const JACK_OF_CLUBS = create('clubs', 11, PokerCard24);
export const QUEEN_OF_CLUBS = create('clubs', 12, PokerCard25);
export const KING_OF_CLUBS = create('clubs', 13, PokerCard26);

const VALUES = [
  // Diamonds
  ACE_OF_DIAMONDS,
  TWO_OF_DIAMONDS,
  THREE_OF_DIAMONDS,
  FOUR_OF_DIAMONDS,
  FIVE_OF_DIAMONDS,
  SIX_OF_DIAMONDS,
  SEVEN_OF_DIAMONDS,
  EIGHT_OF_DIAMONDS,
  NINE_OF_DIAMONDS,
  TEN_OF_DIAMONDS,
  JACK_OF_DIAMONDS,
  QUEEN_OF_DIAMONDS,
  KING_OF_DIAMONDS,
  // Clubs
  ACE_OF_CLUBS,
  TWO_OF_CLUBS,
  THREE_OF_CLUBS,
  FOUR_OF_CLUBS,
  FIVE_OF_CLUBS,
  SIX_OF_CLUBS,
  SEVEN_OF_CLUBS,
  EIGHT_OF_CLUBS,
  NINE_OF_CLUBS,
  TEN_OF_CLUBS,
  JACK_OF_CLUBS,
  QUEEN_OF_CLUBS,
  KING_OF_CLUBS,
  // Hearts
  ACE_OF_HEARTS,
  TWO_OF_HEARTS,
  THREE_OF_HEARTS,
  FOUR_OF_HEARTS,
  FIVE_OF_HEARTS,
  SIX_OF_HEARTS,
  SEVEN_OF_HEARTS,
  EIGHT_OF_HEARTS,
  NINE_OF_HEARTS,
  TEN_OF_HEARTS,
  JACK_OF_HEARTS,
  QUEEN_OF_HEARTS,
  KING_OF_HEARTS,
  // Spades
  ACE_OF_SPADES,
  TWO_OF_SPADES,
  THREE_OF_SPADES,
  FOUR_OF_SPADES,
  FIVE_OF_SPADES,
  SIX_OF_SPADES,
  SEVEN_OF_SPADES,
  EIGHT_OF_SPADES,
  NINE_OF_SPADES,
  TEN_OF_SPADES,
  JACK_OF_SPADES,
  QUEEN_OF_SPADES,
  KING_OF_SPADES,
];

/** @typedef {ReturnType<create>} PokerCard */

/**
 * @param {import('../suits/PokerSuits').SuitType} suitType
 * @param {import('../ranks/PokerRanks').RankNumber} rankNumber
 * @param {string} imageSrc
 */
function create(suitType, rankNumber, imageSrc) {
  const rank = rankOf(rankNumber);
  const name = `${capitalizeFirst(rank.name)} of ${capitalizeFirst(suitType)}`;
  const id = `poker.${suitType.charAt(0)}${rank.number}`;
  return {
    id,
    suit: suitType,
    rank: rankNumber,
    imageSrc,
    name,
  };
}

export function values() {
  return VALUES;
}

/**
 * @param {string} id
 */
export function ofId(id) {
  for (let card of VALUES) {
    if (card.id === id) {
      return card;
    }
  }
  throw new Error(`No card with id '${id}'.`);
}

/**
 * @param {import('../suits/PokerSuits').SuitType} suit
 * @param {import('../ranks/PokerRanks').RankNumber} rank
 */
export function of(suit, rank) {
  if (!isSuit(suit) || suit === 'wild') {
    throw new Error('Invalid poker suit.');
  }
  if (!isRank(rank) || rank === 0) {
    throw new Error('Invalid poker rank.');
  }
  let suitOffset;
  switch (suit) {
    case 'diamonds':
      suitOffset = 0;
      break;
    case 'clubs':
      suitOffset = 13;
      break;
    case 'hearts':
      suitOffset = 26;
      break;
    case 'spades':
      suitOffset = 39;
      break;
  }
  let result = VALUES[suitOffset + rank - 1];
  if (!result) {
    throw new Error(`No card exists for this suit and rank '${suit} ${rank}'.`);
  }
  return result;
}
