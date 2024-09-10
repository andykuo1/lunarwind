import { useRef, useState } from 'react';

import { OpenPackScreen } from '@/card/OpenPackScreen';
import { openPack, PACKS } from '@/card/values';
import { cn } from '@/libs/react';
import FadeAnimationStyle from '@/libs/style/FadeAnimation.module.css';

export function StorePage() {
  const [opening, setOpening] = useState(false);
  const ref = useRef(/** @type {HTMLDivElement|null} */ (null));
  return (
    <>
      <h1>Store</h1>
      {opening && (
        <div
          ref={ref}
          className={cn(
            'absolute bottom-0 left-0 right-0 top-0',
            FadeAnimationStyle.animateFadeIn
          )}
        >
          <OpenPackScreen
            onOpen={() => {
              let result = openPack(PACKS.ALL);
              return result;
            }}
            onDone={() => {
              ref.current?.classList.toggle(FadeAnimationStyle.animateFadeOut);
              setTimeout(() => setOpening(false), 500);
            }}
          />
        </div>
      )}
      <button
        className="absolute right-0 top-0 m-4 rounded-xl border-2 bg-black p-4"
        onClick={() => setOpening(true)}
      >
        Buy Pack
      </button>
    </>
  );
}
