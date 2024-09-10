import { useLocalStorage } from '@uidotdev/usehooks';
import { useShallow } from 'zustand/react/shallow';

import { getCardById } from '@/card/values';
import { usePlayStore } from '@/stores/play/PlayStore';
import { LAST_USER_ID_STORAGE_KEY } from './HomePage';

export function LibraryPage() {
  const [lastUserId, _] = useLocalStorage(LAST_USER_ID_STORAGE_KEY, '');
  const ownedCards = usePlayStore(
    useShallow((ctx) =>
      Object.values(
        ctx.collections[ctx.users[lastUserId]?.ownedCollectionId]?.ownedCards
      ).sort((a, b) => b.cardCount - a.cardCount)
    )
  );
  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex-1">
        <h1>Library</h1>
      </header>
      <div className="overflow-y-auto">
        <CardList collectionCards={ownedCards} />
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {Array<import('@/stores/play/State').CollectionCard>} props.collectionCards
 */
function CardList({ collectionCards }) {
  return (
    <ul>
      {collectionCards.map((collectionCard) => (
        <li key={collectionCard.cardId} className="flex gap-2">
          <span>{getCardById(collectionCard.cardId).title}</span>
          <span>x{collectionCard.cardCount}</span>
        </li>
      ))}
    </ul>
  );
}
