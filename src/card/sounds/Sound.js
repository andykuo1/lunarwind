import { Howl } from 'howler';

export class Sound {
  /**
   * @param {string} url
   * @param {number} volume
   * @param {number} minRate
   * @param {number} maxRate
   */
  constructor(url, volume, minRate, maxRate) {
    this.howl = new Howl({
      src: [url],
    });
    this.volume = volume;
    this.minRate = minRate;
    this.maxRate = maxRate;
    this.lastPlayedMillis = Number.NEGATIVE_INFINITY;
  }

  /**
   * @param {(howl: Howl) => void} callback
   */
  configure(callback) {
    callback(this.howl);
    return this;
  }

  play() {
    let now = performance.now();
    if (now - this.lastPlayedMillis > 60) {
      if (this.minRate !== 1 || this.maxRate !== 1) {
        this.howl.rate(
          this.minRate + Math.random() * (this.maxRate - this.minRate)
        );
      }
      if (this.volume !== 1) {
        this.howl.volume(this.volume);
      }
      this.howl.play();
      this.lastPlayedMillis = now;
    }
  }
}
