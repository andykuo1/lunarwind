import { useRef } from 'react';

import { cn } from '@/libs/react';
import { CardFace } from './Card';
import StackCardStyle from './StackCard.module.css';
import {
  useHoverTiltGlareStyleEffect,
  useHoverTiltShadowStyleEffect,
  useHoverTiltStyleEffect,
} from './UseHoverTiltStyleEffect';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.firstClassName]
 * @param {Array<import('./values').CardId>} props.cardIds
 * @param {number} props.stackIndex
 * @param {boolean} props.splayed
 * @param {boolean} props.cycled
 * @param {import('react').MouseEventHandler} [props.onClick]
 */
export function Stack({
  className,
  cardIds,
  stackIndex,
  cycled,
  splayed,
  onClick,
}) {
  const count = cardIds.length;
  const index = cycled ? stackIndex % count : Math.min(stackIndex, count);

  return (
    <div className={cn('flex w-min p-4', className)} onClick={onClick}>
      <div className="relative m-auto">
        {cycled ? (
          <CycledStackCards
            cardIds={cardIds}
            index={index}
            count={count}
            splayed={splayed}
          />
        ) : (
          <RemainingStackCards
            cardIds={cardIds}
            index={index}
            count={count}
            splayed={splayed}
          />
        )}
        {/* NOTE: We save the last card here for sizing :) */}
        <CardFace className="opacity-0" cardId={cardIds[cardIds.length - 1]} />
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {Array<import('./values').CardId>} props.cardIds
 * @param {number} props.index
 * @param {number} props.count
 * @param {boolean} props.splayed
 */
function CycledStackCards({ cardIds, index, count, splayed }) {
  let elements = [];
  let j = 0;

  for (let i = index; i < count; ++i) {
    elements.push(
      <StackCard
        key={i}
        cardId={cardIds[i]}
        positionFromFront={j}
        positionFromBack={count - i}
        splayed={splayed}
      />
    );
    j++;
  }
  for (let i = 0; i < index; ++i) {
    elements.push(
      <StackCard
        key={i}
        cardId={cardIds[i]}
        positionFromFront={j}
        positionFromBack={count - j}
        splayed={splayed}
      />
    );
    j++;
  }

  return elements;
}

/**
 * @param {object} props
 * @param {Array<import('./values').CardId>} props.cardIds
 * @param {number} props.index
 * @param {number} props.count
 * @param {boolean} props.splayed
 */
function RemainingStackCards({ cardIds, index, count, splayed }) {
  let elements = [];
  let j = 0;
  elements.push(
    <StackCard
      key={index}
      cardId={cardIds[index]}
      positionFromFront={-1}
      positionFromBack={count - index}
      splayed={splayed}
    />
  );
  for (let i = index + 1; i <= count; ++i) {
    elements.push(
      <StackCard
        key={i}
        cardId={cardIds[i]}
        positionFromFront={j}
        positionFromBack={count - i}
        splayed={splayed}
      />
    );
    j++;
  }
  return elements;
}

/**
 * @param {object} props
 * @param {import('./values').CardId} props.cardId
 * @param {number} props.positionFromFront
 * @param {number} props.positionFromBack
 * @param {boolean} props.splayed
 */
function StackCard({ cardId, positionFromFront, positionFromBack, splayed }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const overlayRef = useRef(null);
  const effectStateRef = useHoverTiltStyleEffect(
    innerRef,
    containerRef,
    positionFromFront !== 0,
    false
  );
  useHoverTiltGlareStyleEffect(effectStateRef, overlayRef);
  useHoverTiltShadowStyleEffect(effectStateRef, innerRef);

  let rotation = 0;
  let offsetX = 0;
  let offsetY = 0;
  if (positionFromFront < 3) {
    // Fan out the first 3 cards...
    let i = positionFromFront;
    rotation = i * 5;
    offsetX = i * 2;
    offsetY = -i * 10;
  } else if (positionFromBack < 2) {
    // And fan out the last 2 cards...
    let i = 2;
    rotation = i * 2;
    offsetX = -i * 2;
    offsetY = (i + 2) * 5;
  } else {
    return null;
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute left-0 top-0',
        positionFromFront === -1 && StackCardStyle.exit
      )}
      style={{
        // NOTE: Arbitrary 100 card stack.
        zIndex: 100 - positionFromFront,
        transform: splayed
          ? `rotate(${rotation}deg) translate(${offsetX}px,${offsetY}px)`
          : 'rotate(0) translate(0,0)',
        transitionProperty: 'transform',
        transitionDuration: '0.5s',
      }}
    >
      <CardFace cardId={cardId} innerRef={innerRef} overlayRef={overlayRef} />
    </div>
  );
}
