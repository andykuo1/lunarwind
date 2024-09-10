import { useState } from 'react';

import { cn } from '@/libs/react';
import { BoosterPack } from './BoosterPack';
import OpenPackScreenStyle from './OpenPackScreen.module.css';
import { CardTouchSound, PackOpenSound } from './sounds/Sounds';
import { Stack } from './Stack';
import { getRandomCard } from './values';

const CARD_IDS = [
  getRandomCard().cardId,
  getRandomCard().cardId,
  getRandomCard().cardId,
];

export function OpenPackScreen() {
  const [flipped, setFlipped] = useState(false);
  const [splayed, setSplayed] = useState(false);
  const [stackIndex, setStackIndex] = useState(0);
  const count = CARD_IDS.length;
  return (
    <div
      className={cn(
        'relative h-full w-full bg-gray-800',
        OpenPackScreenStyle.background
      )}
    >
      {flipped && (
        <div
          className={cn(
            'absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
          )}
        >
          <Stack
            className={flipped && OpenPackScreenStyle.flyinBottom}
            firstClassName="scale-150 transition-transform"
            cardIds={CARD_IDS}
            stackIndex={stackIndex}
            splayed={splayed}
            cycled={false}
            onClick={() => {
              if (stackIndex < count) {
                CardTouchSound.play();
                setStackIndex((prev) => prev + 1);
              }
            }}
          />
        </div>
      )}
      <div
        className={cn(
          'absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
          flipped && 'pointer-events-none'
        )}
      >
        <BoosterPack
          className={cn(flipped && OpenPackScreenStyle.flyoutBottom)}
          flipped={flipped}
          onClick={() => {
            PackOpenSound.play();
            // NOTE: Animate with entrance...
            setTimeout(() => setFlipped(true), 300);
            setTimeout(() => setSplayed(true), 300 + 400);
          }}
        />
      </div>
    </div>
  );
}
