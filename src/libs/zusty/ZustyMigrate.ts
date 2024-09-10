/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateStore, MigrateStore } from './ZustyStoreHelper';

/**
 * Each migration plan entry is 1 version step.
 */
export function createZustyMigrate<Store>(
  _createStore: CreateStore<Store>,
  firstVersion: number,
  currentVersion: number,
  migrationPlan: Array<MigrateStore<any>>
): MigrateStore<Store> {
  const totalVersions = currentVersion - firstVersion;
  if (migrationPlan.length < totalVersions) {
    throw new Error(
      `Not enough steps in store migration plan - need ${
        totalVersions - migrationPlan.length
      } more steps to support v${firstVersion} to v${currentVersion}`
    );
  }
  return async function migrateStore(
    oldStore: object,
    oldVersion: number,
    newVersion: number
  ): Promise<Store> {
    const oldIndex = oldVersion - firstVersion;
    if (oldIndex < 0) {
      // The old version is BEFORE the first supported version. We cannot migrate.
      throw new Error(
        `Cannot migrate store from older, unsupported version v${oldVersion} - earliest version supported is v${firstVersion}`
      );
    }
    const newIndex = newVersion - firstVersion - 1;
    if (newIndex >= migrationPlan.length) {
      // The new version is AFTER the last supported version. We cannot migrate.
      throw new Error(
        `Cannot migrate store to newer, unsupported version v${newVersion} - latest version supported is v${currentVersion}`
      );
    }
    // Do all the migrations...
    const prevStore = oldStore;
    let newStore = oldStore;
    for (let i = oldIndex; i <= newIndex; ++i) {
      const migration = migrationPlan[i];
      const prevVersion = i + firstVersion;
      const nextVersion = prevVersion + 1;
      const result = await migration(prevStore, prevVersion, nextVersion);
      if (typeof result !== 'object') {
        throw new Error('Migration result cannot be a non-object store.');
      }
      newStore = result;
    }
    // ...and now this should be a good store.
    return newStore as Store;
  };
}
