import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { Place } from '../data/types';

interface IncompatibleNoteProps {
  place: Place;
  places: Place[];
}

const resolveRefs = (slugs: string[] | undefined, places: Place[]): Place[] =>
  (slugs ?? [])
    .map((slug) => places.find((p) => p.slug === slug))
    .filter((ref): ref is Place => Boolean(ref));

const renderRefs = (refs: Place[]) =>
  refs.map((ref, i) => (
    <Fragment key={`${ref.city}/${ref.slug}`}>
      {i > 0 && ', '}
      <Link
        to={`/${ref.city}/${ref.slug}`}
        onClick={(e) => e.stopPropagation()}
        className="underline underline-offset-2 font-medium hover:opacity-80"
      >
        {ref.nameRu}
      </Link>
    </Fragment>
  ));

export default function IncompatibleNote({ place, places }: IncompatibleNoteProps) {
  const incompatible = resolveRefs(place.incompatibleWith, places);
  const combines = resolveRefs(place.combinesWith, places);

  if (incompatible.length === 0 && combines.length === 0) {
    return null;
  }

  return (
    <div className="space-y-0.5 text-xs leading-snug">
      {incompatible.length > 0 && (
        <p className="text-rose-600">
          ⚠ нельзя совмещать в один день с: {renderRefs(incompatible)}
        </p>
      )}
      {combines.length > 0 && (
        <p className="text-emerald-600">
          ✓ часто совмещают с: {renderRefs(combines)}
        </p>
      )}
    </div>
  );
}
