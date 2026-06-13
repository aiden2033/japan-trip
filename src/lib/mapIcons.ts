import L from 'leaflet';
import type { CityId } from '../data/types';
import { CITY_ACCENT } from './tags';

const DAYTRIP_COLOR = '#d97706';
const DAYTRIP_BORDER = '#b45309';
const FRIENDS_COLOR = '#10b981';
const FRIENDS_BORDER = '#047857';
const NASTYA_COLOR = '#facc15';
const NASTYA_BORDER = '#ca8a04';

export const CITY_CENTER: Record<CityId, [number, number]> = {
  osaka: [34.6687, 135.5013],
  kyoto: [35.0116, 135.7681],
  tokyo: [35.6762, 139.6503],
  other: [35.2, 136.9],
};

const pinHtml = (fill: string, border: string, dimmed: boolean, emoji?: string) =>
  `<span class="city-pin-shell" style="--pin-emoji-size:${dimmed ? '10px' : '13px'}"><span class="city-pin${dimmed ? ' city-pin--dim' : ''}" style="--pin-fill:${fill};--pin-border:${border}"></span>${emoji ? `<span class="city-pin-emoji" aria-hidden="true">${emoji}</span>` : ''}</span>`;

export const placeIcon = (
  city: CityId,
  isDayTrip: boolean,
  dimmed = false,
  emoji?: string,
  isNastya = false,
): L.DivIcon => {
  const fill = isNastya ? NASTYA_COLOR : isDayTrip ? DAYTRIP_COLOR : CITY_ACCENT[city].bg;
  const border = isNastya ? NASTYA_BORDER : isDayTrip ? DAYTRIP_BORDER : CITY_ACCENT[city].border;
  const size = dimmed ? 15 : 22;
  return L.divIcon({
    className: 'city-pin-wrapper',
    html: pinHtml(fill, border, dimmed, emoji),
    iconSize: [size, size],
    iconAnchor: [Math.round(size / 2), size],
    popupAnchor: [0, -size],
  });
};

export const userIcon = (): L.DivIcon =>
  L.divIcon({
    className: 'user-dot-wrapper',
    html: '<span class="user-dot"></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });

export const friendsPlaceIcon = (emoji?: string): L.DivIcon =>
  L.divIcon({
    className: 'city-pin-wrapper',
    html: pinHtml(FRIENDS_COLOR, FRIENDS_BORDER, false, emoji),
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22],
  });
