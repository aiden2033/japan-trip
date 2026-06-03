import { useEffect, useRef, useState } from 'react';
import type { Place } from '../data/types';
import { formatHours, stampGlyph } from '../lib/tags';
import { formatDistance } from '../lib/geo';
import { useVisited } from '../lib/useStoredSet';
import PlaceImage from './PlaceImage';
import PlaceToggles from './PlaceToggles';
import Stamp from './Stamp';
import TagChip from './TagChip';
import DayTripBadge from './DayTripBadge';
import IncompatibleNote from './IncompatibleNote';

interface PlaceCardProps {
  place: Place;
  places: Place[];
  onOpen: (slug: string) => void;
  distanceKm?: number;
}

export default function PlaceCard({ place, places, onOpen, distanceKm }: PlaceCardProps) {
  const dayTrip = Boolean(place.isDayTrip);
  const isVisited = useVisited().has(place);

  // Animate the stamp only when this card transitions into the visited state.
  const prevVisited = useRef(isVisited);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (isVisited && !prevVisited.current) setAnimate(true);
    if (!isVisited) setAnimate(false);
    prevVisited.current = isVisited;
  }, [isVisited]);

  const frame = dayTrip
    ? 'border-amber-300 bg-amber-50/40'
    : 'border-slate-200 bg-white';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(place.slug)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.key === ' ') e.preventDefault();
          onOpen(place.slug);
        }
      }}
      className={`flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 ${frame} ${isVisited ? 'opacity-60' : ''}`}
    >
      <div className="relative">
        <PlaceImage place={place} />
        <div className="absolute right-2 top-2">
          <PlaceToggles place={place} />
        </div>
        {isVisited && (
          <span className="absolute left-2 top-2">
            <Stamp size="sm" glyph={stampGlyph(place)} animate={animate} />
          </span>
        )}
      </div>

      <div className="flex min-h-[44px] flex-col gap-2 p-3">
        <div>
          <h3 className="text-base font-bold leading-tight text-slate-900">
            {place.nameRu}
            {place.nameJa && (
              <span className="ml-1.5 align-middle text-xs font-medium text-slate-400">
                {place.nameJa}
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500">{place.nameEn}</p>
        </div>

        {(place.summary || place.description) && (
          <p className="text-sm leading-snug text-slate-600">
            {place.summary ?? place.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-1">
          {place.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-600">
            ⏱ {formatHours(place.timeEstimateHours)}
          </span>
          {distanceKm !== undefined && (
            <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700">
              📍 {formatDistance(distanceKm)}
            </span>
          )}
          {dayTrip && <DayTripBadge />}
        </div>

        <IncompatibleNote place={place} places={places} />
      </div>
    </div>
  );
}
