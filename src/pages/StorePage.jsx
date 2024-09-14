import { useLocalStorage } from '@uidotdev/usehooks';
import { Search, ShoppingCart, Shrub, TreePine, Truck } from 'lucide-react';
import { useRef, useState } from 'react';

import { getAllCards } from '@/card/datas';
import { OpenPackScreen } from '@/card/OpenPackScreen';
import { Sounds } from '@/card/sounds';
import {
  createLootTableEntry,
  createPack,
  openPack,
  RarityValues,
} from '@/card/values';
import { cn } from '@/libs/react';
import { useAnimationFrameEffect } from '@/libs/react/UseAnimationFrame';
import FadeAnimationStyle from '@/libs/style/FadeAnimation.module.css';
import { usePlayDispatch, usePlayStore } from '@/stores/play/PlayStore';
import { Button } from './components/Button';
import { HomeButton } from './components/HomeButton';
import { LAST_USER_ID_STORAGE_KEY } from './HomePage';

export function StorePage() {
  const [opening, setOpening] = useState(false);
  function onBuyNow() {
    Sounds.COIN_JINGLE.play();
    setOpening(true);
  }
  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center gap-2 bg-blue-900 p-2">
        <HomeButton />
        <h1>Ragú Factory</h1>
        <div className="flex-1" />
        <div className="relative overflow-hidden rounded">
          <input className="w-full rounded p-1 pr-8" />
          <button className="absolute bottom-0 right-0 top-0 bg-yellow-400 text-black">
            <Search className="px-2" />
          </button>
        </div>
        <div className="flex-1" />
        <Button onClick={() => {}}>
          <ShoppingCart />
        </Button>
      </header>
      <div className="flex flex-1 overflow-x-auto px-4">
        <div className="flex gap-8">
          <ShopItem
            onBuyNow={onBuyNow}
            title="Booster Pack"
            price={9.99}
            wasPrice={10.99}
            deliveryCost={0}
          />
          <ShopItem
            onBuyNow={onBuyNow}
            title="Collector's Pack"
            price={19.99}
            wasPrice={22.99}
            deliveryCost={4.99}
          />
          <ShopItem
            onBuyNow={onBuyNow}
            title="Deluxe Pack"
            price={79.99}
            wasPrice={82.99}
            deliveryCost={10.99}
          />
          <ShopItem
            onBuyNow={onBuyNow}
            title="Ultra-Deluxe Pack"
            price={219.99}
            wasPrice={319.99}
            deliveryCost={10.99}
          />
          <ShopItem
            onBuyNow={onBuyNow}
            title="Mega-Deluxe Pack"
            price={499.99}
            wasPrice={699.99}
            deliveryCost={10.99}
          />
          <ShopItem
            onBuyNow={onBuyNow}
            title="Ultimate-Deluxe Pack"
            price={1999.99}
            wasPrice={2199.99}
            deliveryCost={32.99}
          />
        </div>
      </div>
      <PackOpening opening={opening} setOpening={setOpening} />
      <footer>
        <DeliveryMeter />
      </footer>
    </div>
  );
}

function DeliveryMeter() {
  return (
    <fieldset className="relative -mx-8 -mt-3 mb-2 bg-gradient-to-tr from-blue-300 to-blue-800">
      <legend className="mx-16 rounded-full bg-white px-4 text-black shadow">
        Awaiting Delivery...
      </legend>
      <div className="absolute bottom-0 -mb-3 h-4 w-full border-2 border-yellow-400 bg-green-500" />
      <div className="h-8 w-full" />
      <PassingTree offset={0} speed={0.01} />
      <PassingTree offset={20 - 7} speed={0.01} />
      <PassingTree offset={40 - 11} speed={0.01} />
      <PassingTree offset={60 - 3} speed={0.01} />
      <PassingTree offset={80 - 3} speed={0.01} />
      <PassingTree offset={100 - 11} speed={0.01} />
      <PassingShrub offset={80} speed={0.02} />
      <PassingShrub offset={0} speed={0.03} />
      <PassingShrub offset={50} speed={0.04} />
      <PassingShrub offset={20} speed={0.05} />
      <ProgressTruck offset={50} />
    </fieldset>
  );
}

/**
 * @param {object} props
 * @param {number} props.offset
 */
