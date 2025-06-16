import { Plebians } from '@/assets/plebians/Plebians';
import { Poker } from '@/assets/pokers/Poker';
import { randChoose } from './RandomCardData';

export * from './CardData';

const POKER_CARD_DATAS = Poker.Cards.values().map((card) => ({
  cardId: card.id,
  layout: 'poker',
}));
const PLEBIAN_CARD_DATAS = Object.values(Plebians.Cards);
const ALL_DATAS = [...POKER_CARD_DATAS, ...PLEBIAN_CARD_DATAS];

/**
 * @param {import('./CardData').CardId} cardId
 * @returns {import('./CardData').CardData|null}
 */
export function getCardDataById(cardId) {
  for (let cardData of getAllCards()) {
    if (cardData.cardId === cardId) {
      return cardData;
    }
  }
  return null;
}

export function pickRandomCardId() {
  return randChoose(getAllCards()).cardId;
}

export function getAllCards() {
  return ALL_DATAS;
}
