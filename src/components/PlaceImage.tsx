import { useEffect, useMemo, useState } from 'react';
import type { Place } from '../data/types';
import PlaceholderImage from './PlaceholderImage';

interface PlaceImageProps {
  place: Place;
}

export default function PlaceImage({ place }: PlaceImageProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = useMemo(
    () => [
      place.remotePhoto,
      place.photo ? import.meta.env.BASE_URL + place.photo : undefined,
    ].filter((src): src is string => Boolean(src)),
    [place.photo, place.remotePhoto],
  );

  useEffect(() => {
    setSourceIndex(0);
  }, [place.slug, sources]);

  const placeholder = (
    <PlaceholderImage
      nameEn={place.nameEn}
      nameRu={place.nameRu}
      city={place.city}
      slug={place.slug}
    />
  );

  const src = sources[sourceIndex];

  if (!src) {
    return placeholder;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
      <img
        src={src}
        alt={`${place.nameEn} — ${place.nameRu}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setSourceIndex((value) => Math.min(value + 1, sources.length))}
        className="h-full w-full object-cover"
      />
      {place.remotePhoto && src === place.remotePhoto && place.photoCredit && (
        <span className="pointer-events-none absolute bottom-1 right-1 max-w-[75%] truncate rounded-full bg-slate-950/65 px-1.5 py-0.5 text-[10px] font-medium text-white">
          Фото: {place.photoCredit}
        </span>
      )}
    </div>
  );
}
