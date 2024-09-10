import { useEffect } from 'react';

import { distSquared } from '@/libs/math';

/** @typedef {[number, number]} Position */

const MOUSE_DRAG_START_IN_PLACE_RADIUS = 5;
const MOUSE_DRAG_START_IN_PLACE_RADIUS_SQUARED =
  MOUSE_DRAG_START_IN_PLACE_RADIUS * MOUSE_DRAG_START_IN_PLACE_RADIUS;

/*
const TOUCH_DRAG_START_IN_PLACE_RADIUS = 25;
const TOUCH_DRAG_START_IN_PLACE_RADIUS_SQUARED =
  TOUCH_DRAG_START_IN_PLACE_RADIUS * TOUCH_DRAG_START_IN_PLACE_RADIUS;
*/
/**
 * @typedef {ReturnType<createDragHandlerState>} DragHandlerState
 */

/**
 * @param {import('react').RefObject<HTMLElement>} ref
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').MutableRefObject<Partial<DragHandlerState>>} handlerStateRef
 * @param {(pos: [number, number]) => void} setPosition
 * @param {(value: boolean, target: HTMLElement|null) => void} setGrabbing
 * @param {boolean} originFixed
 */
export function useOnDragMoveHandler(
  ref,
  containerRef,
  handlerStateRef,
  setPosition,
  setGrabbing,
  originFixed = false
) {
  useEffect(() => {
    /** @param {MouseEvent} e */
    function onMouseDown(e) {
      if (handlerStateRef.current?.grabbing) {
        // Already grabbing. Don't do it again.
        return;
      }

      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);

      let container = containerRef.current;
      let containerRect = container?.getBoundingClientRect();
      let containerX = containerRect?.x ?? 0;
      let containerY = containerRect?.y ?? 0;
      let element = ref.current;
      let elementRect = element?.getBoundingClientRect();
      let elementX = elementRect?.x ?? 0;
      let elementY = elementRect?.y ?? 0;

      let clientX = e.clientX;
      let clientY = e.clientY;
      let offsetX = originFixed ? containerX : elementX - containerX - clientX;
      let offsetY = originFixed ? -containerY : elementY - containerY - clientY;
      handlerStateRef.current = createDragHandlerState(
        element,
        clientX,
        clientY,
        offsetX,
        offsetY,
        performance.now()
      );
      setPosition([clientX + offsetX, clientY + offsetY]);
      setGrabbing(true, element);
    }

    /** @param {MouseEvent} e */
    function onMouseUp(e) {
      if (!handlerStateRef.current?.grabbing) {
        // Not yet grabbing. Skip this.
        return;
      }

      let clientX = e.clientX;
      let clientY = e.clientY;

      // Is this an in-place click?
      let firstX =
        handlerStateRef.current?.first?.[0] ?? Number.POSITIVE_INFINITY;
      let firstY =
        handlerStateRef.current?.first?.[1] ?? Number.POSITIVE_INFINITY;
      if (
        distSquared(firstX, firstY, clientX, clientY) <
        MOUSE_DRAG_START_IN_PLACE_RADIUS_SQUARED
      ) {
        // ...yes! Forget about the first click...
        handlerStateRef.current.first = [
          Number.POSITIVE_INFINITY,
          Number.POSITIVE_INFINITY,
        ];
        // ...and don't let go.
        return;
      }

      // Clean-up, since this is the last event.
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);

      // Just to be sure, update position one-last-time.
      let offsetX = handlerStateRef.current?.offset?.[0] ?? 0;
      let offsetY = handlerStateRef.current?.offset?.[1] ?? 0;
      handlerStateRef.current = {}; // And reset this.
      setPosition([clientX + offsetX, clientY + offsetY]);
      setGrabbing(false, element);
    }

    /** @param {MouseEvent} e */
    function onMouseMove(e) {
      if (!handlerStateRef.current?.grabbing) {
        // Not yet grabbing. Skip this.
        return;
      }

      let clientX = e.clientX;
      let clientY = e.clientY;

      // Did this leave in-place click zone?
      let firstX =
        handlerStateRef.current?.first?.[0] ?? Number.POSITIVE_INFINITY;
      let firstY =
        handlerStateRef.current?.first?.[1] ?? Number.POSITIVE_INFINITY;
      if (
        Number.isFinite(firstX) &&
        distSquared(firstX, firstY, clientX, clientY) >
          MOUSE_DRAG_START_IN_PLACE_RADIUS_SQUARED
      ) {
        // ...yes! Forget about the first click...
        handlerStateRef.current.first = [
          Number.POSITIVE_INFINITY,
          Number.POSITIVE_INFINITY,
        ];
      }

      let offsetX = handlerStateRef.current?.offset?.[0] ?? 0;
      let offsetY = handlerStateRef.current?.offset?.[1] ?? 0;
      setPosition([clientX + offsetX, clientY + offsetY]);
    }

    let element = ref.current;
    if (!element) {
      return;
    }
    element.addEventListener('mousedown', onMouseDown);
    return () => {
      element.removeEventListener('mousedown', onMouseDown);
      // These shouldn't exist yet, but clean-up just in case...
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      // NOTE: Sometimes if the element dies before mouse is up, we need to reset state.
      handlerStateRef.current = {};
      setGrabbing(false, element);
    };
  }, [
    ref,
    containerRef,
    handlerStateRef,
    originFixed,
    setPosition,
    setGrabbing,
  ]);
}

/**
 * @param {HTMLElement|null} target
 * @param {number} firstX
 * @param {number} firstY
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} now
 */
export function createDragHandlerState(
  target,
  firstX,
  firstY,
  offsetX,
  offsetY,
  now
) {
  return {
    target,
    grabbing: true,
    /** @type {Position} */
    first: [firstX, firstY],
    /** @type {Position} */
    offset: [offsetX, offsetY],
    startMillis: now,
  };
}

/**
 * @param {import('react').RefObject<HTMLElement>} dropZoneRef
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').MutableRefObject<Partial<DragHandlerState>>} handlerStateRef
 * @param {(e: MouseEvent, target: HTMLElement) => void} dropCallback
 */
export function useOnDragDropHandler(
  dropZoneRef,
  containerRef,
  handlerStateRef,
  dropCallback
) {
  useEffect(() => {
    let dropZone = dropZoneRef.current;
    if (!dropZone) {
      return;
    }

    /**
     * @param {MouseEvent} e
     */
    function onMouseUp(e) {
      let container = containerRef.current;
      if (!container) {
        return;
      }
      let handlerState = handlerStateRef.current;
      if (!handlerState) {
        return;
      }
      let target = handlerState.target;
      if (!target) {
        return;
      }
      dropCallback(e, target);
      // NOTE: Clean-up is handled by the original drag handler.
    }

    dropZone.addEventListener('mouseup', onMouseUp);
    return () => {
      dropZone.removeEventListener('mouseup', onMouseUp);
    };
  }, [dropCallback, dropZoneRef, containerRef, handlerStateRef]);
}
