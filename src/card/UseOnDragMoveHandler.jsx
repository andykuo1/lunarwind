import { useEffect, useRef, useState } from 'react';

import { distSquared } from '@/libs/math';

/** @typedef {[number, number]} Position */

const MOUSE_DRAG_START_IN_PLACE_RADIUS = 5;
const MOUSE_DRAG_START_IN_PLACE_RADIUS_SQUARED =
  MOUSE_DRAG_START_IN_PLACE_RADIUS * MOUSE_DRAG_START_IN_PLACE_RADIUS;

const TOUCH_DRAG_START_IN_PLACE_RADIUS = 25;
const TOUCH_DRAG_START_IN_PLACE_RADIUS_SQUARED =
  TOUCH_DRAG_START_IN_PLACE_RADIUS * TOUCH_DRAG_START_IN_PLACE_RADIUS;

/**
 * @param {import('react').RefObject<HTMLElement>} ref
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').Dispatch<import('react').SetStateAction<Position>>} setPos
 */
export function useOnDragMoveHandler(ref, containerRef, setPos) {
  const [grabbing, setGrabbing] = useState(false);
  const initialRef = useRef(
    /** @type {Partial<ReturnType<createInitialGrabState>>} */ ({})
  );

  useEffect(() => {
    /** @param {MouseEvent} e */
    function onMouseDown(e) {
      if (initialRef.current?.grabbing) {
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
      let offsetX = elementX - containerX - clientX;
      let offsetY = elementY - containerY - clientY;
      initialRef.current = createInitialGrabState(
        clientX,
        clientY,
        offsetX,
        offsetY,
        performance.now()
      );
      setPos([clientX + offsetX, clientY + offsetY]);
      setGrabbing(true);
    }

    /** @param {MouseEvent} e */
    function onMouseUp(e) {
      let clientX = e.clientX;
      let clientY = e.clientY;

      // Is this an in-place click?
      let firstX = initialRef.current?.first?.[0] ?? Number.POSITIVE_INFINITY;
      let firstY = initialRef.current?.first?.[1] ?? Number.POSITIVE_INFINITY;
      if (
        distSquared(firstX, firstY, clientX, clientY) <
        MOUSE_DRAG_START_IN_PLACE_RADIUS_SQUARED
      ) {
        // ...yes! Forget about the first click...
        initialRef.current.first = [
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
      let offsetX = initialRef.current?.offset?.[0] ?? 0;
      let offsetY = initialRef.current?.offset?.[1] ?? 0;
      initialRef.current = {}; // And reset this.
      setPos([e.clientX + offsetX, e.clientY + offsetY]);
      setGrabbing(false);
    }

    /** @param {MouseEvent} e */
    function onMouseMove(e) {
      if (!initialRef.current?.grabbing) {
        // Not yet grabbing. Skip this.
        return;
      }
      let clientX = e.clientX;
      let clientY = e.clientY;

      // Did this leave in-place click zone?
      let firstX = initialRef.current?.first?.[0] ?? Number.POSITIVE_INFINITY;
      let firstY = initialRef.current?.first?.[1] ?? Number.POSITIVE_INFINITY;
      if (
        Number.isFinite(firstX) &&
        distSquared(firstX, firstY, clientX, clientY) >
          MOUSE_DRAG_START_IN_PLACE_RADIUS_SQUARED
      ) {
        // ...yes! Forget about the first click...
        initialRef.current.first = [
          Number.POSITIVE_INFINITY,
          Number.POSITIVE_INFINITY,
        ];
      }

      let offsetX = initialRef.current?.offset?.[0] ?? 0;
      let offsetY = initialRef.current?.offset?.[1] ?? 0;
      setPos([clientX + offsetX, clientY + offsetY]);
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
    };
  }, [ref, containerRef]);

  return {
    grabbing,
  };
}

/**
 * @param {number} firstX
 * @param {number} firstY
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} now
 */
function createInitialGrabState(firstX, firstY, offsetX, offsetY, now) {
  return {
    grabbing: true,
    /** @type {Position} */
    first: [firstX, firstY],
    /** @type {Position} */
    offset: [offsetX, offsetY],
    startMillis: now,
  };
}
