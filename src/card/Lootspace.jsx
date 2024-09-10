import { useEffect, useState } from 'react';

import { Stack } from './Stack';
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
  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const count = CARD_IDS.length;
  useEffect(() => {
    let handle = setTimeout(() => {
      setCurrentStackIndex((prev) => (prev + 1) % count);
    }, 2_000);
    return () => clearTimeout(handle);
  }, [count, currentStackIndex]);
  return (
    <div className="pointer-events-none fixed -bottom-[2.25in] -left-[1.75in]">
      <div className="relative h-full w-full">
        <Stack
          className="rounded-2xl border-2 border-transparent hover:border-white/30"
          cardIds={CARD_IDS}
          stackIndex={currentStackIndex}
        />
      </div>
    </div>
  );
}
