import './App.css';

import { BoosterPackFace } from './card/BoosterPack';
import { Card } from './card/Card';
import { Handspace } from './card/Handspace';
import { Workspace } from './card/Workspace';

export default function App() {
  return (
    <>
      <header className="flex items-center">Cards</header>
      <main id="workspace" className="bg-white px-10 py-40">
        <BoosterPackFace />
      </main>
    </>
  );
}
