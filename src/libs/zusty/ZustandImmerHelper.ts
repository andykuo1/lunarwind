/* eslint-disable @typescript-eslint/no-explicit-any */

import { produce } from 'immer';

type Set<T> = import('zustand').StoreApi<T>['setState'];
type Get<T> = import('zustand').StoreApi<T>['getState'];

/**
 * A modifying Zustand-Immer store function. Applies the
 * state transformations onto the store and updates it.
 */
export function zi<Store, Args extends Array<any>>(
  set: Set<any>,
  applier: (store: Store, ...args: Args) => void
) {
  return (...args: Args) =>
    set(produce((draft) => applier(draft as Store, ...(args as Args))));
}

/**
 * A read-only Zustand-Immer store function. Performs
 * read operations on the current store state and does
 * NOT update the store.
 */
export function ziget<Store, ReturnType, Args extends Array<any>>(
  get: Get<any>,
  applier: (store: Store, ...args: Args) => ReturnType
) {
  return (...args: Args) =>
    applier(get(), ...(args as Args)) as Readonly<ReturnType>;
}
