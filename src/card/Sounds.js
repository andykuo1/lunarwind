import { Howl } from 'howler';

import CardSoundUrl from '@/assets/cardFlip.ogg';
import BoosterPackSoundUrl from '@/assets/foilTouch.ogg';

const BoosterPackSound = new Howl({
  src: [BoosterPackSoundUrl],
});
let BoosterPackSoundLastPlayedMillis = Number.NEGATIVE_INFINITY;
export function playBoosterPackTouch() {
  let now = performance.now();
  if (now - BoosterPackSoundLastPlayedMillis > 60) {
    BoosterPackSound.rate(0.8 + Math.random() * 0.5);
    BoosterPackSound.volume(0.2);
    BoosterPackSound.play();
    BoosterPackSoundLastPlayedMillis = now;
  }
}

const CardTouchSound = new Howl({
  src: [CardSoundUrl],
});
CardTouchSound.pos(0, 2, 0);
let CardSoundLastPlayedMillis = Number.NEGATIVE_INFINITY;
export function playCardTouch() {
  let now = performance.now();
  if (now - CardSoundLastPlayedMillis > 60) {
    CardTouchSound.rate(1 + Math.random() * 1);
    CardTouchSound.volume(1);
    CardTouchSound.play();
    CardSoundLastPlayedMillis = now;
  }
}
