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

export const useWorldStore = createPersistantStoreAndDispatch(
  createStore,
  createDispatch,
  migrateStore,
  'worldV1',
  1
);

export const useWorldDispatch = extractDispatch(useWorldStore);
export const useGetWorldStore = extractGetStore(useWorldStore);
