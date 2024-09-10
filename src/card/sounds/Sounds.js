import CardFlipUrl from '@/assets/cardFlip.ogg';
import FoilTouchUrl from '@/assets/foilTouch.ogg';
import PackOpenUrl from '@/assets/packOpen.ogg';
import { Sound } from './Sound';

export const PackTouchSound = new Sound(FoilTouchUrl, 0.2, 0.8, 1.3);
export const CardTouchSound = new Sound(CardFlipUrl, 1, 1, 2).configure(
  (howl) => howl.pos(0, 2, 0)
);
export const PackOpenSound = new Sound(PackOpenUrl, 1, 1, 1);
