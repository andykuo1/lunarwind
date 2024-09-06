import { useRef } from 'react';

import { cn } from '@/libs/react';
import { usePlayDispatch } from '@/stores/play/PlayStore';
import { CardBack } from './Card';
import DeckCardStyle from './DeckCard.module.css';
import { getRandomCard } from './values';

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 * @param {number} props.cardCount
 */
export function Deck({ handId, cardCount }) {
  const topCardRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const drawCardToHand = usePlayDispatch((ctx) => ctx.drawCardToHand);
  function onClick() {
    drawCardToHand(handId, getRandomCard().cardId);
    let element = topCardRef.current;
    element?.classList.toggle(DeckCardStyle.exit, true);
    setTimeout(() => element?.classList.toggle(DeckCardStyle.exit, false), 300);
  }
  return (
    <div className="absolute -bottom-[2.25in] -right-[1.75in]">
      <button
        className="group relative rounded-2xl border-2 border-white bg-transparent p-4"
        onClick={onClick}
      >
        <DeckCards topCardRef={topCardRef} cardCount={cardCount} />
      </button>
    </div>
  );
}

/**
 * @param {object} props
 * @param {import('react').MutableRefObject<HTMLDivElement|null>} props.topCardRef
 * @param {number} props.cardCount
 */
function DeckCards({ topCardRef, cardCount }) {
  if (cardCount <= 0) {
    return null;
  } else if (cardCount === 1) {
    return (
      <DeckCard
        containerRef={topCardRef}
        className="transition-transform group-hover:-translate-y-6"
      />
    );
  } else if (cardCount === 2) {
    return (
      <>
        <DeckCard />
        <DeckCard
          containerRef={topCardRef}
          className="absolute left-6 top-3 transition-transform group-hover:-translate-y-6"
        />
      </>
    );
  } else {
    return (
      <>
        <DeckCard />
        <DeckCard className="absolute left-6 top-3" />
        <DeckCard
          containerRef={topCardRef}
          className="absolute left-8 top-2 transition-transform group-hover:-translate-y-6"
        />
      </>
    );
  }
}

/**
 * @param {object} props
 * @param {import('react').MutableRefObject<HTMLDivElement|null>} [props.containerRef]
 * @param {string} [props.className]
 */
function DeckCard({ containerRef, className }) {
  return (
    <div
      ref={containerRef}
      className={cn('rounded-xl shadow-xl shadow-black/50', className)}
    >
      <CardBack />
    </div>
  );
}
