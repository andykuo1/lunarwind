import { Link } from '@swan-io/chicane';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';

import { cuid } from '@/libs/math';
import { usePlayDispatch } from '@/stores/play/PlayStore';
import { Router } from './Router';

export const LAST_USER_ID_STORAGE_KEY = 'lastUserId';

export function HomePage() {
  const [lastUserId, setLastUserId] = useLocalStorage(
    LAST_USER_ID_STORAGE_KEY,
    ''
  );
  const resolveUser = usePlayDispatch((ctx) => ctx.resolveUser);

  useEffect(() => {
    if (!lastUserId) {
      let userId = cuid();
      resolveUser(userId, {});
      setLastUserId(userId);
    }
  }, [lastUserId, resolveUser, setLastUserId]);

  return (
    <>
      <h1>Home</h1>
      <nav className="flex gap-4">
        <Link to={Router.PlayList()}>Play!</Link>
        <Link to={Router.Library()}>Library</Link>
        <Link to={Router.Store()}>Store</Link>
      </nav>
      <p>{lastUserId}</p>
    </>
  );
}
