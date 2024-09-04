import { RarityValues } from '../values';

/**
 * @param {object} props
 * @param {import('@/card/values').Rarity} props.rarity
 */
export function RaritySymbol({ rarity }) {
  switch (rarity) {
    case RarityValues.COMMON:
      return <span>●</span>;
    case RarityValues.UNCOMMON:
      return <span>◆</span>;
    case RarityValues.RARE:
      return <span>✱</span>;
    case RarityValues.FABLED:
      return <span>✾</span>;
    case RarityValues.JUNK:
    default:
      return <span>✦</span>;
  }
}
