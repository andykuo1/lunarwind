import { useCallback, useRef } from 'react';

import { cn } from '@/libs/react';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { Deck } from '../Deck';
import { DropZoneToHand, HandCards, useDebuggingClassName } from '../Handspace';
import { HandspaceContainer, HandspaceProvider } from '../HandspaceContainer';
import { ClearBoardButton } from '../Playspace';
import { Stack } from '../Stack';
import { useAsHandDropTarget } from '../UseAsHandDropTarget';

/**
 * @param {object} props
 * @param {string} props.sessionId
 */
export function WarGame({ sessionId }) {
  const localHandId = usePlayStore(
    (ctx) => ctx.sessions[sessionId]?.localHandId
  );
  const localPlayId = usePlayStore(
    (ctx) => ctx.sessions[sessionId]?.localPlayId
  );
  return (
    <HandspaceProvider>
      <ClearBoardButton playId={localPlayId} />
      <CardPile
        playId={localPlayId}
        playStackId="center"
        sessionId={sessionId}
      />
      <Deck handId={localHandId} cardCount={10} />
      <HandspaceContainer>
        <DropZoneToHand
          className="absolute bottom-0 left-0 right-0 top-0"
          handId={localHandId}
        />
        <HandCards handId={localHandId} />
      </HandspaceContainer>
    </HandspaceProvider>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').PlayId} props.playId
 * @param {import('@/stores/play/State').PlayStackId} props.playStackId
 * @param {import('@/stores/play/State').SessionId} props.sessionId
 */
function CardPile({ playId, playStackId, sessionId }) {
  const ref = useRef(null);
  const localHandId = useLocalHandId(sessionId);
  const playStack = usePlayStore(
    (ctx) => ctx.plays[playId]?.playStacks[playStackId] ?? {}
  );
  let currentStackIndex = 0;
  let cardIds = playStack.cardIds ?? [];

  const className = useDebuggingClassName();
  const dropCardFromHandIntoPlayStack = usePlayDispatch(
    (ctx) => ctx.dropCardFromHandIntoPlayStack
  );
  const onDrop = useCallback(
    /**
     *
     * @param {import('@/stores/play/State').HandId} handId
     * @param {number} handIndex
     * @param {[x: number, y: number]} _pos
     */
    function onDrop(handId, handIndex, _pos) {
      dropCardFromHandIntoPlayStack(handId, handIndex, playId, playStackId);
    },
    [playId, playStackId]
  );
  useAsHandDropTarget(ref, localHandId, onDrop);
  return (
    <div className="absolute left-0 right-0 top-10 z-0">
      <div ref={ref} className={cn('relative mx-auto h-fit w-fit', className)}>
        <Stack
          className="rounded-2xl border-2 border-white/10 hover:border-white/30"
          cardIds={cardIds}
          stackIndex={currentStackIndex}
          cycled={true}
          splayed={true}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center text-center">
            <label className="flex-1 text-2xl">stack-in-play</label>
          </div>
        </Stack>
      </div>
    </div>
  );
}

/**
 * @param {import('@/stores/play/State').SessionId} sessionId
 */
function useLocalHandId(sessionId) {
  return usePlayStore((ctx) => ctx.sessions[sessionId]?.localHandId);
}
