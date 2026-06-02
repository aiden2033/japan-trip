import { useEffect, useMemo } from 'react';
import type { Place } from '../data/types';
import { CITY_ACCENT, TAG_LABELS, formatHours } from '../lib/tags';
import { searchPlaces } from '../lib/search';

interface SearchOverlayProps {
  query: string;
  onClose: () => void;
  onSelect: (place: Place) => void;
}

export default function SearchOverlay({ query, onClose, onSelect }: SearchOverlayProps) {
  const results = useMemo(() => searchPlaces(query), [query]);
  const trimmed = query.trim();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Поиск мест"
      className="fixed inset-0 z-50 flex flex-col bg-white"
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-2">
        <span className="text-sm font-semibold text-slate-700">
          {trimmed.length < 2
            ? 'Поиск'
            : `Результаты: ${results.length}`}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть поиск"
          className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-full px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          ✕ Закрыть
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {trimmed.length < 2 ? (
          <p className="mt-8 text-center text-sm text-slate-500">
            Начни вводить название места, тег или город…
          </p>
        ) : results.length === 0 ? (
          <p className="mt-8 text-center text-sm text-slate-500">
            Ничего не найдено по запросу «{trimmed}».
            <br />
            Попробуй другое слово.
          </p>
        ) : (
          <ul className="mx-auto flex max-w-3xl flex-col gap-2">
            {results.map((place) => (
              <li key={`${place.city}-${place.slug}`}>
                <ResultRow place={place} onSelect={onSelect} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

interface ResultRowProps {
  place: Place;
  onSelect: (place: Place) => void;
}

function ResultRow({ place, onSelect }: ResultRowProps) {
  const accent = CITY_ACCENT[place.city];

  return (
    <button
      type="button"
      onClick={() => onSelect(place)}
      className="flex min-h-[44px] w-full flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: accent.bg, color: accent.text }}
        >
          {accent.name}
        </span>
        <span className="text-sm font-bold text-slate-900">{place.nameRu}</span>
        <span className="text-xs text-slate-500">{place.nameEn}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {place.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 whitespace-nowrap"
          >
            {TAG_LABELS[tag]}
          </span>
        ))}
      </div>

      <span className="text-xs font-medium text-slate-600">
        ⏱ {formatHours(place.timeEstimateHours)}
      </span>
    </button>
  );
}
