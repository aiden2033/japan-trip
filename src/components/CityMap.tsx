import '../lib/leaflet-setup';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { CityId, Place } from '../data/types';
import type { LatLng } from '../lib/geo';
import { haversineKm } from '../lib/geo';
import { formatHours } from '../lib/tags';
import { CITY_CENTER, placeIcon, userIcon } from '../lib/mapIcons';
import { googleMapsMultiDir, MAX_GOOGLE_MAPS_ROUTE_POINTS } from '../lib/nav';
import { placeKey, useVisited } from '../lib/useStoredSet';
import PlaceImage from './PlaceImage';
import PlaceToggles from './PlaceToggles';
import TagChip from './TagChip';

interface CityMapProps {
  city: CityId;
  cityPlaces: Place[];
  dayTripPlaces: Place[];
  onOpen: (slug: string) => void;
  userPosition?: LatLng | null;
}

const USER_BOUNDS_RADIUS_KM = 50;

interface AccessibleMarkerProps {
  children: ReactNode;
  icon: L.Icon | L.DivIcon;
  keyboard?: boolean;
  label: string;
  position: [number, number];
  zIndexOffset?: number;
}

function AccessibleMarker({
  children,
  icon,
  keyboard,
  label,
  position,
  zIndexOffset,
}: AccessibleMarkerProps) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    const element = markerRef.current?.getElement();
    if (!element) return;

    element.setAttribute('aria-label', label);
    element.setAttribute('title', label);
    element.setAttribute('alt', label);
  });

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      keyboard={keyboard}
      title={label}
      alt={label}
      zIndexOffset={zIndexOffset}
    >
      {children}
    </Marker>
  );
}

function FitBounds({ points, userPoint }: { points: Place[]; userPoint: LatLng | null }) {
  const map = useMap();
  const key = points
    .filter((p) => p.coords)
    .map((p) => placeKey(p))
    .sort()
    .join(',');
  const userKey = userPoint ? `${userPoint.lat.toFixed(3)},${userPoint.lng.toFixed(3)}` : '';

  useEffect(() => {
    const coords: [number, number][] = points
      .filter((p) => p.coords)
      .map((p) => [p.coords!.lat, p.coords!.lng]);
    if (userPoint) coords.push([userPoint.lat, userPoint.lng]);
    if (coords.length === 0) return;
    if (coords.length === 1) {
      map.setView(coords[0], 14);
      return;
    }
    map.fitBounds(L.latLngBounds(coords), { padding: [48, 48], maxZoom: 14 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, userKey, map]);

  return null;
}

function MapPopupCard({ place, onOpen }: { place: Place; onOpen: (slug: string) => void }) {
  return (
    <div className="w-52 text-left">
      <div className="overflow-hidden rounded-lg">
        <PlaceImage place={place} />
      </div>
      <h3 className="mt-2 text-sm font-bold text-slate-900">{place.nameRu}</h3>
      <p className="text-xs text-slate-500">{place.nameEn}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {place.tags.map((t) => (
          <TagChip key={t} tag={t} />
        ))}
      </div>
      <p className="mt-1 text-xs font-medium text-slate-600">
        ⏱ {formatHours(place.timeEstimateHours)}
      </p>
      <div className="mt-2">
        <PlaceToggles place={place} variant="detail" />
      </div>
      <button
        type="button"
        onClick={() => onOpen(place.slug)}
        className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-slate-800 px-3 text-xs font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        Подробнее →
      </button>
    </div>
  );
}

function TilesPlaceholder() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[900] flex justify-center p-2">
      <span className="pointer-events-auto rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-600 shadow">
        🗺️ Карта недоступна офлайн — штырьки и список работают
      </span>
    </div>
  );
}

const markerLabel = (place: Place): string => {
  const label = `${place.nameRu} (${place.nameEn})`;
  return place.isDayTrip ? `${label}, выездной пункт` : label;
};

const routeLinkTitle = (totalPoints: number, routePoints: number): string => {
  if (totalPoints === 1) return 'Открыть единственную видимую точку в Google Maps';
  if (totalPoints > routePoints) {
    return `Открыть маршрут по первым ${routePoints} из ${totalPoints} видимых точек в Google Maps`;
  }
  return `Открыть маршрут по ${routePoints} видимым точкам в Google Maps`;
};

export default function CityMap({ city, cityPlaces, dayTripPlaces, onOpen, userPosition }: CityMapProps) {
  const [tilesFailed, setTilesFailed] = useState(false);
  const visited = useVisited();

  const cityPts = useMemo(() => cityPlaces.filter((p) => p.coords), [cityPlaces]);
  const dayTripPts = useMemo(() => dayTripPlaces.filter((p) => p.coords), [dayTripPlaces]);
  const visiblePoints = useMemo(
    () => [...cityPts, ...dayTripPts],
    [cityPts, dayTripPts],
  );
  const routePoints = useMemo(
    () => visiblePoints.slice(0, MAX_GOOGLE_MAPS_ROUTE_POINTS),
    [visiblePoints],
  );
  const routeHref = useMemo(
    () => googleMapsMultiDir(routePoints.map((p) => p.coords!), 'walking'),
    [routePoints],
  );
  const routeLabel = routeLinkTitle(visiblePoints.length, routePoints.length);

  const nearUser = useMemo(() => {
    if (!userPosition) return null;
    const [lat, lng] = CITY_CENTER[city];
    return haversineKm(userPosition, { lat, lng }) <= USER_BOUNDS_RADIUS_KM ? userPosition : null;
  }, [userPosition, city]);

  if (visiblePoints.length === 0) {
    return (
      <div className="flex h-[60vh] min-h-[360px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-center text-sm text-slate-500">
        Ни у одного места под выбранный фильтр нет точки на карте.
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <MapContainer
        center={CITY_CENTER[city]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: '#e2e8f0' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            tileerror: () => setTilesFailed(true),
            tileload: () => setTilesFailed(false),
          }}
        />
        <FitBounds points={visiblePoints} userPoint={nearUser} />
        {nearUser && (
          <AccessibleMarker
            position={[nearUser.lat, nearUser.lng]}
            icon={userIcon()}
            zIndexOffset={1000}
            label="Вы здесь"
            keyboard={false}
          >
            <Popup>
              <span className="text-xs font-semibold text-slate-700">📍 Вы здесь</span>
            </Popup>
          </AccessibleMarker>
        )}
        {visiblePoints.map((p) => (
          <AccessibleMarker
            key={placeKey(p)}
            position={[p.coords!.lat, p.coords!.lng]}
            icon={placeIcon(city, Boolean(p.isDayTrip), visited.has(p))}
            label={markerLabel(p)}
            keyboard
          >
            <Popup minWidth={208} maxWidth={224}>
              <MapPopupCard place={p} onOpen={onOpen} />
            </Popup>
          </AccessibleMarker>
        ))}
      </MapContainer>

      {routeHref && (
        <a
          href={routeHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={routeLabel}
          title={routeLabel}
          className="absolute bottom-3 left-3 z-[900] inline-flex min-h-[44px] max-w-[calc(100%-1.5rem)] items-center rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Маршрут по точкам
        </a>
      )}

      {tilesFailed && <TilesPlaceholder />}
    </div>
  );
}
