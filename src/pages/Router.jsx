import { createRouter } from '@swan-io/chicane';
import { match } from 'ts-pattern';

import { TradewindPage } from '@/tradewind/TradewindPage';
import { HomePage } from './HomePage';
import { LibraryPage } from './LibraryPage';
import { PlayListPage } from './PlayListPage';
import { PlaySessionPage } from './PlaySessionPage';
import { StorePage } from './StorePage';

export const Router = createRouter({
  Home: '/',
  Store: '/store',
  Library: '/lib',
  PlayList: '/play',
  PlaySession: '/play/:sessionId',
  Tradewind: '/tradewind',
});

export function Routes() {
  const route = Router.useRoute([
    'Home',
    'Library',
    'PlayList',
    'PlaySession',
    'Store',
    'Tradewind',
  ]);
  return match(route)
    .with({ name: 'Home' }, () => <HomePage />)
    .with({ name: 'Store' }, () => <StorePage />)
    .with({ name: 'Library' }, () => <LibraryPage />)
    .with({ name: 'PlayList' }, () => <PlayListPage />)
    .with({ name: 'PlaySession' }, ({ params: { sessionId } }) => (
      <PlaySessionPage sessionId={sessionId} />
    ))
    .with({ name: 'Tradewind' }, () => <TradewindPage />)
    .otherwise(() => <h1>No Page Availabe :(</h1>);
}
