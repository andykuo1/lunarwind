import { createContext, useCallback, useContext, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/libs/react';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { CardFace } from './Card';
import { useOnDragMoveHandler } from './UseOnDragMoveHandler';

const DEBUG = false;

const PlayspaceContext = createContext(
  /** @type {ReturnType<usePlayspaceContextAPI>|null} */ (null)
);

/**
 * @param {object} props
 * @param {import('react').ReactNode} [props.children]
 */
export function Playspace({ children }) {
  return (
    <PlayspaceProvider>
      <PlayspaceContainer>
        <CardsInPlay />
        <ClearBoardButton />
        {children}
      </PlayspaceContainer>
    </PlayspaceProvider>
  );
}

export function usePlayspace() {
  let ctx = useContext(PlayspaceContext);
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
function PlayspaceProvider({ children }) {
  const api = usePlayspaceContextAPI();
  return (
    <PlayspaceContext.Provider value={api}>
      {children}
    </PlayspaceContext.Provider>
  );
}

function usePlayspaceContextAPI() {
  const containerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  return {
    containerRef,
  };
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
function PlayspaceContainer({ children }) {
  const { containerRef } = usePlayspace();
  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 top-0 bg-green-800/60"
    >
      {children}
    </div>
  );
}

function CardsInPlay() {
  const objectIds = usePlayStore(
    useShallow((ctx) =>
      Object.values(ctx.playCards)
        .sort((a, b) => a.lastTouchedMillis - b.lastTouchedMillis)
        .map((card) => card.objectId)
    )
  );
  return (
    <>
      {objectIds.map((objectId) => (
        <CardInPlay key={objectId} objectId={objectId} />
      ))}
    </>
  );
}

/**
 * @param {*} props
 */
function CardInPlay({ objectId }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const overlayRef = useRef(null);
  const { containerRef } = usePlayspace();
  const cardName = usePlayStore((ctx) => ctx.playCards[objectId]?.cardName);
  const [posX, posY] = usePlayStore(
    useShallow((ctx) => ctx.playCards[objectId]?.position)
  );
  const movePlayCard = usePlayDispatch((ctx) => ctx.movePlayCard);
  const setPos = useCallback(
    /** @param {import('./UseOnDragMoveHandler').Position} pos */
    (pos) => movePlayCard(objectId, pos),
    [objectId, movePlayCard]
  );
  const { grabbing } = useOnDragMoveHandler(ref, containerRef, setPos);

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
        cardName={cardName}
      />
    </div>
  );
}

function ClearBoardButton() {
  const clearCards = usePlayDispatch((ctx) => ctx.clearCards);
  function onClick() {
    clearCards();
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
