const ITEMS = {};
registerItem('apple', 'Apple');

/**
 * @param {string} itemId
 * @param {string} itemName
 */
export function registerItem(itemId, itemName) {
  return {
    itemId,
    itemName,
    width: 1,
    height: 1,
  };
}

export function createWorld() {}
