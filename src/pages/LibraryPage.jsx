import { useLocalStorage } from '@uidotdev/usehooks';
import { useShallow } from 'zustand/react/shallow';

import { CardFace } from '@/card/Card';
import { usePlayStore } from '@/stores/play/PlayStore';
import { HomeButton } from './components/HomeButton';
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
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center gap-2 bg-blue-900 p-2">
        <HomeButton />
        <h1>Library</h1>
      </header>
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <CardList collectionCards={ownedCards} />
      </div>
      <footer className=""></footer>
    </div>
  );
}

/**
 * @param {object} props
 * @param {Array<import('@/stores/play/State').CollectionCard>} props.collectionCards
 */
function CardList({ collectionCards }) {
  return (
    <ul className="grid auto-rows-min grid-cols-3">
      {collectionCards.map((collectionCard) => (
        <li
          key={collectionCard.cardId}
          className="relative m-auto min-w-min p-4"
        >
          <CardFace cardId={collectionCard.cardId} />
          <div className="absolute bottom-0 left-0 right-0 flex">
            <div className="mx-auto min-w-min rounded-full bg-black p-2 text-center font-bold">
              x{collectionCard.cardCount}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
