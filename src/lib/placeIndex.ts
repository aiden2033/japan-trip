import type { Place } from '../data/types';
import { places } from '../data/places';
import { placeKey } from './useStoredSet';

export const placeByKey: Map<string, Place> = new Map(
  places.map((place) => [placeKey(place), place]),
);

export const getPlaceByKey = (key: string): Place | undefined => placeByKey.get(key);

export const isKnownPlaceKey = (key: string): boolean => placeByKey.has(key);

const toBase64Url = (s: string): string =>
  btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromBase64Url = (s: string): string => {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=');
  return decodeURIComponent(escape(atob(padded)));
};

// MUST stay slug-based ("city:slug"), never array-index-based: reordering places.ts
// must never break previously shared links or stored backups.
export const encodeKeys = (keys: Iterable<string>): string => {
  const sorted = [...new Set(keys)].sort();
  if (sorted.length === 0) return '';
  return toBase64Url(sorted.join(','));
};

export const decodeKeys = (s: string): string[] => {
  if (!s) return [];
  try {
    return fromBase64Url(s).split(',').filter((k) => k.length > 0);
  } catch {
    return [];
  }
};
