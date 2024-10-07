import {
  AudioWaveform,
  Candy,
  Carrot,
  Cat,
  Coins,
  HandPlatter,
  Soup,
} from 'lucide-react';

import { getCardDataById } from '@/card/datas';
import { cn } from '@/libs/react';
import { PokerLayout } from './layouts/PokerLayout';
import { PortraitLayout } from './layouts/PortraitLayout';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 * @param {import('react').RefObject<HTMLElement>} [props.innerRef]
 * @param {import('react').RefObject<HTMLDivElement>} [props.overlayRef]
 * @param {import('@/card/datas').CardId} props.cardId
 */
export function CardFace({ className, style, innerRef, overlayRef, cardId }) {
  return (
    <article
      ref={innerRef}
      className={cn(
        'relative z-0 flex h-[3.5in] min-h-[3.5in] w-[2.5in] min-w-[2.5in] select-none flex-col overflow-hidden rounded-xl bg-neutral-800 text-white',
        className
      )}
      style={style}
    >
      <CardFaceContent cardData={getCardDataById(cardId)} />
      <div
        ref={overlayRef}
        className="absolute bottom-0 left-0 right-0 top-0"
      />
    </article>
  );
}

/**
 * @param {object} props
 * @param {import('./datas/CardData').CardData|null} props.cardData
 */
function CardFaceContent({ cardData }) {
  if (!cardData) {
    return null;
  }
  const cardLayout = cardData?.layout ?? 'portrait';
  switch (cardLayout) {
    case 'poker':
      return (
        <PokerLayout
          cardData={
            /** @type {import('./datas/PokerCardData').PokerCardData} */ (
              cardData
            )
          }
        />
      );
    case 'customer':
    case 'portrait':
    default:
      return (
        <PortraitLayout
          cardData={
            /** @type {import('./datas/CustomerCardData').CustomerCardData} */ (
              cardData
            )
          }
        />
      );
  }
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
