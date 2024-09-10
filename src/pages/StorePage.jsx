import { useState } from 'react';

import { OpenPackScreen } from '@/card/OpenPackScreen';
import { openPack, PACKS } from '@/card/values';

export function StorePage() {
  const [opening, setOpening] = useState(false);
  return (
    <>
      <h1>Store</h1>
      {opening && (
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <OpenPackScreen
            onOpen={() => {
              let result = openPack(PACKS.ALL);
              return result;
            }}
            onDone={() => setOpening(false)}
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
