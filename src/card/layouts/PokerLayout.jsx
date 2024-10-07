import { getPokerSymbolUrl } from '../datas/PokerCardData';

/**
 * @param {object} props
 * @param {import('../datas/PokerCardData').PokerCardData} props.cardData
 */
export function PokerLayout({ cardData }) {
  return (
    <>
      <header className="mr-auto p-2 text-left">
        <img
          className="inline-block w-10"
          src={getPokerSymbolUrl(cardData.symbol)}
        />
      </header>
      <div className="flex-1 text-center">
        <h2>{cardData.title}</h2>
      </div>
      <footer className="ml-auto p-2 text-right">
        <img
          className="inline-block w-10"
          src={getPokerSymbolUrl(cardData.symbol)}
        />
      </footer>
    </>
  );
}
