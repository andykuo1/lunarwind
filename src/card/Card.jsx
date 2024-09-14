import {
  AudioWaveform,
  Candy,
  Carrot,
  Cat,
  Coins,
  HandPlatter,
  Soup,
} from 'lucide-react';

import BackgroundImageUrl from '@/assets/paper4.png';
import { getCardDataById } from '@/card/datas';
import { cn } from '@/libs/react';
import { CoinSymbol } from './symbols/CoinSymbol';
import { RaritySymbol } from './symbols/RaritySymbol';
import { TasteSymbol } from './symbols/TasteSymbol';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 * @param {import('react').RefObject<HTMLElement>} [props.innerRef]
 * @param {import('react').RefObject<HTMLDivElement>} [props.overlayRef]
 * @param {import('@/card/datas').CardId} props.cardId
 */
export function CardFace({ className, style, innerRef, overlayRef, cardId }) {
  const card = getCardDataById(cardId);
  if (!card) {
    return null;
  }
  return (
    <article
      ref={innerRef}
      className={cn(
        'relative z-0 flex h-[3.5in] min-h-[3.5in] w-[2.5in] min-w-[2.5in] select-none flex-col overflow-hidden rounded-xl bg-neutral-800 text-white',
        className
      )}
      style={style}
    >
      <header>
        <h2 className="flex gap-1 px-4 py-1 font-bold">
          <span className="flex-1">{card.title}</span>
          {card.tastes.flatMap((count, i) =>
            count > 0
              ? new Array(count)
                  .fill(0)
                  .map((_, j) => (
                    <TasteSymbol
                      key={`${i}:${j}`}
                      taste={/** @type {import('./values/Taste').Taste}*/ (i)}
                    />
                  ))
              : null
          )}
        </h2>
        <div className="flex gap-1">
          <figure className="relative ml-4 mr-2 flex flex-col items-center">
            <CoinSymbol coin={4} />
          </figure>
          <figure className="relative mr-4 h-[1.5in] w-full rounded-xl bg-white">
            <img
              className="mx-auto h-full"
              src={card.portraitUrl}
              alt={card.portraitAlt}
            />
            <figcaption className="absolute -bottom-4 left-0 right-0 flex px-1 text-xs">
              <div className="flex-1 uppercase">{card.layout}</div>
              <div>
                <RaritySymbol rarity={card.rarity} />
              </div>
            </figcaption>
          </figure>
        </div>
      </header>
      <section className="text font-sans-md relative m-3 mt-4 flex flex-1 flex-col p-4 text-black">
        <img
          className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full"
          src={BackgroundImageUrl}
        />
        <CardText className="inline-block h-6 w-6" text={card.body} />
        <div className="flex-1" />
        <p className="text-xs italic">{card.portraitAlt}</p>
      </section>
      <div
        ref={overlayRef}
        className="absolute bottom-0 left-0 right-0 top-0"
      />
    </article>
  );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {string} props.text
 */
export function CardText({ className, text }) {
  let result = [];
  let lines = text.split('\n');
  for (let line of lines) {
    let p = [];
    let savedIndex = 0;
    for (let i = line.indexOf('{'); i >= 0; i = line.indexOf('{', savedIndex)) {
      let j = line.indexOf('}', i);
      if (j === -1) {
        break;
      }
      let value = line.substring(i + 1, j);
      p.push(line.substring(savedIndex, i));
      p.push(
        <CardTextReplacement
          key={`${i}.${value}`}
          className={className}
          value={value}
        />
      );
      savedIndex = j + 1;
    }
    if (savedIndex < line.length) {
      let value = line.substring(savedIndex);
      p.push(value);
      savedIndex = line.length;
    }
    result.push(<p>{p}</p>);
  }
  return result;
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {string} props.value
 */
function CardTextReplacement({ className, value }) {
  switch (value) {
    case 'ORDER':
      return <HandPlatter className={className} />;
    case 'SOUP':
      return <Soup className={className} />;
    case 'SWEET':
      return <Candy className={className} />;
    case 'COIN':
      return <Coins className={className} />;
    default:
      return <Carrot className={className} />;
  }
}

export function CardBack() {
  return (
    <div className="relative z-0 flex h-[3.5in] min-h-[3.5in] w-[2.5in] min-w-[2.5in] select-none flex-col overflow-hidden rounded-xl bg-neutral-800">
      <div className="flex flex-1">
        <div className="m-auto flex flex-col">
          <Cat />
          <AudioWaveform />
          <Carrot />
        </div>
        <div className="m-auto flex flex-col">
          <Cat />
          <AudioWaveform />
          <Carrot />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="m-auto flex flex-col">
          <Cat />
          <AudioWaveform />
          <Carrot />
        </div>
        <div className="m-auto flex flex-col">
          <Cat />
          <AudioWaveform />
          <Carrot />
        </div>
      </div>
    </div>
  );
}
