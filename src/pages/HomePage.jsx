import { Link } from '@swan-io/chicane';

import { Router } from './Router';

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <nav className="flex gap-4">
        <Link to={Router.PlayList()}>Play!</Link>
        <Link to={Router.Library()}>Library</Link>
        <Link to={Router.Store()}>Store</Link>
      </nav>
    </>
  );
}
