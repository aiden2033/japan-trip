import type { Place } from '../data/types';
import { formatHours } from '../lib/tags';
import PlaceImage from './PlaceImage';
import TagChip from './TagChip';
import DayTripBadge from './DayTripBadge';
import IncompatibleNote from './IncompatibleNote';

interface PlaceCardProps {
  place: Place;
  places: Place[];
  onOpen: (slug: string) => void;
}

export default function PlaceCard({ place, places, onOpen }: PlaceCardProps) {
  const dayTrip = Boolean(place.isDayTrip);
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
      className={`flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 ${frame}`}
    >
      <PlaceImage place={place} />

      <div className="flex min-h-[44px] flex-col gap-2 p-3">
        <div>
          <h3 className="text-base font-bold leading-tight text-slate-900">{place.nameRu}</h3>
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
          {dayTrip && <DayTripBadge />}
        </div>

        <IncompatibleNote place={place} places={places} />
      </div>
    </div>
  );
}
