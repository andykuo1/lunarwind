import { useEffect, useRef } from 'react';

import { distSquared, lerp } from '@/libs/math';

/**
 * @param {import('react').RefObject<HTMLElement>} ref
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {import('react').RefObject<HTMLElement>} overlayRef
 * @param {boolean} disabled
 */
export function useHoverTiltStyleEffect(
  ref,
  containerRef,
  overlayRef,
  disabled
) {
  const animationFrameHandleRef = useRef(0);
  // NOTE: Instead of consuming state, we pass-by-ref
  //  since hover-tilt uses animationframes to
  //  update itself.
  const disabledRef = useRef(false);
  disabledRef.current = disabled;

  useEffect(() => {
    let element = ref.current;
    if (!element) {
      return;
    }
    let container = containerRef.current;
    if (!container) {
      return;
    }
    container.style.transform = 'perspective(800px)';

    const mouseState = {
      hovering: false,
      position: [0, 0],
      offset: [0, 0],
      prevFrameMillis: performance.now(),
    };

    /** @param {MouseEvent} _e */
    function onMouseEnter(_e) {
      mouseState.hovering = true;

      let element = ref.current;
      if (element) {
        element.addEventListener('mousemove', onMouseMove);
      }
    }

    /** @param {MouseEvent} _e */
    function onMouseLeave(_e) {
      mouseState.hovering = false;
      let element = ref.current;
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
      let element = ref.current;
      if (!element) {
        return;
      }
      let container = containerRef.current;
      if (!container) {
        return;
      }
      let deltaTime = now - mouseState.prevFrameMillis;
      mouseState.prevFrameMillis = now;

      let containerRect = container.getBoundingClientRect();
      let containerX = containerRect?.x ?? 0;
      let containerY = containerRect?.y ?? 0;
      let conatinerW = containerRect.width;
      let containerH = containerRect.height;

      let nextX = mouseState.position[0] - containerX - conatinerW / 2;
      let nextY = mouseState.position[1] - containerY - containerH / 2;

      let offsetX = mouseState.offset[0];
      let offsetY = mouseState.offset[1];
      let dt = (deltaTime / 60) * 0.5;
      if (!disabledRef.current && mouseState.hovering) {
        offsetX = lerp(offsetX, nextX, dt);
        offsetY = lerp(offsetY, nextY, dt);
      } else {
        offsetX = lerp(offsetX, 0, dt);
        offsetY = lerp(offsetY, 0, dt);
      }
      mouseState.offset[0] = offsetX;
      mouseState.offset[1] = offsetY;

      let rx = offsetX / conatinerW;
      let ry = offsetY / containerH;
      let rd = distSquared(0, 0, rx, ry);

      // Only apply if has meaningful values...
      if (rd > Number.EPSILON) {
        let tiltPower = 30;
        element.style.transform = `rotateY(${-rx * tiltPower}deg) rotateX(${ry * tiltPower}deg)`;

        let overlay = overlayRef.current;
        if (overlay) {
          let glossAngle = (Math.atan2(ry, rx) * 180) / Math.PI - 90;
          let glossPower = 1.0;
          overlay.style.background =
            `linear-gradient(${glossAngle}deg,` +
            `rgba(255, 255, 255, ${rd * glossPower}) 0%,` +
            `rgba(255, 255, 255, 0) 80%)`;
        }
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
  }, [ref, animationFrameHandleRef, disabledRef]);
}
