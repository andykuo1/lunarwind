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
  return (
    <div className="pointer-events-none fixed right-10 top-40">
      <div className="relative h-full w-full">
        <Stack cardIds={CARD_IDS} />
      </div>
    </div>
  );
}
