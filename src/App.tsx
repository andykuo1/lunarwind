import { useEffect, useState } from 'react';

import './App.css';

import { BoosterPack } from './card/BoosterPack';
import { Handspace } from './card/Handspace';
import { Playspace } from './card/Playspace';
import { cuid } from './libs/math';
import { getFirstHandIdInStore } from './stores/play/Get';
import { useGetPlayStore, usePlayDispatch } from './stores/play/PlayStore';

export default function App() {
  const [handId, setHandId] = useState('');
  const updateHand = usePlayDispatch((ctx) => ctx.updateHand);
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
  }, [handId, setHandId, updateHand, getPlayStore]);

  return (
    <>
      <header className="flex items-center">Cards</header>
      <main id="workspace" className="px-10 py-40">
        <Playspace />
        <Handspace handId={handId} />
        <div className="absolute left-10 top-10">
          <BoosterPack />
        </div>
      </main>
    </>
  );
}
