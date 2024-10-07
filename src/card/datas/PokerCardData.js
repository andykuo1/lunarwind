import PokerClubUrl from '@/assets/pokers/pokerClub.png';
import PokerDiamondUrl from '@/assets/pokers/pokerDiamond.png';
import PokerHeartUrl from '@/assets/pokers/pokerHeart.png';
import PokerSpadeUrl from '@/assets/pokers/pokerSpade.png';
import { capitalizeFirst } from '@/libs/string';

/** @typedef {ReturnType<createPokerCard>} PokerCardData */
/** @typedef {'hearts'|'spades'|'clubs'|'diamonds'|'wild'} PokerSymbols */

/**
 * @param {import('./CardData').CardId} cardId
 */
export function createPokerCard(cardId) {
  return {
    cardId,
    layout: 'poker',
    title: '???',
    /** @type {PokerSymbols} */
    symbol: 'wild',
    numeral: 0,
    face: false,
  };
}

/**
 * @param {PokerSymbols} symbol
 * @param {number} numeral
 */
export function toPokerCardName(symbol, numeral) {
  return `${capitalizeFirst(toPokerNumeralName(numeral))} of ${capitalizeFirst(symbol)}`;
}

/**
 * @param {PokerSymbols} symbol
 */
export function getPokerSymbolUrl(symbol) {
  switch (symbol) {
    case 'hearts':
      return PokerHeartUrl;
    case 'spades':
      return PokerSpadeUrl;
    case 'diamonds':
      return PokerDiamondUrl;
    case 'clubs':
      return PokerClubUrl;
    case 'wild':
      return '';
    default:
      return '';
  }
}

/**
 * @param {number} num
 */
export function toPokerNumeralName(num) {
  switch (num) {
    case 0:
      return 'joker';
    case 1:
      return 'ace';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    case 10:
      return 'ten';
    case 11:
      return 'jack';
    case 12:
      return 'queen';
    case 13:
      return 'king';
    default:
      return '?';
  }
}
