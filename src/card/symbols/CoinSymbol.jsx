import { Coins } from 'lucide-react';

/**
 * @param {object} props
 * @param {number} props.coin
 */
export function CoinSymbol({ coin }) {
  return (
    <span className="flex h-6 w-6 items-center rounded-full font-mono text-white">
      <Coins />
      <span className="mx-auto">{coin}</span>
    </span>
  );
}
