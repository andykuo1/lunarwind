import * as CARD_DATAS from './CardDatas';
import * as POKER_CARD_DATAS from './PokerCardDatas';
import { randChoose } from './RandomCardData';

export * from './CardData';

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
  let allCards = { ...CARD_DATAS, ...POKER_CARD_DATAS };
  return Object.values(allCards);
}
