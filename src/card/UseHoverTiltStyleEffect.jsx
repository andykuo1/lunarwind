import { useEffect, useRef } from 'react';

import { distSquared, lerp } from '@/libs/math';
import { useAnimationFrameEffect } from '@/libs/react/UseAnimationFrame';

/** @typedef {ReturnType<createState>} State */

function createState() {
  return {
    rx: 0,
    ry: 0,
    rd: 0,
    flipped: false,
    containerWidth: 0,
    containerHeight: 0,
  };
}

/**
 * @param {import('react').RefObject<HTMLElement>} elementRef
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {boolean} disabled
 * @param {boolean} [flipped]
 */
export function useHoverTiltStyleEffect(
  elementRef,
  containerRef,
  disabled,
  flipped
) {
  const animationFrameHandleRef = useRef(0);

  // NOTE: Instead of consuming state, we pass-by-ref
  //  since hover-tilt uses animationframes to
  //  update itself.
  const disabledRef = useRef(false);
  disabledRef.current = disabled;
  const flippedRef = useRef(false);
  flippedRef.current = flipped ?? false;

  // NOTE: For other hover-tilt style effects that rely on this information (must be used INSIDE an animation frame for updates).
  const effectStateRef = useRef(createState());

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.style.perspective = '800px';

    const mouseState = {
      hovering: false,
      position: [0, 0],
      offset: [0, 0],
      prevFrameMillis: performance.now(),
    };

    /** @param {MouseEvent} _e */
    function onMouseEnter(_e) {
      mouseState.hovering = true;

      let element = elementRef.current;
      if (element) {
        element.addEventListener('mousemove', onMouseMove);
      }
    }

    /** @param {MouseEvent} _e */
    function onMouseLeave(_e) {
      mouseState.hovering = false;
      let element = elementRef.current;
      if (element) {
        element.removeEventListener('mousemove', onMouseMove);
      }
    }

    /** @param {MouseEvent} e */
    function onMouseMove(e) {
      mouseState.position[0] = e.clientX;
      mouseState.position[1] = e.clientY;
    }

    /**
     * @param {number} now
     */
    function onAnimationFrame(now) {
      const element = elementRef.current;
      if (!element) {
        return;
      }
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const deltaTime = now - mouseState.prevFrameMillis;
      mouseState.prevFrameMillis = now;
      const flipped = flippedRef.current ?? false; // NOTE: Must use value from REF!
      const disabled = disabledRef.current ?? false; // NOTE: Must use value from REF!

      let containerRect = container.getBoundingClientRect();
      let containerX = containerRect?.x ?? 0;
      let containerY = containerRect?.y ?? 0;
      let containerW = containerRect.width;
      let containerH = containerRect.height;

      let nextX = mouseState.position[0] - containerX - containerW / 2;
      let nextY = mouseState.position[1] - containerY - containerH / 2;

      let offsetX = mouseState.offset[0];
      let offsetY = mouseState.offset[1];
      let dt = (deltaTime / 60) * 0.5;
      if (!disabled && mouseState.hovering) {
        offsetX = lerp(offsetX, nextX, dt);
        offsetY = lerp(offsetY, nextY, dt);
      } else {
        offsetX = lerp(offsetX, 0, dt);
        offsetY = lerp(offsetY, 0, dt);
      }
      mouseState.offset[0] = offsetX;
      mouseState.offset[1] = offsetY;

      let rx = offsetX / containerW;
      let ry = -offsetY / containerH;
      let rd = distSquared(0, 0, rx, ry);
      let effectState = effectStateRef.current;
      let flippedScaleX = flipped ? -1 : 1;
      let flippedScaleY = flipped ? -1 : 1;
      effectState.rx = rx * flippedScaleX;
      effectState.ry = ry * flippedScaleY;
      effectState.rd = rd;
      effectState.flipped = flipped;
      effectState.containerWidth = containerW;
      effectState.containerHeight = containerH;

      // Only apply if has meaningful values...
      if (rd > Number.EPSILON) {
        let tiltPower = 30;
        let flippedOffsetX = flipped ? 180 : 0;
        let yAxisDegrees = rx * tiltPower + flippedOffsetX;
        let xAxisDegrees = ry * tiltPower * flippedScaleY;
        element.style.transform = `rotateY(${yAxisDegrees}deg) rotateX(${xAxisDegrees}deg)`;
      }

      // Again!
      animationFrameHandleRef.current = requestAnimationFrame(onAnimationFrame);
    }

    animationFrameHandleRef.current = requestAnimationFrame(onAnimationFrame);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    return () => {
      cancelAnimationFrame(animationFrameHandleRef.current);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      element.removeEventListener('mousemove', onMouseMove);
    };
  }, [
    elementRef,
    animationFrameHandleRef,
    disabledRef,
    flippedRef,
    effectStateRef,
  ]);

  return effectStateRef;
}

