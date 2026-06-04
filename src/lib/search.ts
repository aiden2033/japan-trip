import Fuse from 'fuse.js';
import type { Place, Tag } from '../data/types';
import { places } from '../data/places';

const fuse = new Fuse(places, {
  keys: [
    { name: 'nameRu', weight: 3 },
    { name: 'nameEn', weight: 3 },
    { name: 'nameJa', weight: 2 },
    { name: 'tags', weight: 1 },
    { name: 'city', weight: 1 },
    { name: 'description', weight: 1 },
    { name: 'anime', weight: 0.5 },
    { name: 'note', weight: 0.3 },
    { name: 'bestTime', weight: 0.3 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

const SYNONYM_TAGS: Record<string, Tag> = {
  закат: 'view',
  панорама: 'view',
  смотровая: 'view',
  маття: 'cafe',
  латте: 'cafe',
  кофейня: 'cafe',
  такояки: 'food',
  рамен: 'food',
  окономияки: 'food',
  гастро: 'food',
  утро: 'morning',
  рассвет: 'morning',
  тории: 'temple-shrine',
  святилище: 'temple-shrine',
  замок: 'castle',
  аниме: 'anime',
  паломничество: 'anime',
};

export const searchPlaces = (query: string): Place[] => {
  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return [];
  }
  const results = fuse.search(trimmed).map((result) => result.item);
  if (results.length > 0) {
    return results;
  }
  const tag = SYNONYM_TAGS[trimmed.toLowerCase()];
  if (tag) {
    return places.filter((place) => place.tags.includes(tag));
  }
  return results;
};
