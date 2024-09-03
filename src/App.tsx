import './App.css';

import { Card } from './card/Card';
import { Handspace } from './card/Handspace';
import { Workspace } from './card/Workspace';

export default function App() {
  return (
    <>
      <header className="flex items-center">Cards</header>
      <main id="workspace">
        <Workspace>
          <Card />
          <Card />
          <Card />
          <Handspace />
        </Workspace>
      </main>
    </>
  );
}
