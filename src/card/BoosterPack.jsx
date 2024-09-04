import { useRef, useState } from 'react';

import { cn } from '@/libs/react';
import {
  useHoverTiltBackfaceStyleEffect,
  useHoverTiltGlareStyleEffect,
  useHoverTiltShadowStyleEffect,
  useHoverTiltStyleEffect,
} from './UseHoverTiltStyleEffect';

/**
 * @param {*} props
 */
export function BoosterPackFace({ className = 'mx-80' }) {
  const frontfaceRef = useRef(null);
  const backfaceRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [peeled, setPeeled] = useState(false);
  const effectStateRef = useHoverTiltStyleEffect(
    frontfaceRef,
    containerRef,
    false,
    flipped
  );
  useHoverTiltGlareStyleEffect(effectStateRef, overlayRef);
  useHoverTiltShadowStyleEffect(effectStateRef, frontfaceRef);
  useHoverTiltBackfaceStyleEffect(effectStateRef, backfaceRef);
  return (
    <div
      ref={containerRef}
      className={cn('relative w-min select-none', className)}
    >
      <div className="absolute right-0 top-0 z-10 flex flex-col gap-2">
        <FlipButton onClick={() => setFlipped((prev) => !prev)} />
        <OpenButton onClick={() => setPeeled((prev) => !prev)} />
      </div>
      <div
        ref={frontfaceRef}
        className="relative w-min border-x-[0.2em] border-y-[1em] border-x-transparent border-y-blue-400"
        style={{
          transitionProperty: 'transform',
          transitionDuration: '100ms',
        }}
      >
        <CrinkleTop className="absolute left-[-0.2em] top-[-3em] bg-blue-400 pb-0" />
        <BoosterPackFrontFace />
        <CrinkleTop className="absolute bottom-[-3em] left-[-0.2em] bg-blue-400 pt-0" />
        <EmbossGlare />
        <div
          ref={overlayRef}
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-full"
        />
      </div>
      <div
        ref={backfaceRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        style={{
          backfaceVisibility: 'hidden',
          transitionProperty: 'transform',
          transitionDuration: '100ms',
          // NOTE: Initial transform
          transform: 'rotateY(-180deg)',
        }}
      >
        <div className="relative h-full w-full border-x-[0.2em] border-y-[1em] border-x-transparent border-y-blue-400">
          <CrinkleTop className="absolute left-[-0.2em] top-[-3em] bg-blue-400 pb-0" />
          <BoosterPackBackFace peeled={peeled} />
          <CrinkleTop className="absolute bottom-[-3em] left-[-0.2em] bg-blue-400 pt-0" />
          <EmbossGlare />
        </div>
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').MouseEventHandler} props.onClick
 */
function FlipButton({ className, onClick }) {
  return (
    <button
      className={cn(
        'rounded-full bg-black/30 bg-red-300 px-4 text-white',
        className
      )}
      onClick={onClick}
    >
      Flip
    </button>
  );
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').MouseEventHandler} props.onClick
 */
function OpenButton({ className, onClick }) {
  return (
    <button
      className={cn(
        'rounded-full bg-black/30 bg-red-300 px-4 text-white',
        className
      )}
      onClick={onClick}
    >
      Open
    </button>
  );
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
function BoosterPackFrontFace({ className, style }) {
  return (
    <article
      className={cn(
        'relative flex h-[4.5in] w-[2.5in] flex-col bg-blue-400 px-1.5',
        className
      )}
      style={style}
    >
      <header className="absolute left-[50%] top-[20%] -translate-x-[50%]">
        <h1>
          <div className="text-8xl" style={{ textShadow: '3px 3px 0 black' }}>
            RAGU
          </div>
          <div className="border bg-blue-600 text-center uppercase text-white">
            Trading Card Game
          </div>
        </h1>
      </header>
      <main className="flex-1"></main>
      <footer className="my-4">
        <p className="text-center uppercase text-white">
          10 Additional Game Cards
        </p>
      </footer>
    </article>
  );
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 * @param {boolean} [props.peeled]
 */
function BoosterPackBackFace({ className, style, peeled }) {
  return (
    <article
      className={cn(
        'relative flex h-[4.5in] w-[2.5in] flex-col bg-blue-400 px-1.5',
        className
      )}
      style={style}
    >
      <BackFaceBarcode className="m-8" />
      <CrinkleBackFlap />
      <BackFaceCornerPeel peeled={peeled} />
    </article>
  );
}

/**
 * @param {object} props
 * @param {boolean} [props.peeled]
 */
function BackFaceCornerPeel({ peeled }) {
  return (
    <div className="absolute -top-4 left-[calc(50%+2.25em)] z-10 h-full">
      <div className="relative">
        <div
          className="w-4"
          style={{
            borderWidth: '0 16px 16px 0',
            borderStyle: 'solid',
            borderColor: 'red rgba(220,220,220,1)',
          }}
        />
        <div
          className="absolute right-0 top-0 bg-gray-300 transition-all"
          style={
            peeled
              ? {
                  width: '1.5in',
                  height: '1.5in',
                }
              : {
                  width: '10px',
                  height: '10px',
                }
          }
        >
          <div
            className="h-full w-full bg-gray-400"
            style={
              peeled
                ? {
                    borderColor: 'lightgray lightgray transparent transparent',
                    borderStyle: 'solid',
                    borderWidth: '0.75in',
                  }
                : {
                    borderWidth: '0',
                  }
            }
          />
        </div>
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function BackFaceBarcode({ className }) {
  return (
    <div className={cn('h-40 w-20 bg-white p-2', className)}>
      <div
        className="h-full w-full"
        style={{
          background:
            'repeating-linear-gradient(0deg,' +
            'white 0,' +
            'white 0.3em,' +
            'black 0.3em,' +
            'black 0.6em)',
        }}
      ></div>
    </div>
  );
}

function CrinkleBackFlap() {
  return (
    <div className="absolute -bottom-4 -top-4 left-[50%] flex bg-blue-400">
      <div
        className="mr-2 h-full w-10"
        style={{
          background:
            'repeating-conic-gradient(rgba(0,0,0,0.1) 0% 25%, transparent 0% 50%) ' +
            '50% / 0.8em 0.5em',
        }}
      />
      <div className="h-full w-2 bg-gray-200/80" />
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 */
function CrinkleTop({ className }) {
  return (
    <div className={cn('h-[2em] w-[calc(100%+0.4em)] py-1', className)}>
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
