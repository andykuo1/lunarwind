import { useCallback, useEffect, useRef } from 'react';

/**
 * @param {(now: number) => void} callback
 * @param {import('react').DependencyList} [deps]
 */
export function useAnimationFrame(callback, deps = [callback]) {
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
  }, [animationFrameHandleRef, ...deps]);
  return animationFrameHandleRef;
}

/**
 * @param {(now: number) => void} callback
 * @param {import('react').DependencyList} deps
 */
export function useAnimationFrameEffect(callback, deps) {
  const memoizedCallback = useCallback(callback, deps);
  useAnimationFrame(memoizedCallback);
}
