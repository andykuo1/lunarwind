import { cuid } from '@/libs/math';
import { createPokerCard, toPokerCardName } from './PokerCardData';

/**
 * @param {import('./PokerCardData').PokerSymbols} suit
 * @param {number} rank
 */
function fromPokerSuitRank(suit, rank) {
  return {
    cardId: `poker.${suit.charAt(0)}${rank}`,
    symbol: suit,
    numeral: rank,
    face: rank > 10,
  };
}

/**
 * @param {Partial<import('./PokerCardData').PokerCardData>} values
 */
function add(values) {
  let card = createPokerCard(cuid());
  Object.assign(card, values);
  card.title = toPokerCardName(card.symbol, card.numeral);
  return card;
}

export const ACE_OF_HEARTS = add(fromPokerSuitRank('hearts', 1));
export const TWO_OF_HEARTS = add(fromPokerSuitRank('hearts', 2));
export const THREE_OF_HEARTS = add(fromPokerSuitRank('hearts', 3));
export const FOUR_OF_HEARTS = add(fromPokerSuitRank('hearts', 4));
export const FIVE_OF_HEARTS = add(fromPokerSuitRank('hearts', 5));
export const SIX_OF_HEARTS = add(fromPokerSuitRank('hearts', 6));
export const SEVEN_OF_HEARTS = add(fromPokerSuitRank('hearts', 7));
export const EIGHT_OF_HEARTS = add(fromPokerSuitRank('hearts', 8));
export const NINE_OF_HEARTS = add(fromPokerSuitRank('hearts', 9));
export const TEN_OF_HEARTS = add(fromPokerSuitRank('hearts', 10));
export const JACK_OF_HEARTS = add(fromPokerSuitRank('hearts', 11));
export const QUEEN_OF_HEARTS = add(fromPokerSuitRank('hearts', 12));
export const KING_OF_HEARTS = add(fromPokerSuitRank('hearts', 13));

export const ACE_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 1));
export const TWO_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 2));
export const THREE_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 3));
export const FOUR_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 4));
export const FIVE_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 5));
export const SIX_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 6));
export const SEVEN_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 7));
export const EIGHT_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 8));
export const NINE_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 9));
export const TEN_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 10));
export const JACK_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 11));
export const QUEEN_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 12));
export const KING_OF_DIAMONDS = add(fromPokerSuitRank('diamonds', 13));

export const ACE_OF_SPADES = add(fromPokerSuitRank('spades', 1));
export const TWO_OF_SPADES = add(fromPokerSuitRank('spades', 2));
export const THREE_OF_SPADES = add(fromPokerSuitRank('spades', 3));
export const FOUR_OF_SPADES = add(fromPokerSuitRank('spades', 4));
export const FIVE_OF_SPADES = add(fromPokerSuitRank('spades', 5));
export const SIX_OF_SPADES = add(fromPokerSuitRank('spades', 6));
export const SEVEN_OF_SPADES = add(fromPokerSuitRank('spades', 7));
export const EIGHT_OF_SPADES = add(fromPokerSuitRank('spades', 8));
export const NINE_OF_SPADES = add(fromPokerSuitRank('spades', 9));
export const TEN_OF_SPADES = add(fromPokerSuitRank('spades', 10));
export const JACK_OF_SPADES = add(fromPokerSuitRank('spades', 11));
export const QUEEN_OF_SPADES = add(fromPokerSuitRank('spades', 12));
export const KING_OF_SPADES = add(fromPokerSuitRank('spades', 13));

export const ACE_OF_CLUBS = add(fromPokerSuitRank('clubs', 1));
export const TWO_OF_CLUBS = add(fromPokerSuitRank('clubs', 2));
export const THREE_OF_CLUBS = add(fromPokerSuitRank('clubs', 3));
export const FOUR_OF_CLUBS = add(fromPokerSuitRank('clubs', 4));
export const FIVE_OF_CLUBS = add(fromPokerSuitRank('clubs', 5));
export const SIX_OF_CLUBS = add(fromPokerSuitRank('clubs', 6));
export const SEVEN_OF_CLUBS = add(fromPokerSuitRank('clubs', 7));
export const EIGHT_OF_CLUBS = add(fromPokerSuitRank('clubs', 8));
export const NINE_OF_CLUBS = add(fromPokerSuitRank('clubs', 9));
export const TEN_OF_CLUBS = add(fromPokerSuitRank('clubs', 10));
export const JACK_OF_CLUBS = add(fromPokerSuitRank('clubs', 11));
export const QUEEN_OF_CLUBS = add(fromPokerSuitRank('clubs', 12));
export const KING_OF_CLUBS = add(fromPokerSuitRank('clubs', 13));
