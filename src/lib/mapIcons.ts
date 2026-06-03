import L from 'leaflet';
import type { CityId } from '../data/types';
import { CITY_ACCENT } from './tags';

const DAYTRIP_COLOR = '#d97706';
const DAYTRIP_BORDER = '#b45309';

export const CITY_CENTER: Record<CityId, [number, number]> = {
  osaka: [34.6687, 135.5013],
  kyoto: [35.0116, 135.7681],
  tokyo: [35.6762, 139.6503],
};

const pinHtml = (fill: string, border: string, dimmed: boolean) =>
  `<span class="city-pin${dimmed ? ' city-pin--dim' : ''}" style="--pin-fill:${fill};--pin-border:${border}"></span>`;

export const placeIcon = (
  city: CityId,
  isDayTrip: boolean,
  dimmed = false,
): L.DivIcon => {
  const fill = isDayTrip ? DAYTRIP_COLOR : CITY_ACCENT[city].bg;
  const border = isDayTrip ? DAYTRIP_BORDER : CITY_ACCENT[city].border;
  const size = dimmed ? 15 : 22;
  return L.divIcon({
    className: 'city-pin-wrapper',
    html: pinHtml(fill, border, dimmed),
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
