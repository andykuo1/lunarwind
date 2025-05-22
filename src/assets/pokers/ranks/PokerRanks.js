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

const RANKS = [
  Rank00,
  Rank01,
  Rank02,
  Rank03,
  Rank04,
  Rank05,
  Rank06,
  Rank07,
  Rank08,
  Rank09,
  Rank10,
  Rank11,
  Rank12,
  Rank13,
];

/**
 * @param {number} rank
 */
export function getPokerRankUrl(rank) {
  return RANKS[rank] ?? '';
}
