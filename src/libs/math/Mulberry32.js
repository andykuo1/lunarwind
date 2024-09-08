/**
 * A simple and fast 32-bit PRNG.
 *
 * @see {@link https://github.com/bryc/code/blob/master/jshash/PRNGs.md}
 */
export class Mulberry32 {
  /**
   * @param {number} seed An unsigned 32-bit integer.
   */
  constructor(seed) {
    this.seed = seed;

    /** @private */
    this.a = seed;
  }

  next() {
    var t = (this.a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
