import Suit01 from './suit1.png';
import Suit02 from './suit2.png';
import Suit00 from './suit3.png';
import Suit03 from './suit3.png';
import Suit04 from './suit4.png';

/** @typedef {'hearts'|'spades'|'clubs'|'diamonds'|'wild'} SuitType */

export const HEARTS = create('hearts', Suit03, '#ee0000');
export const DIAMONDS = create('diamonds', Suit01, '#ff9900');
export const CLUBS = create('clubs', Suit02, '#006688');
export const SPADES = create('spades', Suit04, '#000066');
export const WILD = create('wild', Suit00, '#000000');

const VALUES = [DIAMONDS, CLUBS, HEARTS, SPADES, WILD];
/** @type {Array<string>} */
const KEYS = VALUES.map((v) => v.type);

/** @typedef {ReturnType<create>} SuitProperties */

/**
 * @param {SuitType} type
 * @param {string} imageSrc
 * @param {string} color
 */
function create(type, imageSrc, color) {
  return {
    type,
    imageSrc,
    color,
  };
}

export function values() {
  return VALUES;
}

/**
 * @param {string} type
 */
export function isSuit(type) {
  return KEYS.includes(type);
}

/**
 * @param {SuitType} type
 */
export function of(type) {
  switch (type) {
    case 'wild':
      return WILD;
    case 'diamonds':
      return DIAMONDS;
    case 'clubs':
      return CLUBS;
    case 'hearts':
      return HEARTS;
    case 'spades':
      return SPADES;
    default:
      throw new Error(`Unknown suit type '${type}'.`);
  }
}
