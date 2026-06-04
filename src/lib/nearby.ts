import type { CityId, Place } from '../data/types';
import { haversineKm, type LatLng } from './geo';

interface NearbyOptions {
  sameCity?: CityId;
  excludeSlug?: string;
  limit?: number;
  maxKm?: number;
  includeDayTrips?: boolean;
}

export interface NearbyResult {
  place: Place;
  km: number;
}

export const nearbyPlaces = (
  origin: LatLng,
  list: Place[],
  opts: NearbyOptions = {},
): NearbyResult[] => {
  const { sameCity, excludeSlug, limit = 4, maxKm, includeDayTrips = false } = opts;

  return list
    .filter((place) => {
      if (!place.coords) return false;
      if (place.slug === excludeSlug) return false;
      if (sameCity && place.city !== sameCity) return false;
      if (!includeDayTrips && place.isDayTrip) return false;
      return true;
    })
    .map((place) => ({ place, km: haversineKm(origin, place.coords as LatLng) }))
    .filter(({ km }) => maxKm === undefined || km <= maxKm)
    .sort((a, b) => a.km - b.km)
    .slice(0, limit);
};
