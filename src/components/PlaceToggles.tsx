import type { MouseEvent } from 'react';
import type { Place } from '../data/types';
import { useFavorites, useVisited } from '../lib/useStoredSet';

interface PlaceTogglesProps {
  place: Place;
  variant?: 'card' | 'detail';
}

const stop = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

export default function PlaceToggles({ place, variant = 'card' }: PlaceTogglesProps) {
  const favorites = useFavorites();
  const visited = useVisited();

  const isFav = favorites.has(place);
  const isVisited = visited.has(place);

  const size = variant === 'detail' ? 'h-11 px-4 text-sm gap-1.5' : 'min-h-[44px] min-w-[44px] px-3 text-sm gap-1';
  const base = `inline-flex items-center justify-center rounded-full border font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${size}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        aria-pressed={isFav}
        aria-label={isFav ? 'Убрать из избранного' : 'В избранное'}
        onClick={(e) => {
          stop(e);
          favorites.toggle(place);
        }}
        className={`${base} ${
          isFav
            ? 'border-rose-300 bg-rose-50 text-rose-600'
            : 'border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:text-rose-500'
        }`}
      >
        <span aria-hidden="true">{isFav ? '❤️' : '♡'}</span>
        {variant === 'detail' && <span>{isFav ? 'В избранном' : 'В избранное'}</span>}
      </button>

      <button
        type="button"
        aria-pressed={isVisited}
        aria-label={isVisited ? 'Отметить как непосещённое' : 'Отметить как посещённое'}
        onClick={(e) => {
          stop(e);
          visited.toggle(place);
        }}
        className={`${base} ${
          isVisited
            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
            : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
        }`}
      >
        <span aria-hidden="true">✓</span>
        {variant === 'detail' && <span>{isVisited ? 'Посещено' : 'Посетить'}</span>}
      </button>
    </div>
  );
}
