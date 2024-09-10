import { CARDS } from './index.js';
import { createLootTableEntry, createPack } from './Pack';

export const ALL = createPack(
  'all',
  Object.values(CARDS).map((card) =>
    createLootTableEntry(card.cardId, 1 + Math.abs(card.rarity))
  )
);
