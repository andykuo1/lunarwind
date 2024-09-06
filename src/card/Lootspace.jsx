import { useEffect, useState } from 'react';

import { cn } from '@/libs/react';
import { CardFace } from './Card';
import StackCardStyle from './StackCard.module.css';
import { getRandomCard } from './values';

const CARD_IDS = [
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
];

export function Lootspace() {
  return (
    <div className="pointer-events-none fixed right-10 top-40">
      <div className="relative h-full w-full">
        <Stack cardIds={CARD_IDS} />
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {Array<import('./values').CardId>} props.cardIds
 */
function Stack({ cardIds }) {
  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const count = cardIds.length;
  let elements = [];
  let j = 0;
  for (let i = currentStackIndex; i < count; ++i) {
    if (j < 3 || j >= count - 3) {
      elements.push(
        <StackCard
          key={i}
          cardId={cardIds[i]}
          stackPosition={j}
          stackSize={count}
        />
      );
    }
    j++;
  }
  for (let i = 0; i < currentStackIndex; ++i) {
    if (j < 3 || j >= count - 3) {
      elements.push(
        <StackCard
          key={i}
          cardId={cardIds[i]}
          stackPosition={j}
          stackSize={count}
        />
      );
    }
    j++;
  }
  useEffect(() => {
    let handle = setTimeout(() => {
      setCurrentStackIndex((prev) => (prev + 1) % count);
    }, 2_000);
    return () => clearTimeout(handle);
  }, [count, currentStackIndex]);
  return (
    <div className="flex w-min rounded-2xl border-2 border-white p-4">
      <div className="relative m-auto">
        {elements}
        {/* NOTE: We save the last card here for sizing :) */}
        <CardFace cardId={cardIds[cardIds.length - 1]} />
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {import('./values').CardId} props.cardId
 * @param {number} props.stackPosition
 * @param {number} props.stackSize
 */
function StackCard({ cardId, stackPosition, stackSize }) {
  let rotation = 0;
  let offsetX = 0;
  let offsetY = 0;
  if (stackPosition < 3) {
    // Fan out the first 3 cards...
    let i = stackPosition;
    rotation = i * 5;
    offsetX = i * 2;
    offsetY = -i * 10;
  } else if (
    stackPosition === stackSize - 3 ||
    stackPosition === stackSize - 2
  ) {
    // And fan out the last 2 cards...
    let i = 2;
    rotation = i * 2;
    offsetX = -i * 2;
    offsetY = (i + 2) * 5;
  } else if (stackPosition === stackSize - 1) {
    // Skip the last card.
  }
  return (
    <div
      className={cn(
        'absolute left-0 top-0',
        stackPosition === 0 && StackCardStyle.stackCardLeaves
      )}
      style={{
        // NOTE: Arbitrary 100 card stack.
        zIndex: 100 - stackPosition,
        transform: `rotate(${rotation}deg) translate(${offsetX}px,${offsetY}px)`,
        transitionProperty: 'transform',
        transitionDuration: '0.5s',
      }}
    >
      <CardFace cardId={cardId} />
    </div>
  );
}