/**
 * @param {import('react').RefObject<State>} effectStateRef
 * @param {import('react').RefObject<HTMLElement>} elementRef
 */
export function useHoverTiltShadowStyleEffect(effectStateRef, elementRef) {
  useAnimationFrameEffect(
    function onAnimationFrame() {
      const element = elementRef.current;
      if (!element) {
        return;
      }
      const {
        rx = 0,
        ry = 0,
        rd = 0,
        flipped = false,
        containerWidth = 0,
        containerHeight = 0,
      } = effectStateRef.current ?? {};

      // Only apply if has meaningful values...
      if (rd > Number.EPSILON) {
        let dx = (rx * containerWidth) / 6;
        let dy = ((-ry * containerHeight) / 12) * (flipped ? -1 : 1);
        element.style.filter = `drop-shadow(${-dx}px ${-dy}px 10px rgba(0,0,0,0.1))`;
      }
    },
    [effectStateRef, elementRef]
  );
}

/**
 * @param {import('react').RefObject<State>} effectStateRef
 * @param {import('react').RefObject<HTMLElement>} overlayRef
 */
export function useHoverTiltGlareStyleEffect(effectStateRef, overlayRef) {
  useAnimationFrameEffect(
    function onAnimationFrame() {
      const overlay = overlayRef.current;
      if (!overlay) {
        return;
      }
      const { rx = 0, ry = 0, rd = 0 } = effectStateRef.current ?? {};

      // Only apply if has meaningful values...
      if (rd > Number.EPSILON) {
        let glareAngle = (Math.atan2(ry, -rx) * 180) / Math.PI - 90;
        let glarePower = 1.0;
        overlay.style.background =
          `linear-gradient(${glareAngle}deg,` +
          `rgba(255, 255, 255, ${rd * glarePower}) 0%,` +
          `rgba(255, 255, 255, 0) 80%)`;
      }
    },
    [effectStateRef, overlayRef]
  );
}

/**
 * @param {import('react').RefObject<State>} effectStateRef
 * @param {import('react').RefObject<HTMLElement>} backfaceRef
 */
export function useHoverTiltBackfaceStyleEffect(effectStateRef, backfaceRef) {
  useAnimationFrameEffect(
    function onAnimationFrame() {
      const backface = backfaceRef.current;
      if (!backface) {
        return;
      }
      const {
        rx = 0,
        ry = 0,
        rd = 0,
        flipped = false,
      } = effectStateRef.current ?? {};

      // Only apply if has meaningful values...
      if (rd > Number.EPSILON) {
        let tiltPower = 30;
        let flippedOffsetX = flipped ? 0 : 180;
        let yAxisDegrees = rx * tiltPower + flippedOffsetX;
        let xAxisDegrees = ry * tiltPower;
        backface.style.transform = `rotateY(${yAxisDegrees * -1}deg) rotateX(${xAxisDegrees * -1}deg)`;
      }
    },
    [effectStateRef, backfaceRef]
  );
}
