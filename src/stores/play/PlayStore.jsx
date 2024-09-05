import {
  createPersistantStoreAndDispatch,
  createZustyDispatch,
  createZustyMigrate,
  extractDispatch,
  extractGetStore,
} from '@/libs/zusty';
import * as Dispatch from './Dispatch';
import { createStore } from './State';

const createDispatch = createZustyDispatch(Dispatch);
const migrateStore = createZustyMigrate(createStore, 1, 1, []);

export const usePlayStore = createPersistantStoreAndDispatch(
  createStore,
  createDispatch,
  migrateStore,
  'playV1',
  1
);

export const usePlayDispatch = extractDispatch(usePlayStore);
export const useGetPlayStore = extractGetStore(usePlayStore);
