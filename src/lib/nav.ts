import type { LatLng } from './geo';

type TravelMode = 'walking' | 'transit' | 'driving';

export const MAX_GOOGLE_MAPS_ROUTE_POINTS = 10;

const locationValue = (dest: LatLng | string): string =>
  typeof dest === 'string'
    ? dest
    : `${dest.lat},${dest.lng}`;

const destination = (dest: LatLng | string): string =>
  typeof dest === 'string'
    ? encodeURIComponent(dest)
    : `${dest.lat},${dest.lng}`;

export const googleMapsDir = (dest: LatLng | string, mode: TravelMode): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${destination(dest)}&travelmode=${mode}`;

export const googleMapsMultiDir = (
  points: LatLng[],
  mode: TravelMode,
  maxPoints = MAX_GOOGLE_MAPS_ROUTE_POINTS,
): string | null => {
  const routePoints = points
    .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng))
    .slice(0, Math.max(1, Math.floor(maxPoints)));

  if (routePoints.length === 0) return null;
  if (routePoints.length === 1) return googleMapsDir(routePoints[0], mode);

  const origin = routePoints[0];
  const destinationPoint = routePoints[routePoints.length - 1];
  const waypoints = routePoints.slice(1, -1);
  const params = new URLSearchParams({
    api: '1',
    origin: locationValue(origin),
    destination: locationValue(destinationPoint),
    travelmode: mode,
  });

  if (waypoints.length > 0) {
    params.set('waypoints', waypoints.map(locationValue).join('|'));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

export const geoUri = (coords: LatLng, label?: string): string => {
  const point = `${coords.lat},${coords.lng}`;
  const suffix = label ? `(${encodeURIComponent(label)})` : '';
  return `geo:${point}?q=${point}${suffix}`;
};