function ProgressTruck({ offset }) {
  return (
    <div
      className="w-6 rounded-full bg-black"
      style={{ position: 'absolute', left: `${offset}%`, bottom: '-4px' }}
    >
      <Truck style={{ transform: 'scale(1.5)', fill: '#000' }} />
    </div>
  );
}

/**
 * @param {object} props
 * @param {number} [props.offset]
 * @param {number} props.speed
 * @param {boolean} [props.disabled]
 */
function PassingTree({ offset: initialOffset = 100, speed, disabled }) {
  const [offset, setOffset] = useState(initialOffset);
  useAnimationFrameEffect(() => {
    setOffset((prev) => {
      if (disabled) {
        return prev;
      }
      let next = prev - speed;
      if (next <= 0) {
        next = 100;
      }
      return next;
    });
  }, [speed, disabled, setOffset]);
  return (
    <TreePine
      style={{
        position: 'absolute',
        bottom: '0',
        left: `${offset}%`,
        fill: '#AAA',
      }}
    />
  );
}

/**
 * @param {object} props
 * @param {number} [props.offset]
 * @param {number} props.speed
 * @param {boolean} [props.disabled]
 */
function PassingShrub({ offset: initialOffset = 100, speed, disabled }) {
  const [offset, setOffset] = useState(initialOffset);
  useAnimationFrameEffect(() => {
    setOffset((prev) => {
      if (disabled) {
        return prev;
      }
      let next = prev - speed;
      if (next <= 0) {
        next = 100;
      }
      return next;
    });
  }, [speed, disabled, setOffset]);
  return (
    <Shrub
      style={{
        position: 'absolute',
        bottom: '0',
        left: `${offset}%`,
        fill: '#FFF',
      }}
    />
  );
}

/**
 * @param {*} props
 */
function ShopItem({ title, price, wasPrice, deliveryCost, onBuyNow }) {
  return (
    <div className="flex h-full min-w-min flex-col gap-4 rounded text-black">
      {/* NOTE: This used to be the image. */}
      <div className="min-w-[3in]" />
      {/* NOTE: This used to be the image. */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4">
        <h2 className="text-xl">{title}</h2>
        <output className="text-4xl font-bold">
          <sup className="text-xl">$</sup>
          <span>{Math.trunc(price)}</span>
          <sup className="text-xl">{Math.trunc(price * 100) % 100}</sup>
          <sub className="px-2 text-sm opacity-30">
            Was:{' '}
            <span className="line-through">
              ${Math.trunc(wasPrice * 100) / 100}
            </span>
          </sub>
        </output>
        <p>
          {!deliveryCost || deliveryCost <= 0 ? 'FREE' : `+$${deliveryCost}`}{' '}
          delivery
        </p>
        <p>
          <span className="font-bold">Tomorrow 10 AM - 3PM</span>
        </p>
        <button className="rounded-full bg-gray-300 p-2">Add to Cart</button>
        <button className="rounded-full bg-yellow-400 p-2" onClick={onBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

/**
 * @param {*} props
 */
function PackOpening({ opening, setOpening }) {
  const [lastUserId, _] = useLocalStorage(LAST_USER_ID_STORAGE_KEY, '');
  const ref = useRef(/** @type {HTMLDivElement|null} */ (null));
  const addCardsToCollection = usePlayDispatch(
    (ctx) => ctx.addCardsToCollection
  );
  const collectionId = usePlayStore(
    (ctx) => ctx.users[lastUserId]?.ownedCollectionId
  );
  return (
    <>
      {opening && (
        <div
          ref={ref}
          className={cn(
            'absolute bottom-0 left-0 right-0 top-0 z-10',
            FadeAnimationStyle.animateFadeIn
          )}
        >
          <OpenPackScreen
            onOpen={() => {
              let result = openPack(
                createPack(
                  'all',
                  getAllCards().map((card) =>
                    createLootTableEntry(
                      card.cardId,
                      Object.keys(RarityValues).length - card.rarity
                    )
                  )
                )
              );
              addCardsToCollection(collectionId, result);
              return result;
            }}
            onDone={() => {
              ref.current?.classList.toggle(FadeAnimationStyle.animateFadeOut);
              setTimeout(() => setOpening(false), 500);
            }}
          />
        </div>
      )}
    </>
  );
}
