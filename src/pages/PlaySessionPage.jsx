import { CassinoGame } from '@/card/rules/CassinoGame';

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
  if (!sessionId) {
    return <p>No session available.</p>;
  }
  return (
    <>
      <header className="flex items-center">Cards</header>
      <main
        id="workspace"
        className="h-full w-full overflow-hidden bg-green-300/30"
      >
        <CassinoGame sessionId={sessionId} />
      </main>
    </>
  );
}
