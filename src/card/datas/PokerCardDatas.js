import { cuid } from '@/libs/math';
import { createPokerCard, toPokerCardName } from './PokerCardData';

/**
 * @param {Partial<import('./PokerCardData').PokerCardData>} values
 */
function add(values) {
  let card = createPokerCard(cuid());
  Object.assign(card, values);
  card.title = toPokerCardName(card.symbol, card.numeral);
  return card;
}

export const ACE_OF_HEARTS = add({
  cardId: 'poker.h1',
  symbol: 'hearts',
  numeral: 1,
  face: false,
});

export const TWO_OF_HEARTS = add({
  cardId: 'poker.h2',
  symbol: 'hearts',
  numeral: 2,
  face: false,
});

export const THREE_OF_HEARTS = add({
  cardId: 'poker.h3',
  symbol: 'hearts',
  numeral: 3,
  face: false,
});

export const FOUR_OF_HEARTS = add({
  cardId: 'poker.h4',
  symbol: 'hearts',
  numeral: 4,
  face: false,
});

export const FIVE_OF_HEARTS = add({
  cardId: 'poker.h5',
  symbol: 'hearts',
  numeral: 5,
  face: false,
});

export const SIX_OF_HEARTS = add({
  cardId: 'poker.h6',
  symbol: 'hearts',
  numeral: 6,
  face: false,
});

export const SEVEN_OF_HEARTS = add({
  cardId: 'poker.h7',
  symbol: 'hearts',
  numeral: 7,
  face: false,
});

export const EIGHT_OF_HEARTS = add({
  cardId: 'poker.h8',
  symbol: 'hearts',
  numeral: 8,
  face: false,
});

export const NINE_OF_HEARTS = add({
  cardId: 'poker.h9',
  symbol: 'hearts',
  numeral: 9,
  face: false,
});

export const TEN_OF_HEARTS = add({
  cardId: 'poker.h10',
  symbol: 'hearts',
  numeral: 10,
  face: false,
});

export const JACK_OF_HEARTS = add({
  cardId: 'poker.h11',
  symbol: 'hearts',
  numeral: 11,
  face: true,
});

export const QUEEN_OF_HEARTS = add({
  cardId: 'poker.h12',
  symbol: 'hearts',
  numeral: 12,
  face: true,
});

export const KING_OF_HEARTS = add({
  cardId: 'poker.h13',
  symbol: 'hearts',
  numeral: 13,
  face: true,
});
