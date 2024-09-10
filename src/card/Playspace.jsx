import { useCallback, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/libs/react';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { CardFace } from './Card';
import { PlayspaceProvider, usePlayspace } from './PlayspaceContext';
import { useOnDragMoveHandler } from './UseOnDragMoveHandler';

const DEBUG = false;

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('@/stores/play/State').PlayId} props.playId
 * @param {import('react').ReactNode} [props.children]
 */
export function Playspace({ className, playId, children }) {
  return (
    <PlayspaceProvider>
      <PlayspaceContainer className={className}>
        <PlayCards playId={playId} />
        <ClearBoardButton playId={playId} />
        {children}
      </PlayspaceContainer>
    </PlayspaceProvider>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('react').ReactNode} props.children
 */
function PlayspaceContainer({ className, children }) {
  const { containerRef } = usePlayspace();
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').PlayId} props.playId
 */
function PlayCards({ playId }) {
  const playCardIds = usePlayStore(
    useShallow((ctx) =>
      Object.values(ctx.plays[playId]?.playCards ?? {})
        .sort((a, b) => a.lastTouchedMillis - b.lastTouchedMillis)
        .map((card) => card.playCardId)
    )
  );
  return (
    <>
      {playCardIds.map((playCardId) => (
        <PlayCard key={playCardId} playId={playId} playCardId={playCardId} />
      ))}
    </>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').PlayId} props.playId
 * @param {import('@/stores/play/State').PlayCardId} props.playCardId
 */
function PlayCard({ playId, playCardId }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const overlayRef = useRef(null);
  const { containerRef, handlerStateRef } = usePlayspace();
  const cardId = usePlayStore(
    (ctx) => ctx.plays[playId]?.playCards[playCardId]?.cardId
  );
  const [posX, posY] = usePlayStore(
    useShallow((ctx) => ctx.plays[playId]?.playCards[playCardId]?.position)
  );
  const movePlayCard = usePlayDispatch((ctx) => ctx.movePlayCard);
  const setPosition = useCallback(
    /** @param {import('./UseOnDragMoveHandler').Position} pos */
    (pos) => movePlayCard(playId, playCardId, pos),
    [playId, playCardId, movePlayCard]
  );
  const [grabbing, setGrabbing] = useState(false);
  useOnDragMoveHandler(
    ref,
    containerRef,
    handlerStateRef,
    setPosition,
    setGrabbing
  );

  return (
    <div
      ref={ref}
      className={cn(DEBUG && 'border border-white')}
      style={{
        position: 'absolute',
        left: `${posX}px`,
        top: `${posY}px`,
      }}
    >
      <CardFace
        className={cn(
          grabbing ? 'cursor-grabbing shadow-2xl' : 'cursor-grab shadow'
        )}
        innerRef={innerRef}
        overlayRef={overlayRef}
        cardId={cardId}
      />
    </div>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').PlayId} props.playId
 */
function ClearBoardButton({ playId }) {
  const clearCards = usePlayDispatch((ctx) => ctx.clearCards);
  function onClick() {
    clearCards(playId);
  }
  return (
    <button
      className="pointer-events-auto absolute right-4 top-4 z-20 rounded-xl bg-black p-4 text-2xl hover:bg-white hover:text-black"
      onClick={onClick}
    >
      CLEAR
    </button>
  );
}
