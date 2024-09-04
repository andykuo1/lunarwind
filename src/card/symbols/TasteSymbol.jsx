import {
  Apple,
  Candy,
  Circle,
  Drumstick,
  Popcorn,
  Sparkle,
} from 'lucide-react';

import { cn } from '@/libs/react';
import { TasteValues } from '../values';

/**
 * @param {object} props
 * @param {import('@/card/values').Taste} props.taste
 */
export function TasteSymbol({ taste }) {
  switch (taste) {
    case TasteValues.SWEET:
      return (
        <SymbolContainer className="bg-blue-300">
          <Candy className="w-4" />
        </SymbolContainer>
      );
    case TasteValues.SOUR:
      return (
        <SymbolContainer className="bg-green-300">
          <Apple className="w-4" />
        </SymbolContainer>
      );
    case TasteValues.SALTY:
      return (
        <SymbolContainer className="bg-yellow-300">
          <Popcorn className="w-4" />
        </SymbolContainer>
      );
    case TasteValues.BITTER:
      return (
        <SymbolContainer className="bg-purple-300">
          <Sparkle className="w-4" />
        </SymbolContainer>
      );
    case TasteValues.SAVORY:
      return (
        <SymbolContainer className="bg-orange-300">
          <Drumstick className="w-4" />
        </SymbolContainer>
      );
    case TasteValues.BLAND:
    default:
      return (
        <SymbolContainer className="bg-gray-300">
          <Circle className="w-4" />
        </SymbolContainer>
      );
  }
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('react').ReactNode} props.children
 */
function SymbolContainer({ className, children }) {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center rounded-full text-center text-gray-600',
        className
      )}
    >
      <span className="mx-auto">{children}</span>
    </span>
  );
}
