import './App.css';

import { BoosterPack } from './card/BoosterPack';
import { Handspace } from './card/Handspace';
import { Playspace } from './card/Playspace';

export default function App() {
  return (
    <>
      <header className="flex items-center">Cards</header>
      <main id="workspace" className="px-10 py-40">
        <Playspace />
        <Handspace />
        <div className="absolute left-10 top-10">
          <BoosterPack />
        </div>
      </main>
    </>
  );
}
