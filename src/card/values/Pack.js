/** @typedef {string} PackId */
/** @typedef {ReturnType<createPack>} Pack */

/** @typedef {ReturnType<typeof createLootTableEntry>} LootTableEntry */

/**
 * @param {PackId} packId
 * @param {Array<LootTableEntry>} lootTable
 */
export function createPack(packId, lootTable) {
  return {
    packId,
    packSize: 10,
    lootTable,
    lootTableTotalWeight: lootTable.reduce(
      (prev, curr) => prev + curr.weight,
      0
    ),
  };
}

/**
 * @param {string} cardId
 * @param {number} weight
 */
export function createLootTableEntry(cardId, weight) {
  return {
    cardId,
    weight,
  };
}

/**
 * @param {Pack} pack
 */
export function openPack(pack) {
  let result = [];
  for (let j = 0; j < pack.packSize; ++j) {
    let i = Math.trunc(Math.random() * pack.lootTableTotalWeight);
    let mark = 0;
    let lastEntry = null;
    for (let entry of pack.lootTable) {
      lastEntry = entry;
      if (i > mark) {
        mark += entry.weight;
      } else {
        break;
      }
    }
    result.push(lastEntry?.cardId ?? '');
  }
  return result;
}
