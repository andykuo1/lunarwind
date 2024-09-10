/* eslint-disable @typescript-eslint/no-explicit-any */

import { StoreApi } from 'zustand';

import { zi } from './ZustandImmerHelper';
import { CreateDispatch } from './ZustyStoreHelper';
import { Tail } from './ZustyTypeHelper';

type ZustyDispatch<Store, T extends (...args: any) => void> = ReturnType<
  typeof zi<Store, Tail<Parameters<T>>>
>;

type ZustyDispatchMap<
  Store,
  Dispatch extends Record<string, (...args: any) => void>,
> = {
  [Key in keyof Dispatch]: ZustyDispatch<Store, Dispatch[Key]>;
};

/**
 * Creates a slice of the store of `zi()`-transformed
 * dispatch functions.
 */
export function createZustyDispatch<
  Store,
  Dispatch extends Record<string, (...args: any) => void>,
>(dispatch: Dispatch): CreateDispatch<ZustyDispatchMap<Store, Dispatch>> {
  return function createDispatch(
    set: StoreApi<any>['setState'],
    _get: StoreApi<any>['getState']
  ): ZustyDispatchMap<Store, Dispatch> {
    const result: any = {};
    for (const key in dispatch) {
      const value: (...args: any) => void = dispatch[key as keyof Dispatch];
      result[key] = zi(set, value);
    }
    return result;
  };
}
