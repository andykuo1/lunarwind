import { BoosterPack } from '../card/BoosterPack';
import { Deck } from '../card/Deck';
import { Handspace } from '../card/Handspace';
import { Lootspace } from '../card/Lootspace';
import { Playspace } from '../card/Playspace';
import { usePlayStore } from '../stores/play/PlayStore';

/**
 * @param {object} props
 * @param {import('@/stores/play/State').SessionId} [props.sessionId]
 */
export function PlaySessionPage({ sessionId }) {
  if (!sessionId) {
    return <h1>Missing Session Id!</h1>;
  }
  return <SessionContainer sessionId={sessionId} />;
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').SessionId} props.sessionId
 */
function SessionContainer({ sessionId }) {
  const localHandId = usePlayStore(
    (ctx) => ctx.sessions[sessionId]?.localHandId
  );
  const localPlayId = usePlayStore(
    (ctx) => ctx.sessions[sessionId]?.localPlayId
  );
  if (!sessionId) {
    return <p>No session available.</p>;
  }
  return (
    <>
      <header className="flex items-center">Cards</header>
      <main id="workspace" className="h-full w-full overflow-hidden">
        <Playspace
          className="absolute bottom-0 left-0 right-0 top-0 bg-green-800/60"
          playId={localPlayId}
        />
        <Deck handId={localHandId} cardCount={10} />
        <Handspace handId={localHandId} playId={localPlayId} />
        <div className="absolute left-10 top-10">
          <BoosterPack />
        </div>
        <Lootspace />
      </main>
    </>
  );
}
