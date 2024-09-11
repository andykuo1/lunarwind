import Creature01 from '@/assets/cards/asparagusAlien.png';
import BeakedSharkUrl from '@/assets/cards/beakedShark.png';
import BeanDogUrl from '@/assets/cards/beanDog.png';
import Creature02 from '@/assets/cards/beeWorm.png';
import Creature03 from '@/assets/cards/bird.png';
import Creature04 from '@/assets/cards/carrotPower.png';
import Creature05 from '@/assets/cards/cat.png';
import CatfishCatUrl from '@/assets/cards/catfishCat.png';
import Creature06 from '@/assets/cards/chefRiddle.png';
import DuckWizardUrl from '@/assets/cards/duckWizard.png';
import ElectricSebsUrl from '@/assets/cards/electricSebs.png';
import Creature07 from '@/assets/cards/elephant.png';
import Creature08 from '@/assets/cards/frogFarmer.png';
import GhastCrownUrl from '@/assets/cards/ghastCrown.png';
import Creature09 from '@/assets/cards/glyphMaze.png';
import MantisPupUrl from '@/assets/cards/mantisPup.png';
import RadioTofuUrl from '@/assets/cards/radioTofu.png';
import Creature10 from '@/assets/cards/rugFlower.png';
import SeaFlowerUrl from '@/assets/cards/seaFlower.png';
import Creature11 from '@/assets/cards/shadowMirror.png';
import Creature12 from '@/assets/cards/shoreBush.png';
import Creature13 from '@/assets/cards/slugHobo.png';
import Creature14 from '@/assets/cards/spiderArrow.png';
import Creature15 from '@/assets/cards/squiggleTablet.png';
import Creature16 from '@/assets/cards/stagHead.png';
import SubFishUrl from '@/assets/cards/subFish.png';
import TapeLeechUrl from '@/assets/cards/tapeLeech.png';
import Creature17 from '@/assets/cards/turtle.png';
import Creature18 from '@/assets/cards/wormSun.png';
import { createTastePalette } from './Card';
import { registerCard } from './CardRegistry';
import { RarityValues } from './Rarity';
import { TasteValues } from './Taste';

