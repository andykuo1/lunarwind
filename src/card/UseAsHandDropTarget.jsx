import { useCallback } from 'react';

import { useHandspace } from './HandspaceContainer';
import { useOnDragDropHandler } from './UseOnDragMoveHandler';

/**
 *
 * @param {import('react').MutableRefObject<?>} ref
 * @param {import('@/stores/play/State').HandId} handId
 * @param {(handId: import('@/stores/play/State').HandId, handIndex: number, pos: [x: number, y: number]) => void} onDrop
 */
export function useAsHandDropTarget(ref, handId, onDrop) {
  const { containerRef, handlerStateRef } = useHandspace();
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
      onDrop(handId, handIndex, [x, y]);
    },
    [containerRef, handId, onDrop]
  );
  useOnDragDropHandler(ref, containerRef, handlerStateRef, dropCallback);
}
