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
import { CardTouchSound } from './sounds/Sounds';
import {
  useOnDragDropHandler,
  useOnDragMoveHandler,
} from './UseOnDragMoveHandler';

const DEBUG = false;

/**
 * @param {object} props
 * @param {import('@/stores/play/State').HandId} props.handId
 * @param {import('@/stores/play/State').PlayId} props.playId
 */
export function Handspace({ handId, playId }) {
  return (
    <>
      <HandspaceProvider>
        <DropZoneToPlay
          className="absolute bottom-0 left-0 right-0 top-0"
          handId={handId}
          playId={playId}
        />
        <HandspaceContainer>
          <DropZoneToHand
            className="absolute bottom-0 left-0 right-0 top-0"
            handId={handId}
          />
          <HandCards handId={handId} />
        </HandspaceContainer>
      </HandspaceProvider>
    </>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('@/stores/play/State').HandId} props.handId
 * @param {import('@/stores/play/State').PlayId} props.playId
 */
function DropZoneToPlay({ className, handId, playId }) {
  const ref = useRef(null);
  const { containerRef, handlerStateRef, anyGrabbing } = useHandspace();
  useDragDropToMoveCardsToPlay(
    handId,
    playId,
    ref,
    containerRef,
    handlerStateRef
  );
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
  useDragDropToSendCardsFrontBackThroughHand(
    handId,
    ref,
    containerRef,
    handlerStateRef
  );
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
function HandCards({ handId }) {
  const cardOrder = usePlayStore(
    useShallow((ctx) => ctx.hands[handId]?.cardOrder ?? [])
  );
  return (
    <ul className="flex">
      <div className="flex-1" />
      {cardOrder.map((handCardId, handIndex) => (
        <HandCard
          key={handCardId}
          handId={handId}
          handCardId={handCardId}
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
 * @param {import('@/stores/play/State').HandCardId} props.handCardId
 * @param {number} props.handIndex
 * @param {number} props.handCount
 */
function HandCard({ handId, handCardId, handIndex, handCount }) {
  const [peeking, setPeeking] = useState(false);
  const elementRef = useRef(null);
  const [[posX, posY], setPosition] = useState(
    /** @type {import('./UseOnDragMoveHandler').Position} */ ([0, 0])
  );
  const { containerRef, handlerStateRef, setAnyGrabbing } = useHandspace();
  const [localGrabbing, setLocalGrabbing] = useState(false);
  const setGrabbing = useCallback(
    /** @param {boolean} value */
    (value) => {
      setLocalGrabbing(value);
      setAnyGrabbing(value);
    },
    [setLocalGrabbing, setAnyGrabbing]
  );

  useOnDragMoveHandler(
    elementRef,
    containerRef,
    handlerStateRef,
    setPosition,
    setGrabbing,
    true
  );

  useDragDropToMoveCardsThroughHand(
    handId,
    handIndex,
    elementRef,
    containerRef,
    handlerStateRef
  );

  const cardId = usePlayStore(
    (ctx) => ctx.hands[handId]?.handCards[handCardId]?.cardId
  );
  const isLast = handIndex === handCount;

  return (
    <div
      data-hand-index={handIndex}
      ref={elementRef}
      className={cn(
        DEBUG && 'border bg-green-500',
        'pointer-events-auto',
        !localGrabbing
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
        CardTouchSound.play();
      }}
      onMouseLeave={() => setPeeking(false)}
    >
      <div
        className={cn(
          'pointer-events-none',
          !localGrabbing && '-ml-20',
          DEBUG && 'opacity-50'
        )}
        style={{
          ...(localGrabbing
            ? {
                position: 'absolute',
                left: `${posX}px`,
                top: `${posY}px`,
                transform: 'translate(-50%,-50%)',
              }
            : !peeking
              ? {
                  transform: computeTransformForHandCurve(handIndex, handCount),
                }
              : {}),
        }}
      >
        <CardFace cardId={cardId} />
      </div>
    </div>
  );
}

/**
 * @param {number} handIndex
 * @param {number} handCount
 */
function computeTransformForHandCurve(handIndex, handCount) {
  const yOffset = Math.trunc(Math.min(handCount / 8, 1) * 240);
  const rotOffset = Math.trunc(Math.min(handCount / 8, 1) * 30);
  const handRatio = (handIndex + 0.5) / handCount - 0.5; // [-0.5, 0.5]
  const handRatioSquared = handRatio * handRatio;
  return `rotate(${handRatio * rotOffset}deg) translate(0,${handRatioSquared * yOffset}px)`;
}

/**
 * @param {import('@/stores/play/State').HandId} handId
 * @param {number} handIndex
 * @param {import('react').RefObject<HTMLElement>} elementRef
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').MutableRefObject<Partial<import('./UseOnDragMoveHandler').DragHandlerState>>} handlerStateRef
 */
function useDragDropToMoveCardsThroughHand(
  handId,
  handIndex,
  elementRef,
  containerRef,
  handlerStateRef
) {
  const moveCardThroughHand = usePlayDispatch((ctx) => ctx.moveCardThroughHand);
  const dropCallback = useCallback(
    /**
     * @param {MouseEvent} e
     * @param {HTMLElement} target
     */
    function onDragHandlerDrop(e, target) {
      let fromHandIndex = Number(target.getAttribute('data-hand-index'));
      if (!Number.isFinite(fromHandIndex)) {
        return;
      }
      // Check if before or after the midpoint of the target card...
      let after = false;
      let container = containerRef.current;
      if (container) {
        let toElement = /** @type {HTMLElement|null} */ (
          container.querySelector(`[data-hand-index='${handIndex}']`)
        );
        let rect = toElement?.getBoundingClientRect();
        let x = (rect?.x ?? 0) + (rect?.width ?? 0) / 2;
        after = x < e.clientX;
      }
      // ...then actually move it.
      moveCardThroughHand(handId, fromHandIndex, handIndex, after);
    },
    [handId, handIndex, moveCardThroughHand]
  );
  useOnDragDropHandler(elementRef, containerRef, handlerStateRef, dropCallback);
}

/**
 * @param {import('@/stores/play/State').HandId} handId
 * @param {import('@/stores/play/State').PlayId} playId
 * @param {import('react').RefObject<HTMLElement>} dropZoneRef
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').MutableRefObject<Partial<import('./UseOnDragMoveHandler').DragHandlerState>>} handlerStateRef
 */
function useDragDropToMoveCardsToPlay(
  handId,
  playId,
  dropZoneRef,
  containerRef,
  handlerStateRef
) {
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
      let x = e.clientX;
      let y = e.clientY;
      let container = containerRef.current;
      if (container) {
        // HACK: Get its child for sizing, cause
        //  the first is the collision box. The child
        //  is the actual card.
        let element = container.querySelector(
          `[data-hand-index='${handIndex}']`
        )?.firstElementChild;
        let rect = element?.getBoundingClientRect();
        x -= (rect?.width ?? 0) / 2;
        y -= (rect?.height ?? 0) / 2;
      }
      playCardFromHand(handId, handIndex, playId, [x, y]);
    },
    [handId, playId, playCardFromHand]
  );
  useOnDragDropHandler(
    dropZoneRef,
    containerRef,
    handlerStateRef,
    dropCallback
  );
}

/**
 * @param {import('@/stores/play/State').HandId} handId
 * @param {import('react').RefObject<HTMLElement>} dropZoneRef
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').MutableRefObject<Partial<import('./UseOnDragMoveHandler').DragHandlerState>>} handlerStateRef
 */
function useDragDropToSendCardsFrontBackThroughHand(
  handId,
  dropZoneRef,
  containerRef,
  handlerStateRef
) {
  const moveCardThroughHand = usePlayDispatch((ctx) => ctx.moveCardThroughHand);
  const dropCallback = useCallback(
    /**
     * @param {MouseEvent} e
     * @param {HTMLElement} target
     */
    function onDragHandlerDrop(e, target) {
      // Return to hand.
      let droppedHandIndex = Number(target.getAttribute('data-hand-index'));
      if (!Number.isFinite(droppedHandIndex)) {
        return;
      }
      // Check if before or after the midpoint of the previous position...
      let rect = target.getBoundingClientRect();
      if (rect.x < e.clientX) {
        // ... if after position, send to front of hand.
        moveCardThroughHand(handId, droppedHandIndex, -1, false);
      } else {
        // ... if before position, send to back of hand.
        moveCardThroughHand(handId, droppedHandIndex, 0, false);
      }
    },
    [handId, moveCardThroughHand]
  );

  useOnDragDropHandler(
    dropZoneRef,
    containerRef,
    handlerStateRef,
    dropCallback
  );
}