export const THE_VOID = registerCard('', {
  title: 'The Void',
  rarity: RarityValues.FABLED,
});
export const THE_RED_DRAGON = registerCard('theRedDragon', {
  title: 'The Red Dragon',
  rarity: RarityValues.FABLED,
  tastes: createTastePalette(
    TasteValues.BITTER,
    TasteValues.BITTER,
    TasteValues.BITTER
  ),
});
export const CABBAGE = registerCard('cabbage', {
  title: 'Cabbage',
  rarity: RarityValues.COMMON,
  tastes: createTastePalette(TasteValues.BLAND),
});
export const CHOP_ACTION = registerCard('chopAction', {
  title: 'Chop!',
  rarity: RarityValues.COMMON,
  tastes: createTastePalette(TasteValues.BLAND, TasteValues.BLAND),
});
export const THREE_EYED_CONE = registerCard('threeEyedCone', {
  title: 'Three-Eyed Cone',
  rarity: RarityValues.COMMON,
  tastes: createTastePalette(TasteValues.SAVORY, TasteValues.SWEET),
  portraitUrl: Creature01,
});
export const BEE_WORM = registerCard('beeWorm', {
  title: 'Sap Leecher',
  rarity: RarityValues.RARE,
  tastes: createTastePalette(TasteValues.SWEET, TasteValues.BITTER),
  portraitUrl: Creature02,
});
export const BIRD = registerCard('bird', {
  title: 'Confused Pecker',
  portraitUrl: Creature03,
  tastes: createTastePalette(TasteValues.BITTER, TasteValues.SALTY),
  rarity: RarityValues.RARE,
});
export const HOT_CARROT = registerCard('hotCarrot', {
  title: 'Hot Carrot',
  portraitUrl: Creature04,
  tastes: createTastePalette(TasteValues.BITTER),
  rarity: RarityValues.FABLED,
});
export const TIME_CAT = registerCard('timeCat', {
  title: 'Cat of Time',
  portraitUrl: Creature05,
  tastes: createTastePalette(TasteValues.SOUR, TasteValues.SWEET),
  rarity: RarityValues.RARE,
});
export const SHAPE_CHEF = registerCard('shapeChef', {
  title: 'Abstract Chef',
  portraitUrl: Creature06,
  tastes: createTastePalette(TasteValues.SWEET),
  rarity: RarityValues.UNCOMMON,
});
export const ROYAL_ELEPHANT = registerCard('royalElephant', {
  title: 'Royal Elephant',
  portraitUrl: Creature07,
  tastes: createTastePalette(
    TasteValues.SOUR,
    TasteValues.SOUR,
    TasteValues.SOUR
  ),
  rarity: RarityValues.UNCOMMON,
});
export const MAW_FARM = registerCard('mawFarm', {
  title: 'Maw of the Farm',
  portraitUrl: Creature08,
  tastes: createTastePalette(TasteValues.SWEET, TasteValues.SWEET),
  rarity: RarityValues.UNCOMMON,
});
export const LOST_SQUIGGLE = registerCard('lostSquiggle', {
  title: 'Lost in the Weeds',
  portraitUrl: Creature09,
  tastes: createTastePalette(TasteValues.SOUR, TasteValues.SWEET),
  rarity: RarityValues.UNCOMMON,
});
export const RUG_AND_FLOWER = registerCard('rugAndFlower', {
  title: 'A Flower on Rug',
  portraitUrl: Creature10,
  tastes: createTastePalette(
    TasteValues.SAVORY,
    TasteValues.SALTY,
    TasteValues.SALTY
  ),
  rarity: RarityValues.RARE,
});
export const MIRROR_SHADOW = registerCard('mirrorShadow', {
  title: 'Mirror-Mirror',
  portraitUrl: Creature11,
  tastes: createTastePalette(TasteValues.SAVORY, TasteValues.SALTY),
  rarity: RarityValues.UNCOMMON,
});
export const MOON_SHORE = registerCard('moonShore', {
  title: 'Moonlit Night',
  portraitUrl: Creature12,
  tastes: createTastePalette(TasteValues.SAVORY, TasteValues.SWEET),
  rarity: RarityValues.RARE,
});
export const BAGUETTE_SLUG = registerCard('baguetteSlug', {
  title: 'Baguette Slug',
  portraitUrl: Creature13,
  tastes: createTastePalette(TasteValues.SAVORY),
  rarity: RarityValues.RARE,
});
export const SPIDER_ARROWS = registerCard('spiderArrows', {
  title: 'Spider Queen',
  portraitUrl: Creature14,
  tastes: createTastePalette(TasteValues.SAVORY),
  rarity: RarityValues.RARE,
});
export const TABLET_OF_MYSTERY = registerCard('tabletOfMystery', {
  title: 'Tablet of the Forgotten',
  portraitUrl: Creature15,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.RARE,
});
export const CONCERNED_MAN = registerCard('concernedMan', {
  title: 'Concerned Man',
  portraitUrl: Creature16,
  tastes: createTastePalette(TasteValues.SALTY, TasteValues.SALTY),
  rarity: RarityValues.UNCOMMON,
});
export const TURTLE_OVER = registerCard('turtleOver', {
  title: 'Turtle of Fun',
  portraitUrl: Creature17,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.FABLED,
});
export const SUN_WORM = registerCard('sunWorm', {
  title: 'Sun-bathed Worm',
  portraitUrl: Creature18,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.FABLED,
});
export const BEAN_DOG = registerCard('beanDog', {
  title: 'Bean Dog',
  portraitUrl: BeanDogUrl,
  tastes: createTastePalette(TasteValues.SWEET),
  rarity: RarityValues.COMMON,
});
export const DUCK_WIZARD = registerCard('duckWizard', {
  title: 'Duck Wizard',
  portraitUrl: DuckWizardUrl,
  tastes: createTastePalette(TasteValues.SAVORY),
  rarity: RarityValues.FABLED,
});
export const MANTIS_PUP = registerCard('mantisPup', {
  title: 'Mantis Pup',
  portraitUrl: MantisPupUrl,
  tastes: createTastePalette(TasteValues.BITTER),
  rarity: RarityValues.UNCOMMON,
});
export const CATFISH_CAT = registerCard('catfishCat', {
  title: 'Catfish Cat',
  portraitUrl: CatfishCatUrl,
  tastes: createTastePalette(TasteValues.SWEET),
  rarity: RarityValues.RARE,
});
export const ELECTRIC_SEBS = registerCard('electricSebs', {
  title: 'Dark Angular',
  portraitUrl: ElectricSebsUrl,
  tastes: createTastePalette(TasteValues.SALTY),
  rarity: RarityValues.UNCOMMON,
});
export const BEAKED_SHARK = registerCard('beakedShark', {
  title: 'Beaked Shark Head',
  portraitUrl: BeakedSharkUrl,
  tastes: createTastePalette(TasteValues.SOUR, TasteValues.SWEET),
  rarity: RarityValues.FABLED,
});
export const RADIO_TOFU = registerCard('radioTofu', {
  title: 'Radioto',
  portraitUrl: RadioTofuUrl,
  tastes: createTastePalette(TasteValues.BLAND),
  rarity: RarityValues.COMMON,
});
export const TAPE_LEECH = registerCard('tapeLeech', {
  title: 'Leeched Tape',
  portraitUrl: TapeLeechUrl,
  tastes: createTastePalette(TasteValues.BITTER),
  rarity: RarityValues.COMMON,
});
export const SUB_FISH = registerCard('subFish', {
  title: 'Sub Fish',
  portraitUrl: SubFishUrl,
  tastes: createTastePalette(TasteValues.SWEET),
  rarity: RarityValues.COMMON,
});
export const SEA_FLOWER = registerCard('seaFlower', {
  title: 'Seabulb Weeds',
  portraitUrl: SeaFlowerUrl,
  tastes: createTastePalette(TasteValues.SWEET, TasteValues.SWEET),
  rarity: RarityValues.JUNK,
});
export const GHAST_CROWN = registerCard('ghastCrown', {
  title: 'Ghast Crown',
  portraitUrl: GhastCrownUrl,
  tastes: createTastePalette(TasteValues.BLAND),
  rarity: RarityValues.RARE,
});
