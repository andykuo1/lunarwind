import { Howl } from 'howler';
import { useState } from 'react';

import CardSoundUrl from '@/assets/cardFlip.ogg';
import { cn } from '@/libs/react';
import { CardFace } from './Card';

export function Handspace() {
  const handCount = 8;
  return (
    <div className="absolute -bottom-60 left-0 right-0">
      <ul className="flex">
        <div className="flex-1" />
        <CardInHand handIndex={0} handCount={handCount} />
        <CardInHand handIndex={1} handCount={handCount} />
        <CardInHand handIndex={2} handCount={handCount} />
        <CardInHand handIndex={3} handCount={handCount} />
        <CardInHand handIndex={4} handCount={handCount} />
        <CardInHand handIndex={6} handCount={handCount} />
        <CardInHand handIndex={7} handCount={handCount} />
        <CardInHand handIndex={8} handCount={handCount} />
        <div className="flex-1" />
      </ul>
    </div>
  );
}

/**
 * @param {object} props
 * @param {number} props.handIndex
 * @param {number} props.handCount
 */
function CardInHand({ handIndex, handCount }) {
  const [peeking, setPeeking] = useState(false);

  const yOffset = 240;
  const rotOffset = 30;
  const handRatio = (handIndex + 0.5) / handCount - 0.5; // [-0.5, 0.5]
  const handRatioSquared = handRatio * handRatio;
  const isFirst = handIndex === 0;
  const isLast = handIndex === handCount;

  return (
    <div
      className={cn(
        // DEBUG: 'border bg-green-300',
        'translate-y-[0] transition-transform hover:z-10 hover:-translate-y-[30%]'
      )}
      style={
        !isFirst && !isLast
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
        className={cn(
          'pointer-events-none',
          isFirst ? '-mr-20' : '-ml-20'
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
