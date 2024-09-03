/**
 * @param {number} x
 * @param {number} y
 * @param {number} u
 * @param {number} v
 */
export function distSquared(x, y, u, v) {
  let dx = u - x;
  let dy = v - y;
  return dx * dx + dy * dy;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}
