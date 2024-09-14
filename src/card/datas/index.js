import * as CARD_DATAS from './CardDatas';
import { randChoose } from './RandomCardData';

export * from './CardData';

/**
 * @param {import('./CardData').CardId} cardId
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
  return Object.values(CARD_DATAS);
}
