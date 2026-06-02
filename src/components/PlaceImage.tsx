import { useState } from 'react';
import type { Place } from '../data/types';
import PlaceholderImage from './PlaceholderImage';

interface PlaceImageProps {
  place: Place;
}

export default function PlaceImage({ place }: PlaceImageProps) {
  const [failed, setFailed] = useState(false);

  const placeholder = (
    <PlaceholderImage
      nameEn={place.nameEn}
      nameRu={place.nameRu}
      city={place.city}
      slug={place.slug}
    />
  );

  if (!place.photo || failed) {
    return placeholder;
  }

  const src = import.meta.env.BASE_URL + place.photo;

  return (
    <img
      src={src}
      alt={`${place.nameEn} — ${place.nameRu}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-video w-full object-cover"
    />
  );
}
