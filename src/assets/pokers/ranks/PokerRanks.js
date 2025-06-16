import Rank00 from './rank0.png';
import Rank01 from './rank1.png';
import Rank02 from './rank2.png';
import Rank03 from './rank3.png';
import Rank04 from './rank4.png';
import Rank05 from './rank5.png';
import Rank06 from './rank6.png';
import Rank07 from './rank7.png';
import Rank08 from './rank8.png';
import Rank09 from './rank9.png';
import Rank10 from './rank10.png';
import Rank11 from './rank11.png';
import Rank12 from './rank12.png';
import Rank13 from './rank13.png';

/** @typedef {0|1|2|3|4|5|6|7|8|9|10|11|12|13} RankNumber */

export const NONE = create(0, 'none', Rank00);
export const ACE = create(1, 'ace', Rank01);
export const TWO = create(2, 'two', Rank02);
export const THREE = create(3, 'three', Rank03);
export const FOUR = create(4, 'four', Rank04);
export const FIVE = create(5, 'five', Rank05);
export const SIX = create(6, 'six', Rank06);
export const SEVEN = create(7, 'seven', Rank07);
export const EIGHT = create(8, 'eight', Rank08);
export const NINE = create(9, 'nine', Rank09);
export const TEN = create(10, 'ten', Rank10);
export const JACK = create(11, 'jack', Rank11);
export const QUEEN = create(12, 'queen', Rank12);
export const KING = create(13, 'king', Rank13);

const VALUES = [
  NONE,
  ACE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
];

/** @typedef {ReturnType<create>} RankProperties */

/**
 * @param {RankNumber} rankNumber
 * @param {string} name
 * @param {string} imageSrc
 */
function create(rankNumber, name, imageSrc) {
  return {
    number: rankNumber,
    name,
    char:
      rankNumber === 1
        ? 'A'
        : rankNumber === 10
          ? '10'
          : rankNumber === 11
            ? 'J'
            : rankNumber === 12
              ? 'Q'
              : rankNumber === 13
                ? 'K'
                : rankNumber,
    face: rankNumber > 10,
    imageSrc,
  };
}

export function values() {
  return VALUES;
}

/**
 * @param {number} number
 */
export function isRank(number) {
  return Number.isInteger(number) && number >= 0 && number <= 13;
}

/**
 * @param {number} number
 */
export function of(number) {
  let index = Math.trunc(number);
  if (index < 0 && index >= VALUES.length) {
    throw new Error(`Not a valid rank '${number}'.`);
  }
  let result = VALUES[index];
  if (!result) {
    throw new Error('No rank exists for this index.');
  }
  return result;
}
