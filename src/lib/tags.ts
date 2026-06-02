import type { Tag, CityId } from '../data/types';

export const TAG_LABELS: Record<Tag, string> = {
  morning: '🌅 утро',
  food: '🍜 еда',
  'temple-shrine': '⛩️ храм',
  nature: '🌿 природа',
  view: '🌆 вид',
  shopping: '🛍️ шопинг',
  nightlife: '🌃 ночь',
  museum: '🖼️ музей',
  walk: '🚶 прогулка',
  'day-trip': '🚆 выезд',
  castle: '🏯 замок',
  'tickets-ahead': '🎫 билеты заранее',
  'low-mobility': '🧘 без подъёмов',
  cafe: '☕ кофе',
  anime: '🎎 аниме',
};

export interface CityAccent {
  bg: string;
  text: string;
  border: string;
  name: string;
}

export const CITY_ACCENT: Record<CityId, CityAccent> = {
  osaka: { bg: '#e11d48', text: '#ffffff', border: '#be123c', name: 'Осака' },
  kyoto: { bg: '#7c3aed', text: '#ffffff', border: '#6d28d9', name: 'Киото' },
  tokyo: { bg: '#2563eb', text: '#ffffff', border: '#1d4ed8', name: 'Токио' },
};

export const mapsUrl = (query: string): string =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);

export const formatHours = ([min, max]: [number, number]): string =>
  min === max ? `~${min} ч` : `${min}–${max} ч`;
