/* eslint-disable @typescript-eslint/no-explicit-any */

import deepmerge from 'deepmerge';

import { CreateStore, StoreAndDispatch } from './ZustyStoreHelper';

type ZustyUpgradeSchemaFunction<T> = (prev: Partial<T>, curr?: Partial<T>) => T;
type ZustyUpgradeSchema<Keys extends string | symbol | number> = Partial<
  Record<Keys, ZustyUpgradeSchemaFunction<any>>
>;

const GET_STORE_UPGRADE_SCHEMA_KEY = Symbol('getStore$UpgradeSchema');

export function attachZustyUpgradeSchema<Store>(
  createStore: CreateStore<Store>,
  schema: ZustyUpgradeSchema<keyof Store>
) {
  Object.defineProperty(createStore, GET_STORE_UPGRADE_SCHEMA_KEY, {
    value: schema,
  });
  return createStore;
}

export function extractZustyUpgradeSchema<T>(factory: (...args: any) => T) {
  return (
    (factory as any)[GET_STORE_UPGRADE_SCHEMA_KEY] ??
    ({} as Readonly<ZustyUpgradeSchema<keyof T>>)
  );
}

export function performZustyUpgradeOnStore<Store, Dispatch>(
  createStore: CreateStore<Store>,
  persistedState: unknown,
  currentState: StoreAndDispatch<Store, Dispatch>
) {
  const upgradeSchema = extractZustyUpgradeSchema(createStore);
  return performZustyUpgradeOnSchema(
    upgradeSchema,
    persistedState,
    currentState
  ) as StoreAndDispatch<Store, Dispatch>;
}

export function performZustyUpgradeOnSchema(
  upgradeSchema: ZustyUpgradeSchema<any>,
  persistedState: unknown,
  currentState: Record<string, any>
) {
  const persistedKeys = Object.keys(persistedState ?? {});
  for (const persistedKey of persistedKeys) {
    const persistedValue = (persistedState as any)[persistedKey];
    let currentValue = currentState[persistedKey];
    if (persistedValue === currentValue) {
      continue;
    }

    if (!(persistedKey in upgradeSchema)) {
      // Not something upgradeable, so use default copy behavior...
      switch (typeof persistedValue) {
        case 'object':
          if (Array.isArray(persistedValue)) {
            currentState[persistedKey] = ArrayUnique(
              persistedValue,
              currentValue ?? []
            );
          } else {
            currentState[persistedKey] = ObjectDeepMerge(
              persistedValue,
              currentValue ?? {}
            );
          }
          break;
        default:
          // All other types are immutable...
          currentState[persistedKey] = persistedValue;
          break;
      }
    } else {
      // This IS upgradeable, so use overridden copy behavior...
      const upgradeFunction =
        upgradeSchema[persistedKey] ?? UPGRADE_FUNCTIONS.ObjectDeepMerge;
      // TODO: This shouldn't be by persisted value type, but by schema type.
      //  But this is how we are doing it for now.
      switch (typeof persistedValue) {
        case 'object':
          {
            if (Array.isArray(persistedValue)) {
              // TODO: This does not yet merge arrays-of-objects. Only shallow copies top-level arrays.
              currentState[persistedKey] = upgradeFunction(
                persistedValue,
                currentValue ?? []
              );
            } else {
              // TODO: This does not yet merge top-level objects. Only deep copies child-level entries.
              currentValue = currentValue ?? {};
              // It's time to upgrade.
              for (const key of Object.keys(persistedValue)) {
                currentValue[key] = upgradeFunction(
                  persistedValue[key],
                  currentValue[key]
                );
              }
              const childUpgradeSchema =
                extractZustyUpgradeSchema(upgradeFunction);
              if (childUpgradeSchema) {
                currentValue = performZustyUpgradeOnSchema(
                  childUpgradeSchema,
                  persistedValue,
                  currentValue
                );
              }
              currentState[persistedKey] = currentValue;
            }
          }
          break;
        default:
          throw new Error(
            `Unsupported data type '${typeof persistedValue}' for upgrade schema.`
          );
      }
    }
  }
  return currentState;
}

export const UPGRADE_FUNCTIONS = {
  ObjectDeepMerge,
  ArrayUnique,
  ArrayConcat,
};

function ObjectDeepMerge(prev: any, curr: any) {
  return deepmerge(curr, prev);
}

function ArrayUnique(prev: any, curr: any) {
  const result = new Set();
  for (const value of prev) {
    result.add(value);
  }
  for (const value of curr) {
    result.add(value);
  }
  return Array.from(result);
}

function ArrayConcat(prev: any, curr: any) {
  return [...prev, ...curr];
}
