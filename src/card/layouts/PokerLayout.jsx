import { getPokerSymbolUrl } from '../datas/PokerCardData';

/**
 * @param {object} props
 * @param {import('../datas/PokerCardData').PokerCardData} props.cardData
 */
export function PokerLayout({ cardData }) {
  return (
    <>
      <header
        style={{
          padding: '0.5em' /* p-2 */,
        }}
        className="mr-auto text-left"
      >
        <img
          style={{
            width: '2.5em' /* w-10 */,
          }}
          className="inline-block"
          src={getPokerSymbolUrl(cardData.symbol)}
        />
      </header>
      <div className="flex-1 text-center">
        <h2>{cardData.title}</h2>
      </div>
      <footer
        style={{
          padding: '0.5em' /* p-2 */,
        }}
        className="ml-auto text-right"
      >
        <img
          style={{
            width: '2.5em' /* w-10 */,
          }}
          className="inline-block"
          src={getPokerSymbolUrl(cardData.symbol)}
        />
      </footer>
    </>
  );
}
