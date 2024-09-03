import { Howl } from 'howler';
import { createContext, useContext, useRef, useState } from 'react';

import CardSoundUrl from '@/assets/cardFlip.ogg';
import { cn } from '@/libs/react';
import { CardFace } from './Card';
import { getRandomCard } from './Cards';

const HandspaceContext = createContext(
  /** @type {ReturnType<useHandspaceContextAPI>|null} */ (null)
);

export function Handspace() {
  return (
    <HandspaceProvider>
      <HandspaceContainer>
        <CardsInHand />
        <DrawCardButton />
      </HandspaceContainer>
    </HandspaceProvider>
  );
}

export function useHandspace() {
  let ctx = useContext(HandspaceContext);
  if (!ctx) {
    throw new Error(
      'Context not found for ancestor - are we missing the provider?'
    );
  }
  return ctx;
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
function HandspaceProvider({ children }) {
  const api = useHandspaceContextAPI();
  return (
    <HandspaceContext.Provider value={api}>
      {children}
    </HandspaceContext.Provider>
  );
}

function useHandspaceContextAPI() {
  const containerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const [cards, updateCards] = useState(
    /** @type {Array<import('./Cards').CardName>} */ ([])
  );
  return {
    containerRef,
    cards,
    updateCards,
  };
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
function HandspaceContainer({ children }) {
  const { containerRef } = useHandspace();
  return (
    <div ref={containerRef} className="absolute bottom-0 left-0 right-0">
      {children}
    </div>
  );
}

function DrawCardButton() {
  const { updateCards } = useHandspace();
  function onClick() {
    updateCards((prev) => [...prev, getRandomCard().cardName]);
  }
  return (
    <button
      className="absolute bottom-4 right-4 z-20 rounded-xl bg-black p-4 text-2xl hover:bg-white hover:text-black"
      onClick={onClick}
    >
      DRAW
    </button>
  );
}

function CardsInHand() {
  const { cards } = useHandspace();
  const handCount = cards.length;
  return (
    <ul className="flex">
      <div className="flex-1" />
      {cards.map((cardName, index) => (
        <CardInHand
          cardName={cardName}
          handIndex={index}
          handCount={handCount}
        />
      ))}
      <div className="flex-1" />
    </ul>
  );
}

const ANY_CARD_MARGIN = '-ml-20';

/**
 * @param {object} props
 * @param {import('./Cards').CardName} props.cardName
 * @param {number} props.handIndex
 * @param {number} props.handCount
 */
function CardInHand({ cardName, handIndex, handCount }) {
  const [peeking, setPeeking] = useState(false);

  const yOffset = Math.trunc(Math.min(handCount / 8, 1) * 240);
  const rotOffset = Math.trunc(Math.min(handCount / 8, 1) * 30);
  const handRatio = (handIndex + 0.5) / handCount - 0.5; // [-0.5, 0.5]
  const handRatioSquared = handRatio * handRatio;
  const isLast = handIndex === handCount;

  return (
    <div
      className={cn(
        // DEBUG: 'border bg-green-300',
        'translate-y-[60%] transition-transform hover:z-10 hover:translate-y-[30%]'
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
      onMouseLeave={() => {
        setPeeking(false);
      }}
    >
      <CardFace
        cardName={cardName}
        className={cn(
          'pointer-events-none',
          ANY_CARD_MARGIN
          // DEBUG: 'opacity-10'
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

const CardSound = new Howl({
  src: [CardSoundUrl],
});
CardSound.pos(0, 2, 0);
let CardSoundLastPlayedMillis = Number.NEGATIVE_INFINITY;
function playCardTouch() {
  let now = performance.now();
  if (now - CardSoundLastPlayedMillis > 60) {
    CardSound.rate(1 + Math.random() * 1);
    CardSound.volume(1);
    CardSound.play();
    CardSoundLastPlayedMillis = now;
  }
}
