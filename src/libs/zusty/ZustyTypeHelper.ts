/* eslint-disable @typescript-eslint/no-explicit-any */

export type Tail<T extends any[]> = T extends [infer _A, ...infer R]
  ? R
  : never;
