import { cuid } from '@/libs/math';
import { attachZustyUpgradeSchema } from '@/libs/zusty';

/** @typedef {ReturnType<createStore>} Store */
/** @typedef {ReturnType<createPlayer>} Player */
/** @typedef {ReturnType<createWorld>} World */
/** @typedef {ReturnType<createInventory>} Inventory */

/** @typedef {string} PlayerId */
/** @typedef {string} WorldId */
/** @typedef {string} InventoryId */

export function createStore() {
  return {
    /** @type {Record<PlayerId, Player>} */
    players: {},
    world: createWorld(),
    /** @type {Record<InventoryId, Inventory>} */
    inventories: {},
    /** Any user-specific settings */
    userSettings: {},
    /** Any session-long settings */
    sessionSettings: {},
  };
}
attachZustyUpgradeSchema(createStore, {
  players: (prev) => createPlayer(prev.playerId),
  inventories: (prev) => createInventory(prev.inventoryId),
});

/**
 * @param {PlayerId} playerId
 */
export function createPlayer(playerId = cuid()) {
  return {
    playerId,
  };
}

/**
 * @param {WorldId} worldId
 */
export function createWorld(worldId = cuid()) {
  return {
    worldId,
  };
}

/**
 * @param {InventoryId} inventoryId
 */
export function createInventory(inventoryId = cuid()) {
  return {
    inventoryId,
  };
}
