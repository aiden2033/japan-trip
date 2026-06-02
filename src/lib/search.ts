import Fuse from 'fuse.js';
import type { Place } from '../data/types';
import { places } from '../data/places';

const fuse = new Fuse(places, {
  keys: [
    { name: 'nameRu', weight: 3 },
    { name: 'nameEn', weight: 3 },
    { name: 'tags', weight: 1 },
    { name: 'city', weight: 1 },
    { name: 'description', weight: 1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export const searchPlaces = (query: string): Place[] => {
  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return [];
  }
  return fuse.search(trimmed).map((result) => result.item);
};
