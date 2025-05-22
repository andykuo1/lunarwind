// Diamond
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
// Club
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
// Heart
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
// Spade
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

/** @type {Record<import('@/card/datas/PokerCardData').PokerSymbols, Array<string>>} */
const POKER_CARDS = {
  diamonds: [
    PokerCard01,
    PokerCard02,
    PokerCard03,
    PokerCard04,
    PokerCard05,
    PokerCard06,
    PokerCard07,
    PokerCard08,
    PokerCard09,
    PokerCard10,
    PokerCard11,
    PokerCard12,
    PokerCard13,
  ],
  clubs: [
    PokerCard14,
    PokerCard15,
    PokerCard16,
    PokerCard17,
    PokerCard18,
    PokerCard19,
    PokerCard20,
    PokerCard21,
    PokerCard22,
    PokerCard23,
    PokerCard24,
    PokerCard25,
    PokerCard26,
  ],
  hearts: [
    PokerCard27,
    PokerCard28,
    PokerCard29,
    PokerCard30,
    PokerCard31,
    PokerCard32,
    PokerCard33,
    PokerCard34,
    PokerCard35,
    PokerCard36,
    PokerCard37,
    PokerCard38,
    PokerCard39,
  ],
  spades: [
    PokerCard40,
    PokerCard41,
    PokerCard42,
    PokerCard43,
    PokerCard44,
    PokerCard45,
    PokerCard46,
    PokerCard47,
    PokerCard48,
    PokerCard49,
    PokerCard50,
    PokerCard51,
    PokerCard52,
  ],
  wild: [
    PokerCard27,
    PokerCard28,
    PokerCard29,
    PokerCard30,
    PokerCard31,
    PokerCard32,
    PokerCard33,
    PokerCard34,
    PokerCard35,
    PokerCard36,
    PokerCard37,
    PokerCard38,
    PokerCard39,
  ],
};

/**
 * @param {import('@/card/datas/PokerCardData').PokerSymbols} suit
 * @param {number} rank
 */
export function getPokerFaceUrl(suit, rank) {
  const ranks = POKER_CARDS[suit] ?? {};
  return ranks[rank - 1] ?? '';
}
