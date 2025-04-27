import { Candy, Carrot, Coins, HandPlatter, Soup } from 'lucide-react';

import BackgroundImageUrl from '@/assets/paper4.png';
import { CoinSymbol } from '../symbols/CoinSymbol';
import { RaritySymbol } from '../symbols/RaritySymbol';
import { TasteSymbol } from '../symbols/TasteSymbol';

/**
 * @param {object} props
 * @param {import('../datas/CustomerCardData').CustomerCardData} props.cardData
 */
export function PortraitLayout({ cardData }) {
  const { title, tastes, portraitAlt, portraitUrl, layout, rarity, body } =
    cardData;
  return (
    <>
      <header>
        <h2
          style={{
            gap: '0.25em' /* gap-1 */,
            padding: '0.25em 1em' /* px-4 py-1 */,
          }}
          className="flex font-bold"
        >
          <span className="flex-1">{title}</span>
          {tastes.flatMap((count, i) =>
            count > 0
              ? new Array(count)
                  .fill(0)
                  .map((_, j) => (
                    <TasteSymbol
                      key={`${i}:${j}`}
                      taste={
                        /** @type {import('@/card/values/Taste').Taste}*/ (i)
                      }
                    />
                  ))
              : null
          )}
        </h2>
        <div style={{ gap: '0.25em' /* gap-1 */ }} className="flex">
          <figure
            style={{
              marginLeft: '1em' /* ml-4 */,
              marginRight: '0.5em' /* mr-2 */,
            }}
            className="relative flex flex-col items-center"
          >
            <CoinSymbol coin={4} />
          </figure>
          <figure
            style={{
              height: '9em' /* h-[1.5in] */,
              marginRight: '1em' /* mr-4 */,
              borderRadius: '0.75em' /* rounded-xl */,
            }}
            className="relative w-full bg-white"
          >
            <img
              className="mx-auto h-full"
              src={portraitUrl}
              alt={portraitAlt}
            />
            <figcaption
              style={{
                fontSize: '0.75em' /* text-xs */,
                padding: '0 0.25em' /* px-1 py-0 */,
                bottom: '-1.5em' /* -bottom-4 */,
              }}
              className="absolute left-0 right-0 flex"
            >
              <div className="flex-1 uppercase">{layout}</div>
              <div>
                <RaritySymbol rarity={rarity} />
              </div>
            </figcaption>
          </figure>
        </div>
      </header>
      <section
        style={{
          padding: '1em' /* p-4 */,
          margin: '0.75em' /* m-3 */,
          marginTop: '1em' /* mt-4 */,
        }}
        className="relative flex flex-1 flex-col text-black"
      >
        <img
          className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full"
          src={BackgroundImageUrl}
        />
        <CardText
          style={{ width: '1.5em' /* w-6 */, height: '1.5em' /* h-6 */ }}
          className="inline-block"
          text={body}
        />
        <div className="flex-1" />
        <p style={{ fontSize: '0.75em' /* text-xs */ }} className="italic">
          {portraitAlt}
        </p>
      </section>
    </>
  );
}

/**
 * @param {object} props
 * @param {import('react').CSSProperties} props.style
 * @param {string} props.className
 * @param {string} props.text
 */
export function CardText({ style, className, text }) {
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
          style={style}
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
    result.push(<p key={line}>{p}</p>);
  }
  return result;
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {import('react').CSSProperties} [props.style]
 * @param {string} props.value
 */
function CardTextReplacement({ className, style, value }) {
  switch (value) {
    case 'ORDER':
      return <HandPlatter style={style} className={className} />;
    case 'SOUP':
      return <Soup style={style} className={className} />;
    case 'SWEET':
      return <Candy style={style} className={className} />;
    case 'COIN':
      return <Coins style={style} className={className} />;
    default:
      return <Carrot style={style} className={className} />;
  }
}
