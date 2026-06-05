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
  еда: 'food',
  еду: 'food',
  ресторан: 'food',
  рестораны: 'food',
  закат: 'view',
  панорама: 'view',
  смотровая: 'view',
  вид: 'view',
  виды: 'view',
  кафе: 'cafe',
  кофе: 'cafe',
  маття: 'cafe',
  латте: 'cafe',
  кофейня: 'cafe',
  кофейни: 'cafe',
  такояки: 'food',
  рамен: 'food',
  окономияки: 'food',
  гастро: 'food',
  утро: 'morning',
  рассвет: 'morning',
  храм: 'temple-shrine',
  храмы: 'temple-shrine',
  тории: 'temple-shrine',
  святилище: 'temple-shrine',
  святилища: 'temple-shrine',
  замок: 'castle',
  замки: 'castle',
  аниме: 'anime',
  паломничество: 'anime',
};

const KNOWN_TAGS = new Set<Tag>(places.flatMap((place) => place.tags));

export const searchPlaces = (query: string): Place[] => {
  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return [];
  }
  const normalized = trimmed.toLowerCase();
  const directTag = SYNONYM_TAGS[normalized] ?? (KNOWN_TAGS.has(normalized as Tag) ? (normalized as Tag) : undefined);
  if (directTag) {
    return places.filter((place) => place.tags.includes(directTag));
  }
  const results = fuse.search(trimmed).map((result) => result.item);
  return results;
};
