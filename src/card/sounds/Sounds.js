import CardFlipUrl from '@/assets/sounds/cardFlip.ogg';
import CoinJingleUrl from '@/assets/sounds/coinJingle.ogg';
import FoilTouchUrl from '@/assets/sounds/foilTouch.ogg';
import PackOpenUrl from '@/assets/sounds/packOpen.ogg';
import { Sound } from './Sound';

export const PACK_TOUCH = new Sound(FoilTouchUrl, 0.2, 0.8, 1.3);
export const CARD_TOUCH = new Sound(CardFlipUrl, 1, 1, 2).configure((howl) =>
  howl.pos(0, 2, 0)
);
export const PACK_OPEN = new Sound(PackOpenUrl, 1, 1, 1);
export const COIN_JINGLE = new Sound(CoinJingleUrl, 1, 0.8, 1.3);
