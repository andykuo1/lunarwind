import { useState } from 'react';

import { cn } from '@/libs/react';
import GridStyle from './Grid.module.css';

/** @typedef {string} ItemId */

/** @type {Record<ItemId, Item>} */
const ITEMS = {
  apples: createRandomItem('apples'),
  oranges: createRandomItem('oranges'),
  peaches: createRandomItem('peaches'),
  guavas: createRandomItem('guavas'),
  mangos: createRandomItem('mangos'),
};

/**
 * @param {object} props
 * @param {string} [props.displayName]
 * @param {number} [props.cols]
 * @param {number} [props.rows]
 * @param {import('react').ReactNode} [props.children]
 */
export function InvScreen({
  displayName = 'Inventory',
  cols = 2,
  rows = 2,
  children,
}) {
  return (
    <fieldset>
      <legend>{displayName}</legend>
      <div
        style={{
          width: `${4 * cols}rem`,
          height: `${4 * rows}rem`,
        }}
        className={cn(
          'outline outline-1 outline-white [--grid-color:#fff]',
          GridStyle.grid
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}

/**
 * @param {object} props
 * @param {Array<Slot>} [props.slots]
 */
export function InvSlots({ slots = [] }) {
  return (
    <div className="relative">
      {slots.map((slot) => slot.content && <InvSlotEntry slot={slot} />)}
    </div>
  );
}

/**
 * @param {object} props
 * @param {Slot} props.slot
 * @param {string} [props.itemId]
 */
export function InvSlotEntry({ slot, itemId = slot?.content?.itemId ?? '' }) {
  const item = ITEMS[itemId];
  if (!item) {
    return null;
  }
  return (
    <button
      style={{
        left: `${4 * slot.coordX}rem`,
        top: `${4 * slot.coordY}rem`,
        width: `${4 * item.width}rem`,
        height: `${4 * item.height}rem`,
        backgroundColor: item.color,
      }}
      className="absolute overflow-hidden"
    >
      {item.displayName}
    </button>
  );
}

/**
 * @param {object} props
 * @param {number} [props.cols]
 * @param {number} [props.rows]
 */
export function InvContainer({ cols = 2, rows = 2 }) {
  const [slots, _updateSlots] = useState(
    /** @type {Array<Slot>} */ ([createRandomSlot(cols, rows)])
  );
  return (
    <InvScreen rows={rows} cols={cols}>
      <InvSlots slots={slots} />
    </InvScreen>
  );
}

/** @typedef {ReturnType<createItem>} Item */

/**
 * @param {ItemId} itemId
 */
function createRandomItem(itemId) {
  return createItem(
    itemId,
    itemId,
    Math.ceil(Math.random() * 3),
    Math.ceil(Math.random() * 3),
    '#ff00ff'
  );
}

/**
 * @param {ItemId} itemId
 * @param {string} [displayName]
 * @param {number} [width]
 * @param {number} [height]
 * @param {string} [color]
 */
function createItem(
  itemId,
  displayName = itemId,
  width = 1,
  height = 1,
  color = '#ff00ff'
) {
  return {
    itemId,
    displayName,
    color,
    width,
    height,
  };
}

/** @typedef {ReturnType<createEmptySlot>} Slot */

/**
 * @param {number} cols
 * @param {number} rows
 */
function createRandomSlot(cols, rows) {
  const itemId =
    Object.keys(ITEMS)[Math.floor(Math.random() * Object.keys(ITEMS).length)];
  const item = ITEMS[itemId];
  let x = Math.floor(Math.random() * (cols - item.width));
  let y = Math.floor(Math.random() * (rows - item.height));
  let result = createEmptySlot(x, y);
  result.content = { itemId: item.itemId };
  return result;
}

/**
 * @param {number} x
 * @param {number} y
 */
function createEmptySlot(x, y) {
  return {
    coordX: x,
    coordY: y,
    /** @type {{ itemId: ItemId }|null} */
    content: null,
  };
}
