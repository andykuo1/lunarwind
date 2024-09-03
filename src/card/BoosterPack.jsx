import { useRef } from 'react';

import { cn } from '@/libs/react';
import { useHoverTiltStyleEffect } from './UseHoverTiltStyleEffect';

export function BoosterPackFace() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  useHoverTiltStyleEffect(ref, containerRef, overlayRef, false);
  return (
    <div ref={containerRef} className="relative w-min select-none">
      <div
        ref={ref}
        className="relative w-min border-x-[0.2em] border-y-[1em] border-x-transparent border-y-blue-400"
      >
        <div
          ref={overlayRef}
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-50 h-full w-full"
        />
        <Crinkle className="absolute left-[-0.2em] top-[-3em] bg-blue-400 pb-0" />
        <article className="relative flex h-[4.5in] w-[2.5in] flex-col bg-blue-400">
          <header className="absolute left-[50%] top-[20%] -translate-x-[50%]">
            <h1>
              <div
                className="text-8xl"
                style={{ textShadow: '2px 2px 0 black' }}
              >
                RAGU
              </div>
              <div className="border bg-blue-600 text-center uppercase text-white">
                Trading Card Game
              </div>
            </h1>
          </header>
          <main className="flex-1"></main>
        </article>
        <Crinkle className="absolute bottom-[-3em] left-[-0.2em] bg-blue-400 pt-0" />
        <EmbossGlare />
      </div>
    </div>
  );
}

function EmbossGlare() {
  return (
    <>
      <div className="absolute top-0 h-10 w-full bg-gradient-to-b from-white/10 to-transparent" />
      <div className="absolute -top-1.5 h-1.5 w-full bg-gradient-to-t from-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 h-full w-1.5 bg-gradient-to-l from-white/30 to-transparent" />
      <div className="absolute bottom-0 right-0 h-full w-1.5 bg-gradient-to-r from-white/30 to-transparent" />
      <div className="absolute -bottom-1.5 h-1.5 w-full bg-gradient-to-b from-white/30 to-transparent" />
      <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-white/10 to-transparent" />
    </>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 */
function Crinkle({ className }) {
  return (
    <div className={cn('h-[2em] w-[calc(100%+0.4em)] py-1.5', className)}>
      <div
        className="h-full w-full"
        style={{
          background:
            'repeating-linear-gradient(90deg,' +
            'transparent 0,' +
            'transparent 0.2em,' +
            'rgba(0,0,0,0.1) 0.2em,' +
            'rgba(0,0,0,0.1) 0.4em)',
        }}
      />
    </div>
  );
}
