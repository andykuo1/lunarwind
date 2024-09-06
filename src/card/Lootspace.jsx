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
    <div className="pointer-events-none fixed -bottom-[2.25in] -left-[1.75in]">
      <div className="relative h-full w-full">
        <Stack cardIds={CARD_IDS} />
      </div>
    </div>
  );
}
