import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/libs/react';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { CardFace } from './Card';
import { HandspaceContainer, HandspaceProvider } from './HandspaceContainer';
import { playCardTouch } from './Sounds';
import { getRandomCard } from './values/Cards';

const DEBUG = false;

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 */
export function Handspace({ handId }) {
  return (
    <HandspaceProvider>
      <HandspaceContainer>
        <CardsInHand handId={handId} />
        <DrawCardButton handId={handId} />
      </HandspaceContainer>
    </HandspaceProvider>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 */
function DrawCardButton({ handId }) {
  const drawCardToHand = usePlayDispatch((ctx) => ctx.drawCardToHand);
  function onClick() {
    drawCardToHand(handId, getRandomCard().cardName);
  }
  return (
    <button
      className="pointer-events-auto absolute bottom-4 right-4 z-20 rounded-xl bg-black p-4 text-2xl hover:bg-white hover:text-black"
      onClick={onClick}
    >
      DRAW
    </button>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 */
function CardsInHand({ handId }) {
  const cardOrder = usePlayStore(
    useShallow((ctx) => ctx.hands[handId]?.cardOrder ?? [])
  );
  return (
    <ul className="flex">
      <div className="flex-1" />
      {cardOrder.map((cardName, handIndex) => (
        <CardInHand
          handId={handId}
          cardName={cardName}
          handIndex={handIndex}
          handCount={cardOrder.length}
        />
      ))}
      <div className="flex-1" />
    </ul>
  );
}

const ANY_CARD_MARGIN = '-ml-20';

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 * @param {import('./values').CardName} props.cardName
 * @param {number} props.handIndex
 * @param {number} props.handCount
 */
function CardInHand({ handId, cardName, handIndex, handCount }) {
  const [peeking, setPeeking] = useState(false);

  const yOffset = Math.trunc(Math.min(handCount / 8, 1) * 240);
  const rotOffset = Math.trunc(Math.min(handCount / 8, 1) * 30);
  const handRatio = (handIndex + 0.5) / handCount - 0.5; // [-0.5, 0.5]
  const handRatioSquared = handRatio * handRatio;
  const isLast = handIndex === handCount;

  const playCard = usePlayDispatch((ctx) => ctx.playCard);
  const removeCardFromHand = usePlayDispatch((ctx) => ctx.removeCardFromHand);

  return (
    <div
      className={cn(
        DEBUG && 'border bg-green-500',
        'pointer-events-auto translate-y-[60%] transition-transform hover:z-10 hover:translate-y-[10%]'
      )}
      style={
        !isLast
          ? {
              width: `${(1 / (handCount + 4)) * 100}%`,
            }
          : {}
      }
      onMouseEnter={() => {
        setPeeking(true);
        playCardTouch();
      }}
      onMouseLeave={() => setPeeking(false)}
      onClick={(e) => {
        let element = /** @type {HTMLElement} */ (e.target);
        let rect = element.getBoundingClientRect();
        playCard(cardName, [
          e.clientX - rect.width / 2,
          e.clientY - rect.height,
        ]);
        removeCardFromHand(handId, handIndex);
      }}
    >
      <CardFace
        cardName={cardName}
        className={cn(
          'pointer-events-none',
          ANY_CARD_MARGIN,
          DEBUG && 'opacity-50'
        )}
        style={
          !peeking
            ? {
                transform: `rotate(${handRatio * rotOffset}deg) translate(0,${handRatioSquared * yOffset}px)`,
              }
            : {}
        }
      />
    </div>
  );
}
