import { useCallback, useEffect, useRef } from 'react';

/**
 * @param {(now: number) => void} callback
 * @param {import('react').DependencyList} deps
 */
export function useAnimationFrameEffect(callback, deps) {
  const memoizedCallback = useCallback(callback, deps); // eslint-disable-line react-hooks/exhaustive-deps
  useAnimationFrame(memoizedCallback);
}

/**
 * @param {(now: number) => void} callback
 */
function useAnimationFrame(callback) {
  const animationFrameHandleRef = useRef(0);
  useEffect(() => {
    /** @param {number} now */
    function onAnimationFrame(now) {
      callback(now);
      // Again!
      animationFrameHandleRef.current = requestAnimationFrame(onAnimationFrame);
    }
    animationFrameHandleRef.current = requestAnimationFrame(onAnimationFrame);
    return () => {
      cancelAnimationFrame(animationFrameHandleRef.current);
    };
  }, [animationFrameHandleRef, callback]);
  return animationFrameHandleRef;
}
