import { getPokerFaceUrl } from '@/assets/pokers/cards/PokerCards';
import { getPokerRankUrl } from '@/assets/pokers/ranks/PokerRanks';

/**
 * @param {object} props
 * @param {import('../datas/PokerCardData').PokerCardData} props.cardData
 */
export function PokerLayout({ cardData }) {
  const pokerRankUrl = getPokerRankUrl(cardData.numeral);
  const pokerFaceUrl = getPokerFaceUrl(cardData.symbol, cardData.numeral);
  return (
    <>
      <header
        style={{
          padding: '0.5em' /* p-2 */,
        }}
        className="absolute left-0 right-0 top-0 text-black"
      >
        {cardData.numeral}
        <img
          style={{
            width: '2em',
          }}
          className="inline-block"
          src={pokerRankUrl}
        />
      </header>
      <div className="flex-1 text-center">
        <img
          style={{
            width: '100%' /* w-10 */,
            height: '100%',
            backgroundColor: 'white',
          }}
          className="inline-block"
          src={pokerFaceUrl}
        />
      </div>
      <footer
        style={{
          padding: '0.5em' /* p-2 */,
        }}
        className="absolute bottom-0 left-0 right-0 text-right"
      ></footer>
    </>
  );
}
