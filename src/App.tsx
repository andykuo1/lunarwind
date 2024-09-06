import { useEffect, useState } from 'react';

import { BoosterPack } from './card/BoosterPack';
import { Deck } from './card/Deck';
import { Handspace } from './card/Handspace';
import { Lootspace } from './card/Lootspace';
import { Playspace } from './card/Playspace';
import { cuid } from './libs/math';
import {
  getFirstHandIdInStore,
  getFirstPlayIdInStore,
} from './stores/play/Get';
import { useGetPlayStore, usePlayDispatch } from './stores/play/PlayStore';

export default function App() {
  const [playId, setPlayId] = useState('');
  const [handId, setHandId] = useState('');
  const updateHand = usePlayDispatch((ctx) => ctx.updateHand);
  const updatePlay = usePlayDispatch((ctx) => ctx.updatePlay);
  const getPlayStore = useGetPlayStore();

  useEffect(() => {
    if (!handId) {
      const store = getPlayStore();
      const firstHandId = getFirstHandIdInStore(store);
      if (firstHandId) {
        setHandId(firstHandId);
      } else {
        updateHand(cuid(), {});
      }
    }
    if (!playId) {
      const store = getPlayStore();
      const firstPlayId = getFirstPlayIdInStore(store);
      if (firstPlayId) {
        setPlayId(firstPlayId);
      } else {
        updatePlay(cuid(), {});
      }
    }
  }, [handId, setHandId, updateHand, getPlayStore]);

  return (
    <>
      <header className="flex items-center">Cards</header>
      <main id="workspace" className="h-full w-full overflow-hidden">
        <Playspace
          className="absolute bottom-0 left-0 right-0 top-0 bg-green-800/60"
          playId={playId}
        />
        <Deck handId={handId} cardCount={10} />
        <Handspace handId={handId} playId={playId} />
        <div className="absolute left-10 top-10">
          <BoosterPack />
        </div>
        <Lootspace />
      </main>
    </>
  );
}
