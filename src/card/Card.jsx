import { useRef, useState } from 'react';

import BackgroundImageUrl from '@/assets/paper4.png';
import { cn } from '../libs/react';
import { useHoverTiltStyleEffect } from './UseHoverTiltStyleEffect';
import { useOnDragMoveHandler } from './UseOnDragMoveHandler';
import { useWorkspace } from './Workspace';

export function Card() {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const overlayRef = useRef(null);
  const { containerRef } = useWorkspace();

  const [[posX, posY], setPos] = useState(
    /** @type {import('./UseOnDragMoveHandler').Position} */ ([0, 0])
  );
  const { grabbing } = useOnDragMoveHandler(ref, containerRef, setPos);
  useHoverTiltStyleEffect(innerRef, ref, overlayRef, grabbing);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: `${posX}px`,
        top: `${posY}px`,
        transformStyle: 'preserve-3d',
        transform: 'perspective(800px)',
      }}
    >
      <CardFace
        className={
          grabbing ? 'cursor-grabbing shadow-2xl' : 'cursor-grab shadow'
        }
        innerRef={innerRef}
        overlayRef={overlayRef}
      />
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 * @param {import('react').RefObject<HTMLElement>} [props.innerRef]
 * @param {import('react').RefObject<HTMLDivElement>} [props.overlayRef]
 */
export function CardFace({ className, style, innerRef, overlayRef }) {
  return (
    <article
      ref={innerRef}
      className={cn(
        'relative h-[3.5in] min-h-[3.5in] w-[2.5in] min-w-[2.5in] select-none overflow-hidden rounded-xl bg-black p-2',
        className
      )}
      style={style}
    >
      <div
        ref={overlayRef}
        className="absolute bottom-0 left-0 right-0 top-0"
      />
      <div
        className="h-full w-full p-10 text-black"
        style={{
          backgroundImage: `url(${BackgroundImageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      >
        <h2>Title</h2>
        <section>
          <h3>There is more to be said here?</h3>
          <p></p>
        </section>
      </div>
    </article>
  );
}
