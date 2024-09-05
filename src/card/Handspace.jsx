import { useCallback, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/libs/react';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { CardFace } from './Card';
import {
  HandspaceContainer,
  HandspaceProvider,
  useHandspace,
} from './HandspaceContainer';
import { playCardTouch } from './Sounds';
import {
  useOnDragDropHandler,
  useOnDragMoveHandler,
} from './UseOnDragMoveHandler';
import { getRandomCard } from './values/Cards';

const DEBUG = false;

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 */
export function Handspace({ handId }) {
  return (
    <>
      <HandspaceProvider>
        <DropZoneToPlay
          className="absolute bottom-0 left-0 right-0 top-0"
          handId={handId}
        />
        <HandspaceContainer>
          <DropZoneToHand
            className="absolute bottom-0 left-0 right-0 top-0"
            handId={handId}
          />
          <CardsInHand handId={handId} />
          <DrawCardButton handId={handId} />
        </HandspaceContainer>
      </HandspaceProvider>
    </>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('@/stores/play/State').HandId} props.handId
 */
function DropZoneToPlay({ className, handId }) {
  const ref = useRef(null);
  const { containerRef, handlerStateRef, anyGrabbing } = useHandspace();
  const playCardFromHand = usePlayDispatch((ctx) => ctx.playCardFromHand);

  const dropCallback = useCallback(
    /**
     * @param {MouseEvent} e
     * @param {HTMLElement} target
     */
    function onDragHandlerDrop(e, target) {
      let handIndex = Number(target.getAttribute('data-hand-index'));
      if (!Number.isFinite(handIndex)) {
        return;
      }
      playCardFromHand(handId, handIndex, [e.clientX, e.clientY]);
    },
    [handId, playCardFromHand]
  );
  useOnDragDropHandler(ref, containerRef, handlerStateRef, dropCallback);
  return (
    <div
      ref={ref}
      className={cn(
        anyGrabbing ? 'pointer-events-auto' : 'pointer-events-none',
        DEBUG && anyGrabbing && 'bg-red-300/30',
        className
      )}
    />
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('@/stores/play/State').HandId} props.handId
 */
function DropZoneToHand({ className, handId }) {
  const ref = useRef(null);
  const { containerRef, handlerStateRef, anyGrabbing } = useHandspace();
  const moveCardThroughHand = usePlayDispatch((ctx) => ctx.moveCardThroughHand);
  const dropCallback = useCallback(
    /**
     * @param {MouseEvent} _e
     * @param {HTMLElement} target
     */
    function onDragHandlerDrop(_e, target) {
      // Return to hand.
      let droppedHandIndex = Number(target.getAttribute('data-hand-index'));
      if (!Number.isFinite(droppedHandIndex)) {
        return;
      }
      moveCardThroughHand(handId, droppedHandIndex, -1);
    },
    [handId, moveCardThroughHand]
  );

  useOnDragDropHandler(ref, containerRef, handlerStateRef, dropCallback);
  return (
    <div
      ref={ref}
      className={cn(
        anyGrabbing ? 'pointer-events-auto' : 'pointer-events-none',
        DEBUG && anyGrabbing && 'bg-blue-300/30',
        className
      )}
    />
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
          key={`${handIndex}:${cardName}`}
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

  const [[posX, posY], setPosition] = useState(
    /** @type {import('./UseOnDragMoveHandler').Position} */ ([0, 0])
  );
  const elementRef = useRef(null);
  const { containerRef, handlerStateRef, setAnyGrabbing } = useHandspace();
  const [grabbing, setGrabbing] = useState(false);
  const setGrabbingState = useCallback(
    /** @param {boolean} value */
    (value) => {
      setGrabbing(value);
      setAnyGrabbing(value);
    },
    [setGrabbing, setAnyGrabbing]
  );
  useOnDragMoveHandler(
    elementRef,
    containerRef,
    handlerStateRef,
    setPosition,
    setGrabbingState,
    true
  );

  const moveCardThroughHand = usePlayDispatch((ctx) => ctx.moveCardThroughHand);
  const dropCallback = useCallback(
    /**
     * @param {MouseEvent} _e
     * @param {HTMLElement} target
     */
    function onDragHandlerDrop(_e, target) {
      let droppedHandIndex = Number(target.getAttribute('data-hand-index'));
      if (!Number.isFinite(droppedHandIndex)) {
        return;
      }
      moveCardThroughHand(handId, droppedHandIndex, handIndex);
    },
    [handId, handIndex, moveCardThroughHand]
  );
  useOnDragDropHandler(elementRef, containerRef, handlerStateRef, dropCallback);

  return (
    <div
      data-hand-index={handIndex}
      ref={elementRef}
      className={cn(
        DEBUG && 'border bg-green-500',
        'pointer-events-auto',
        !grabbing
          ? 'translate-y-[60%] transition-transform hover:z-10 hover:translate-y-[10%]'
          : 'z-20'
      )}
      style={{
        ...(!isLast
          ? {
              width: `${Math.trunc((1 / (handCount + 4)) * 100)}%`,
            }
          : {}),
      }}
      onMouseEnter={() => {
        setPeeking(true);
        playCardTouch();
      }}
      onMouseLeave={() => setPeeking(false)}
    >
      <div
        className={cn(
          'pointer-events-none',
          !grabbing && '-ml-20',
          DEBUG && 'opacity-50'
        )}
        style={{
          ...(grabbing
            ? {
                position: 'absolute',
                left: `${posX}px`,
                top: `${posY}px`,
                transform: 'translate(-50%,-50%)',
              }
            : !peeking
              ? {
                  transform: `rotate(${handRatio * rotOffset}deg) translate(0,${handRatioSquared * yOffset}px)`,
                }
              : {}),
        }}
      >
        <CardFace cardName={cardName} />
      </div>
    </div>
  );
}
