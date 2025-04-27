/** @typedef {ReturnType<createTrader>} Trader */

import { useState } from 'react';

import { cn } from '@/libs/react';

export function createTrader() {
  return {
    name: `Bob's Knacks & Wares`,
    /** @type {Record<string, number>} */
    stocks: {
      apples: 1_000,
      oranges: 600,
      peaches: 800,
      guavas: 2,
      mangos: 40,
    },
  };
}

/** @typedef {ReturnType<createMarket>} Market */

export function createMarket() {
  return {
    /** @type {Record<string, number>} */
    prices: {
      apples: 10, // 1
      oranges: 35, // 2
      peaches: 110, // 3
      guavas: 200, // 7
      mangos: 700, // 11
    },
  };
}

/** @typedef {ReturnType<createTrade>} Trade */

/**
 * @param {string} itemName
 * @param {Trader} [trader]
 * @param {Market} [market]
 */
function createTrade(itemName, trader, market) {
  const stock = trader?.stocks?.[itemName] ?? 0;
  const price = market?.prices?.[itemName] ?? 0;
  return {
    itemName: itemName,
    stock,
    price,
    amount: 0,
  };
}

/** @typedef {ReturnType<createTradeManifest>} TradeManifest */

/**
 * @param {Trader} [trader]
 * @param {Market} [market]
 */
function createTradeManifest(trader, market) {
  return /** @type {Record<string, Trade>} */ ({
    apples: createTrade('apples', trader, market),
    oranges: createTrade('oranges', trader, market),
    peaches: createTrade('peaches', trader, market),
    guavas: createTrade('guavas', trader, market),
    mangos: createTrade('mangos', trader, market),
  });
}

/**
 * @param {object} props
 * @param {Trader} props.trader
 * @param {Market} props.market
 */
export function TradeScreen({ trader, market }) {
  const [buys, updateBuys] = useState(createTradeManifest(trader, market));
  const [sells, updateSells] = useState(createTradeManifest(trader, market));
  return (
    <fieldset className="font-mono">
      <legend>{trader.name}</legend>
      <table className="border">
        <thead>
          <tr>
            <th></th>
            <th className="w-20">◆◆◆</th>
            <th className="w-20">¢</th>
            <th className="w-20">
              <span>⇌</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(buys).map((itemName) => (
            <TradeScreenEntryFromTrades
              itemName={itemName}
              trades={buys}
              otherTrades={sells}
              updateTrades={updateBuys}
            />
          ))}
          <tr>
            <th colSpan={4}>
              <hr />
            </th>
          </tr>
          {Object.keys(sells).map((itemName) => (
            <TradeScreenEntryFromTrades
              itemName={itemName}
              trades={sells}
              otherTrades={buys}
              updateTrades={updateSells}
            />
          ))}
        </tbody>
        <tfoot className="border">
          <TradeScreenTotalEntry buys={buys} sells={sells} />
        </tfoot>
      </table>
    </fieldset>
  );
}

/**
 * @param {object} props
 * @param {Record<string, Trade>} props.buys
 * @param {Record<string, Trade>} props.sells
 */
function TradeScreenTotalEntry({ buys, sells }) {
  const value =
    Object.values(buys).reduce(
      (prev, curr) => prev - curr.price * curr.amount,
      0
    ) +
    Object.values(sells).reduce(
      (prev, curr) => prev + curr.price * curr.amount,
      0
    );
  const units =
    Object.values(buys).reduce((prev, curr) => prev + curr.amount, 0) +
    Object.values(sells).reduce((prev, curr) => prev - curr.amount, 0);
  return (
    <tr>
      <th className="px-8 py-4 text-right">TOTAL</th>
      <td className="text-center">{formatExchangeNumber(units)}</td>
      <td></td>
      <td className="text-center">{value}</td>
    </tr>
  );
}

/**
 * @param {number} value
 */
function formatExchangeNumber(value) {
  return `(${Math.sign(value) >= 0 ? '+' : '-'}${Math.abs(value)})`;
}

/**
 * @param {object} props
 * @param {string} [props.itemName]
 * @param {Record<string, any>} [props.trades]
 * @param {Record<string, any>} [props.otherTrades]
 * @param {import('react').Dispatch<import('react').SetStateAction<TradeManifest>>} [props.updateTrades]
 */
function TradeScreenEntryFromTrades({
  itemName = '???',
  trades,
  otherTrades,
  updateTrades,
}) {
  const trade = trades?.[itemName] ?? {};
  const otherTrade = otherTrades?.[itemName] ?? {};
  return (
    <TradeScreenEntry
      itemName={itemName}
      stockCount={trade?.stock}
      stockOffset={otherTrade?.amount}
      unitPrice={trade?.price}
      amount={trade?.amount}
      onChange={(value) =>
        updateTrades?.((prev) => {
          let result = {
            ...prev,
          };
          let trade = {
            ...createTrade(itemName),
            ...result[itemName],
          };
          let sum = value;
          sum = Math.max(0, sum);
          sum = Math.min(trade?.stock, sum);
          trade.amount = sum;
          result[itemName] = trade;
          return result;
        })
      }
    />
  );
}

/**
 * @param {object} props
 * @param {string} [props.itemName]
 * @param {number} [props.stockCount]
 * @param {number} [props.stockOffset]
 * @param {number} [props.unitPrice]
 * @param {number} [props.amount]
 * @param {(value: number) => void} [props.onChange]
 */
function TradeScreenEntry({
  itemName = '???',
  stockCount = 0,
  stockOffset = 0,
  unitPrice = 0,
  amount = 0,
  onChange = () => {},
}) {
  const atMax = amount >= stockCount;
  const atMin = amount <= 0;
  const isButtonMax = amount / stockCount >= 0.5;
  const isButtonMul2 = amount > 4;
  return (
    <tr className="h-16">
      <th>{itemName}</th>
      <td className="relative text-center">
        <div>{stockCount}</div>
        <div
          className={cn(
            'absolute bottom-2 left-0 right-0 text-xs',
            stockOffset <= 0 && 'opacity-0'
          )}
        >
          {formatExchangeNumber(stockOffset)}
        </div>
      </td>
      <td className="text-center">{unitPrice}</td>
      <td className="flex h-16 items-center gap-2">
        <button
          className="w-10 px-2 py-1 text-sm disabled:opacity-30"
          disabled={atMin}
          onClick={() => onChange(0)}
        >
          min
        </button>
        <input
          type="number"
          className="w-24 text-right"
          min={0}
          max={stockCount}
          value={amount}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          className="w-10 px-2 py-1 text-sm disabled:opacity-30"
          disabled={atMax}
          onClick={() =>
            onChange(
              isButtonMax ? stockCount : isButtonMul2 ? amount * 2 : amount + 1
            )
          }
        >
          {isButtonMax ? 'max' : isButtonMul2 ? 'x2' : '+1'}
        </button>
      </td>
    </tr>
  );
}
