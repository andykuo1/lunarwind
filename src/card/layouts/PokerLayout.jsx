import { Poker } from '@/assets/pokers/Poker';
import { cn } from '@/libs/react';

/**
 * @param {object} props
 * @param {import('../datas').CardData} props.cardData
 */
export function PokerLayout({ cardData }) {
  const card = Poker.Cards.ofId(cardData.cardId);
  const pokerSuitUrl = Poker.Suits.of(card.suit).imageSrc;
  return (
    <>
      <header
        style={{
          padding: '0.5em' /* p-2 */,
          color: Poker.Suits.of(card.suit).color,
        }}
        className={cn('absolute left-0 top-0')}
      >
        <div className="flex flex-col items-center rounded-full bg-white pr-2">
          <div className="font-mono text-4xl font-bold">
            {Poker.Ranks.of(card.rank).char}
          </div>
          <img
            style={{
              width: '2em',
            }}
            className="inline-block"
            src={pokerSuitUrl}
          />
        </div>
      </header>
      <div className="flex flex-1 items-center bg-white text-center">
        <img
          style={{
            width: '100%' /* w-10 */,
            backgroundColor: 'white',
          }}
          className="inline-block"
          src={Poker.Suits.of(card.suit).imageSrc}
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
