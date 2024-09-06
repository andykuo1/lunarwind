import { useEffect, useState } from 'react';

import './App.css';

import { BoosterPack } from './card/BoosterPack';
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
      <main id="workspace" className="px-10 py-40">
        <Playspace playId={playId} />
        <Handspace handId={handId} playId={playId} />
        <div className="absolute left-10 top-10">
          <BoosterPack />
        </div>
        <Lootspace />
      </main>
    </>
  );
}
