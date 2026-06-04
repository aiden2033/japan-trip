import { useSyncExternalStore } from 'react';
import type { Place } from '../data/types';

export const placeKey = (place: Pick<Place, 'city' | 'slug'>): string =>
  `${place.city}:${place.slug}`;

export const SCHEMA_VERSION = 1;
const SCHEMA_KEY = 'jt:schema';

const markSchema = (): void => {
  try {
    if (localStorage.getItem(SCHEMA_KEY) === null) {
      localStorage.setItem(SCHEMA_KEY, String(SCHEMA_VERSION));
    }
  } catch {
    // localStorage unavailable (private mode / quota) — schema marker is best-effort only.
  }
};

const read = (storageKey: string): Set<string> => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((v): v is string => typeof v === 'string')) : new Set();
  } catch {
    return new Set();
  }
};

const persist = (storageKey: string, set: Set<string>): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...set]));
  } catch {
    // localStorage unavailable (private mode / quota) — keep state in memory only.
  }
};

interface Store {
  snapshot: Set<string>;
  listeners: Set<() => void>;
}

const stores = new Map<string, Store>();

const getStore = (storageKey: string): Store => {
  let store = stores.get(storageKey);
  if (!store) {
    markSchema();
    store = { snapshot: read(storageKey), listeners: new Set() };
    stores.set(storageKey, store);
  }
  return store;
};

const emit = (store: Store): void => store.listeners.forEach((l) => l());

const toggleKey = (storageKey: string, key: string): void => {
  const store = getStore(storageKey);
  const next = new Set(store.snapshot);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  store.snapshot = next;
  persist(storageKey, next);
  emit(store);
};

export interface StoredSet {
  items: Set<string>;
  count: number;
  has: (place: Pick<Place, 'city' | 'slug'>) => boolean;
  toggle: (place: Pick<Place, 'city' | 'slug'>) => void;
}

export const useStoredSet = (storageKey: string): StoredSet => {
  const store = getStore(storageKey);
  const items = useSyncExternalStore(
    (listener) => {
      store.listeners.add(listener);
      return () => store.listeners.delete(listener);
    },
    () => store.snapshot,
    () => store.snapshot,
  );

  return {
    items,
    count: items.size,
    has: (place) => items.has(placeKey(place)),
    toggle: (place) => toggleKey(storageKey, placeKey(place)),
  };
};

export const FAVORITES_KEY = 'jt:favorites';
export const VISITED_KEY = 'jt:visited';

export const useFavorites = (): StoredSet => useStoredSet(FAVORITES_KEY);
export const useVisited = (): StoredSet => useStoredSet(VISITED_KEY);
