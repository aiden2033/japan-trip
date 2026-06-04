import type { LatLng } from './geo';

type TravelMode = 'walking' | 'transit' | 'driving';

const destination = (dest: LatLng | string): string =>
  typeof dest === 'string'
    ? encodeURIComponent(dest)
    : `${dest.lat},${dest.lng}`;

export const googleMapsDir = (dest: LatLng | string, mode: TravelMode): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${destination(dest)}&travelmode=${mode}`;

export const geoUri = (coords: LatLng, label?: string): string => {
  const point = `${coords.lat},${coords.lng}`;
  const suffix = label ? `(${encodeURIComponent(label)})` : '';
  return `geo:${point}?q=${point}${suffix}`;
};
