import { cn } from '@/libs/react';
import { usePlayDispatch } from '@/stores/play/PlayStore';
import { CardBack } from './Card';
import { getRandomCard } from './values';

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 * @param {number} props.cardCount
 */
export function Deck({ handId, cardCount }) {
  const drawCardToHand = usePlayDispatch((ctx) => ctx.drawCardToHand);
  function onClick() {
    drawCardToHand(handId, getRandomCard().cardId);
  }
  return (
    <div className="absolute -bottom-[2.25in] -right-[1.75in]">
      <button
        className="relative rounded-2xl border-2 border-white bg-transparent p-4"
        onClick={onClick}
      >
        <DeckCards cardCount={cardCount} />
      </button>
    </div>
  );
}

/**
 * @param {object} props
 * @param {number} props.cardCount
 */
function DeckCards({ cardCount }) {
  if (cardCount <= 0) {
    return null;
  } else if (cardCount === 1) {
    return <DeckCard className="transition-transform hover:-translate-y-6" />;
  } else if (cardCount === 2) {
    return (
      <>
        <DeckCard />
        <DeckCard className="absolute left-6 top-3 transition-transform hover:-translate-y-6" />
      </>
    );
  } else {
    return (
      <>
        <DeckCard />
        <DeckCard className="absolute left-6 top-3" />
        <DeckCard className="absolute left-8 top-2 transition-transform hover:-translate-y-6" />
      </>
    );
  }
}

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function DeckCard({ className }) {
  return (
    <div className={cn('rounded-xl shadow-xl shadow-black/50', className)}>
      <CardBack />
    </div>
  );
}
