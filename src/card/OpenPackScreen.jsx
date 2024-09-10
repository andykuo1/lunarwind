import { useState } from 'react';

import { cn } from '@/libs/react';
import FlyAnimationStyle from '@/libs/style/FlyAnimation.module.css';
import { BoosterPack } from './BoosterPack';
import OpenPackScreenStyle from './OpenPackScreen.module.css';
import { CardTouchSound, PackOpenSound } from './sounds/Sounds';
import { Stack } from './Stack';

/**
 * @param {object} props
 * @param {() => Array<import('./values').CardId>} props.onOpen
 * @param {() => void} props.onDone
 */
export function OpenPackScreen({ onOpen, onDone }) {
  const [flipped, setFlipped] = useState(false);
  const [splayed, setSplayed] = useState(false);
  const [stackIndex, setStackIndex] = useState(0);
  const [cardIds, setCardIds] = useState(
    /** @type {Array<import('./values').CardId>} */ ([])
  );
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
            className={flipped && FlyAnimationStyle.animateFlyInBottom}
            cardIds={cardIds}
            stackIndex={stackIndex}
            splayed={splayed}
            cycled={false}
            onClick={() => {
              if (stackIndex < cardIds.length) {
                CardTouchSound.play();
                setStackIndex((prev) => prev + 1);
              }
              if (stackIndex + 1 === cardIds.length) {
                onDone();
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
          className={cn(
            FlyAnimationStyle.animateFlyInRight,
            flipped && FlyAnimationStyle.animateFlyOutBottom
          )}
          flipped={flipped}
          onClick={() => {
            let result = onOpen();
            console.log(result);
            if (result && result.length > 0) {
              setCardIds(() => {
                PackOpenSound.play();
                // NOTE: Animate with entrance...
                setTimeout(() => setFlipped(true), 300);
                setTimeout(() => setSplayed(true), 300 + 400);
                return result;
              });
            }
          }}
        />
      </div>
    </div>
  );
}
