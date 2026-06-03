export type Tag =
  | 'morning' | 'food' | 'temple-shrine' | 'nature' | 'view'
  | 'shopping' | 'nightlife' | 'museum' | 'walk' | 'day-trip'
  | 'castle' | 'tickets-ahead' | 'low-mobility' | 'cafe' | 'anime';

export type CityId = 'osaka' | 'kyoto' | 'tokyo';

export interface Place {
  slug: string;
  nameEn: string;
  nameRu: string;
  city: CityId;
  tags: Tag[];
  timeEstimateHours: [number, number];
  bestTime?: string;
  summary?: string;
  description: string;
  mapsQuery: string;
  coords?: { lat: number; lng: number };
  photo?: string;
  isDayTrip?: boolean;
  dayTripGroup?: string;
  incompatibleWith?: string[];
  combinesWith?: string[];
  note?: string;
  anime?: string[];
  foodSpot?: boolean;
}

export interface StayArea { area: string; why: string; }

export interface CityMeta {
  id: CityId;
  nameEn: string;
  nameRu: string;
  nights: number;
  intro: string;
  stay: StayArea[];
  tips: string[];
}

export interface DayTripGroup { id: string; label: string; note?: string; }

export interface TripMeta {
  route: string;
  dates: string;
  summary: string;
  globalTips: string[];
  departure: string[];
}
