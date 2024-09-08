import { useLocalStorage } from '@uidotdev/usehooks';
import { Home, Plus, RefreshCcw, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/libs/react';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { cuid } from '../libs/math';
import { Router } from './Router';

const LAST_SESSION_ID_STORAGE_KEY = 'lastSessionId';

export function PlayListPage() {
  const clearSessions = usePlayDispatch((ctx) => ctx.clearSessions);
  const [lastSessionId, setLastSessionId] = useLocalStorage(
    LAST_SESSION_ID_STORAGE_KEY,
    ''
  );
  const [selectedSessionId, setSelectedSessionId] = useState('');

  useEffect(() => {
    if (lastSessionId) {
      setSelectedSessionId(lastSessionId);
    }
  }, [lastSessionId]);

  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <header className="flex items-center">
          <GoHomeButton />
          <h1 className="flex-1 text-center">Available Sessions</h1>
          <button
            className="flex items-center gap-2 rounded-xl border p-4 text-xl disabled:opacity-30"
            onClick={() => {
              setLastSessionId('');
              clearSessions();
            }}
          >
            <RefreshCcw /> Refresh
          </button>
        </header>
        <SessionList
          className="flex-1 rounded-xl border p-4"
          listClassName="border-b border-white/30 select-none hover:bg-white/10"
          selectedClassName="bg-white/10"
          value={selectedSessionId}
          onChange={(sessionId) => setSelectedSessionId(sessionId)}
        />
        <nav className="mx-auto flex gap-2">
          <EnterSessionButton nextSessionId={cuid()}>
            <Plus /> New Game
          </EnterSessionButton>
          <EnterSessionButton nextSessionId={selectedSessionId}>
            <Users /> Join Game
          </EnterSessionButton>
        </nav>
      </div>
    </>
  );
}

function GoHomeButton() {
  return (
    <button
      className="flex items-center gap-2 rounded-xl border p-4 text-xl disabled:opacity-30"
      onClick={() => Router.push('Home')}
    >
      <Home /> Home
    </button>
  );
}

/**
 * @param {object} props
 * @param {import('@/stores/play/State').SessionId} props.nextSessionId
 * @param {import('react').ReactNode} props.children
 */
function EnterSessionButton({ nextSessionId, children }) {
  const resolveSession = usePlayDispatch((ctx) => ctx.resolveSession);
  const [_, setLastSessionId] = useLocalStorage(
    LAST_SESSION_ID_STORAGE_KEY,
    ''
  );
  return (
    <button
      className="flex items-center gap-2 rounded-xl border p-4 text-xl disabled:opacity-30"
      disabled={!nextSessionId}
      onClick={() => {
        setLastSessionId(nextSessionId);
        resolveSession(nextSessionId, {
          lastActiveTimeMillis: Date.now(),
        });
        Router.push('PlaySession', { sessionId: nextSessionId });
      }}
    >
      {children}
    </button>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {string} props.listClassName
 * @param {string} props.selectedClassName
 * @param {import('@/stores/play/State').SessionId} props.value
 * @param {(sessionId: import('@/stores/play/State').SessionId) => void} props.onChange
 */
function SessionList({
  className,
  listClassName,
  selectedClassName,
  value,
  onChange,
}) {
  const sessionIds = usePlayStore(
    useShallow((ctx) =>
      Object.keys(ctx.sessions).sort(
        (a, b) =>
          (ctx.sessions[b]?.lastActiveTimeMillis ?? 0) -
          (ctx.sessions[a]?.lastActiveTimeMillis ?? 0)
      )
    )
  );
  return (
    <table className={className}>
      <thead>
        <tr>
          <th>Session Id</th>
          <th>Last Time Opened</th>
        </tr>
      </thead>
      <tbody>
        {sessionIds.map((sessionId) => (
          <SessionListEntry
            className={cn(
              listClassName,
              value === sessionId ? selectedClassName : ''
            )}
            sessionId={sessionId}
            onClick={() => onChange(sessionId)}
          />
        ))}
      </tbody>
    </table>
  );
}

/**
 * @param {*} param0
 */
function SessionListEntry({ className, sessionId, onClick }) {
  const lastActiveTimeMillis = usePlayStore(
    (ctx) => ctx.sessions[sessionId]?.lastActiveTimeMillis
  );
  return (
    <tr className={className} onClick={onClick}>
      <td>{sessionId || '<unknown session id>'}</td>
      <td>{new Date(lastActiveTimeMillis).toLocaleString()}</td>
    </tr>
  );
}
