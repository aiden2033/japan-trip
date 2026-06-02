import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CityId, Place, Tag } from '../data/types';
import { CITY_ACCENT, TAG_LABELS, formatHours } from '../lib/tags';
import { searchPlaces } from '../lib/search';
import PlaceImage from './PlaceImage';

interface SearchOverlayProps {
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSelect: (place: Place) => void;
}

const CITY_SHORTCUTS: CityId[] = ['osaka', 'kyoto', 'tokyo'];
const POPULAR_TAGS: Tag[] = ['food', 'temple-shrine', 'view', 'walk', 'anime', 'castle'];

export default function SearchOverlay({ query, onQueryChange, onClose, onSelect }: SearchOverlayProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchPlaces(query), [query]);
  const trimmed = query.trim();
  const active = trimmed.length >= 2;

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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const goToCity = (city: CityId) => {
    onClose();
    navigate(`/${city}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Поиск мест"
      className="fixed inset-0 z-50 flex flex-col bg-slate-50"
    >
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2 px-4 py-3">
          <div className="relative flex-1">
            <label htmlFor="overlay-search" className="sr-only">
              Поиск места, тега или города
            </label>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400"
            >
              🔎
            </span>
            <input
              ref={inputRef}
              id="overlay-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Поиск места, тега или города…"
              className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 pl-11 pr-11 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            />
            {trimmed.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onQueryChange('');
                  inputRef.current?.focus();
                }}
                aria-label="Очистить запрос"
                className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть поиск"
            className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-full px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Закрыть
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 py-6">
          {!active ? (
            <EmptyState
              onCity={goToCity}
              onTag={(tag) => {
                onQueryChange(TAG_LABELS[tag].replace(/^\S+\s/, ''));
                inputRef.current?.focus();
              }}
            />
          ) : results.length === 0 ? (
            <NoResults query={trimmed} />
          ) : (
            <>
              <p className="mb-4 text-sm font-medium text-slate-500">
                {results.length === 1
                  ? 'Найдено 1 место'
                  : `Найдено ${results.length} ${plural(results.length)}`}
              </p>
              <ul className="flex flex-col gap-3">
                {results.map((place) => (
                  <li key={`${place.city}-${place.slug}`}>
                    <ResultRow place={place} onSelect={onSelect} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const plural = (n: number): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'место';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'места';
  return 'мест';
};

interface EmptyStateProps {
  onCity: (city: CityId) => void;
  onTag: (tag: Tag) => void;
}

function EmptyState({ onCity, onTag }: EmptyStateProps) {
  return (
    <div className="flex flex-col gap-8 pt-6">
      <div className="text-center">
        <div className="text-4xl" aria-hidden="true">🗾</div>
        <h2 className="mt-3 text-lg font-bold text-slate-900">Что ищем?</h2>
        <p className="mt-1 text-sm text-slate-500">
          Введи название места, тег или город — или начни с подсказок ниже.
        </p>
      </div>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Города
        </h3>
        <div className="flex flex-wrap gap-2">
          {CITY_SHORTCUTS.map((city) => {
            const accent = CITY_ACCENT[city];
            return (
              <button
                key={city}
                type="button"
                onClick={() => onCity(city)}
                className="inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-semibold shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                style={{ backgroundColor: accent.bg, color: accent.text }}
              >
                {accent.name}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Популярные теги
        </h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTag(tag)}
              className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              {TAG_LABELS[tag]}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-3 pt-16 text-center">
      <div className="text-4xl" aria-hidden="true">🔍</div>
      <p className="text-base font-semibold text-slate-700">
        Ничего не найдено по запросу «{query}»
      </p>
      <p className="max-w-sm text-sm text-slate-500">
        Попробуй другое слово, название по-английски или один из тегов — например «еда» или «храм».
      </p>
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
      className="flex min-h-[44px] w-full items-stretch gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      <div className="w-24 shrink-0 overflow-hidden rounded-xl sm:w-32">
        <PlaceImage place={place} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1 pr-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: accent.bg, color: accent.text }}
          >
            {accent.name}
          </span>
          <span className="text-sm font-bold text-slate-900">{place.nameRu}</span>
          <span className="truncate text-xs text-slate-500">{place.nameEn}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {place.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
            >
              {TAG_LABELS[tag]}
            </span>
          ))}
        </div>

        <span className="text-xs font-medium text-slate-600">
          ⏱ {formatHours(place.timeEstimateHours)}
        </span>
      </div>
    </button>
  );
}
