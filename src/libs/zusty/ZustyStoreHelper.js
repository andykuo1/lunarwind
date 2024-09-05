import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { performZustyUpgradeOnStore } from './ZustyUpgrade';

/**
 * @template Store
 * @typedef {import('zustand').StoreApi<Store>['setState']} SetState<Store>
 */

/**
 * @template Store
 * @typedef {import('zustand').StoreApi<Store>['getState']} GetState<Store>
 */

/**
 * @template Store
 * @callback GetStoreCallback
 * @returns {Readonly<Store>}
 */

/**
 * @template Store
 * @callback SetStoreCallback
 * @param {Partial<Store>} partial
 * @param {boolean} [replace]
 */

/**
 * @template Store
 * @callback UpdateStoreCallback
 * @param {(draft: Partial<Store>) => void} applier
 */

/**
 * @template Store
 * @typedef {{ getStore: GetStoreCallback<Store> }} DispatchInternal
 */

/**
 * @template Store
 * @template Dispatch
 * @typedef {Store & { dispatch: Dispatch & { getStore: GetStoreCallback<Store> }}} StoreAndDispatch
 */

/**
 * @template Store
 * @callback CreateStore
 * @returns {Store}
 */

/**
 * @template Dispatch
 * @callback CreateDispatch
 * @param {SetState<any>} set
 * @param {GetState<any>} get
 * @returns {Dispatch}
 */

/**
 * @template Store
 * @callback MigrateStore
 * @param {any} oldStore
 * @param {number} oldVersion
 * @param {number} newVersion
 * @returns {Promise<Store>}
 */

/**
 * @template T
 * @template Store
 * @callback UseStore
 * @param {(ctx: Store) => T} selector
 * @returns {T}
 */

/**
 * @template Store
 * @template Dispatch
 * @template {Store & { dispatch: Dispatch }} StoreAndDispatch
 * @param {CreateStore<Store>} createStore
 * @param {CreateDispatch<Dispatch>} createDispatch
 */
export function createStoreAndDispatch(createStore, createDispatch) {
  const init = createZustyStateInitializer(createStore, createDispatch);
  return /** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<StoreAndDispatch>>} */ (
    /** @type {unknown} */ (create(init))
  );
}

/**
 * @template Store
 * @param {Store} store
 * @returns {{ getStore: GetStoreCallback<Store>, setStore: SetStoreCallback<Store>, updateStore: UpdateStoreCallback<Store> }}
 */
export function getZustyStoreInternals(store) {
  return /** @type {any} */ (store).dispatch;
}

/**
 * @template Store
 * @template Dispatch
 * @template {Store & { dispatch: Dispatch }} StoreAndDispatch
 * @param {CreateStore<Store>} createStore
 * @param {CreateDispatch<Dispatch>} createDispatch
 * @param {MigrateStore<Store>} migrateStore
 * @param {string} persistStorageKey
 * @param {number} currentVersion
 */
export function createPersistantStoreAndDispatch(
  createStore,
  createDispatch,
  migrateStore,
  persistStorageKey,
  currentVersion
) {
  const init = createZustyStateInitializer(createStore, createDispatch);
  const opts = createZustyPersistOptions(
    createStore,
    migrateStore,
    persistStorageKey,
    currentVersion
  );
  return /** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<StoreAndDispatch>>} */ (
    /** @type {unknown} */ (create(persist(init, opts)))
  );
}

/**
 * @template Store
 * @template Dispatch
 * @param {CreateStore<Store>} createStore
 * @param {CreateDispatch<Dispatch>} createDispatch
 */
export function createZustyStateInitializer(createStore, createDispatch) {
  /**
   * @param {SetState<any>} set
   * @param {GetState<any>} get
   * @returns {StoreAndDispatch<Store, Dispatch>}
   */
  return function initializeStore(set, get) {
    return {
      ...createStore(),
      dispatch: {
        /** @type {GetStoreCallback<Store>} */
        getStore: get,
        /** @type {SetStoreCallback<Store>} */
        setStore: set,
        /** @type {UpdateStoreCallback<Store>} */
        updateStore: function update(applier) {
          set(produce(applier));
        },
        ...createDispatch(set, get),
      },
    };
  };
}

/**
 * @template Store
 * @template Dispatch
 * @param {CreateStore<Store>} createStore
 * @param {MigrateStore<Store>} migrateStore
 * @param {string} persistStorageKey
 * @param {number} currentVersion
 * @param {object} [opts]
 * @param {import('zustand/middleware').PersistStorage<StoreAndDispatch<Store, Dispatch>>} [opts.storage]
 */
export function createZustyPersistOptions(
  createStore,
  migrateStore,
  persistStorageKey,
  currentVersion,
  opts = {}
) {
  /** @type {import('zustand/middleware').PersistOptions<StoreAndDispatch<Store, Dispatch>>} */
  let result = {
    name: persistStorageKey,
    version: currentVersion,
    storage: opts?.storage ?? createJSONStorage(() => localStorage),
    partialize(state) {
      return excludeDispatchFromState(state);
    },
    /**
     * @param {unknown} persistedState
     * @param {number} version
     * @returns {Promise<any>} The migrated persisted state.
     */
    async migrate(persistedState, version) {
      const oldStore = persistedState;
      const oldVersion = version;
      // NOTE: persistedStore is partialized-- so it doesn't have dispatch.
      return await migrateStore(oldStore, oldVersion, currentVersion);
    },
    /**
     * @param {unknown} persistedState
     * @param {StoreAndDispatch<Store, Dispatch>} currentState
     */
    merge(persistedState, currentState) {
      return /** @type {StoreAndDispatch<Store, Dispatch>} */ (
        performZustyUpgradeOnStore(createStore, persistedState, currentState)
      );
    },
  };
  return result;
}

/**
 * @template T
 * @param {T & { dispatch: any }} state
 * @returns {T}
 */
export function excludeDispatchFromState(state) {
  const { dispatch, ...rest } = state;
  return /** @type {T} */ (rest);
}

/**
 * @template T
 * @template Dispatch
 * @param {(selector: ((ctx: { dispatch: Dispatch }) => T)) => T} useStore
 */
export function extractDispatch(useStore) {
  /**
   * @template T
   * @param {(dispatch: Dispatch) => T} selector
   * @returns {T}
   */
  return function useStoreAsDispatch(selector) {
    return useStore((ctx) => selector(ctx.dispatch));
  };
}

/**
 * @template Store
 * @param {(selector: ((ctx: Store & { dispatch: { getStore: () => Store } }) => any)) => any} useStore
 */
export function extractGetStore(useStore) {
  /**
   * @returns {() => import('@/libs/type/DeepReadonly').DeepReadonly<Store>}
   */
  return function useGetStore() {
    return useStore((ctx) => ctx.dispatch.getStore);
  };
}
