import { useMemo, useState } from 'react';
import {
  tripEvents,
  tripEventsCheckedAt,
  type TripEvent,
  type TripEventCategory,
  type TripEventSourceKind,
} from '../data/events';

type CategoryFilter = TripEventCategory | 'all' | 'nonMusic' | 'top';
type CityFilter = 'all' | 'tokyo' | 'osaka' | 'kyoto' | 'yokohama';

const categoryFilters: { id: CategoryFilter; icon: string; label: string }[] = [
  { id: 'all', icon: '🗓️', label: 'Все' },
  { id: 'top', icon: '⭐', label: 'Лучшие' },
  { id: 'music', icon: '🎵', label: 'Концерты' },
  { id: 'nonMusic', icon: '🎭', label: 'Не музыка' },
  { id: 'art', icon: '🖼️', label: 'Выставки' },
  { id: 'sport', icon: '⚾', label: 'Спорт' },
  { id: 'festival', icon: '🏮', label: 'Matsuri' },
  { id: 'expo', icon: '🎮', label: 'Expo' },
];

const cityFilters: { id: CityFilter; label: string }[] = [
  { id: 'all', label: 'Все города' },
  { id: 'tokyo', label: 'Tokyo area' },
  { id: 'osaka', label: 'Osaka' },
  { id: 'kyoto', label: 'Kyoto' },
  { id: 'yokohama', label: 'Yokohama' },
];

const categoryLabel: Record<TripEventCategory, string> = {
  music: 'концерт',
  festival: 'событие',
  art: 'выставка',
  sport: 'спорт',
  expo: 'expo',
};

const categoryClass: Record<TripEventCategory, string> = {
  music: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800',
  festival: 'border-amber-200 bg-amber-50 text-amber-900',
  art: 'border-sky-200 bg-sky-50 text-sky-800',
  sport: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  expo: 'border-violet-200 bg-violet-50 text-violet-800',
};

const sourceKindLabel: Record<TripEventSourceKind, string> = {
  official: 'официально',
  promoter: 'промоутер',
  ticket: 'билеты',
  guide: 'гайд',
};

const formatDateHeading = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  }).format(new Date(`${date}T12:00:00+09:00`));

const eventTime = (event: TripEvent) =>
  event.time ? event.time : event.dateEnd ? event.dateLabel : 'время уточнить';

const cityMatches = (event: TripEvent, city: CityFilter) => {
  if (city === 'all') return true;
  return `${event.city} ${event.area ?? ''}`.toLowerCase().includes(city);
};

const categoryMatches = (event: TripEvent, category: CategoryFilter) => {
  if (category === 'all') return true;
  if (category === 'top') return event.priority === 'top';
  if (category === 'nonMusic') return event.category !== 'music';
  return event.category === category;
};

export default function Events() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [city, setCity] = useState<CityFilter>('all');

  const visibleEvents = useMemo(
    () =>
      tripEvents
        .filter((event) => categoryMatches(event, category))
        .filter((event) => cityMatches(event, city))
        .sort((a, b) => a.dateStart.localeCompare(b.dateStart) || a.title.localeCompare(b.title)),
    [category, city],
  );

  const groups = useMemo(() => {
    const map = new Map<string, TripEvent[]>();
    visibleEvents.forEach((event) => {
      const list = map.get(event.dateStart) ?? [];
      list.push(event);
      map.set(event.dateStart, list);
    });
    return [...map.entries()];
  }, [visibleEvents]);

  const musicCount = tripEvents.filter((event) => event.category === 'music').length;
  const nonMusicCount = tripEvents.length - musicCount;
  const topCount = tripEvents.filter((event) => event.priority === 'top').length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-3 py-4">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              30 августа - 12 сентября 2026
            </p>
            <h1 className="text-xl font-extrabold leading-tight text-slate-900">
              Концерты и события
            </h1>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            сверено {tripEventsCheckedAt}
          </span>
        </div>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          Календарь по маршруту Осака → Киото → Токио: концерты, matsuri, выставки,
          спорт и expo. Цены и продажи быстро меняются, поэтому у каждой карточки есть источник.
        </p>

        <div className="grid grid-cols-3 gap-2">
          <StatBox label="концертов" value={musicCount} />
          <StatBox label="не музыка" value={nonMusicCount} />
          <StatBox label="топ" value={topCount} />
        </div>
      </header>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
        Для японских концертов часто нужны лотереи, ePlus/Pia, японский номер или официальный
        overseas-lottery. Перед оплатой сверяй имя, приложение для входа, запрет ресейла и погоду
        для стадионов.
      </section>

      <div className="sticky top-[61px] z-20 -mx-3 border-b border-slate-200 bg-white/95 px-3 pb-2 pt-2 backdrop-blur md:static md:mx-0 md:rounded-xl md:border md:bg-white">
        <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryFilters.map((filter) => (
            <FilterChip
              key={filter.id}
              active={category === filter.id}
              icon={filter.icon}
              label={filter.label}
              onClick={() => setCategory(filter.id)}
            />
          ))}
        </div>

        <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cityFilters.map((filter) => (
            <CityChip
              key={filter.id}
              active={city === filter.id}
              label={filter.label}
              onClick={() => setCity(filter.id)}
            />
          ))}
        </div>
      </div>

      {groups.length > 0 ? (
        <div className="flex flex-col gap-5">
          {groups.map(([date, events]) => (
            <section key={date} className="flex flex-col gap-2.5">
              <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-1">
                <h2 className="text-base font-extrabold capitalize text-slate-900">
                  {formatDateHeading(date)}
                </h2>
                <span className="text-xs font-semibold text-slate-400">
                  {events.length} {events.length === 1 ? 'вариант' : 'вариантов'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <p className="text-sm font-bold text-slate-700">Под такие фильтры событий нет</p>
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setCity('all');
            }}
            className="mt-3 inline-flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition active:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: number;
}

function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-lg font-extrabold leading-none text-slate-900 tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}

interface FilterChipProps {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}

function FilterChip({ active, icon, label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 active:bg-slate-100'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

interface CityChipProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function CityChip({ active, label, onClick }: CityChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[40px] shrink-0 items-center rounded-full border px-3 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
        active
          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
          : 'border-slate-200 bg-white text-slate-600 active:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );
}

interface EventCardProps {
  event: TripEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex gap-3 p-3">
        <EventImage event={event} />

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold ${categoryClass[event.category]}`}
            >
              {categoryLabel[event.category]}
            </span>
            {event.priority === 'top' && (
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-white">
                топ
              </span>
            )}
            {event.priority === 'sold-out' && (
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700">
                sold out
              </span>
            )}
          </div>

          <h3 className="text-base font-extrabold leading-tight text-slate-900">
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-500">
              {event.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border-y border-slate-100 bg-slate-100 text-xs">
        <InfoCell label="Дата" value={`${event.dateLabel} · ${eventTime(event)}`} />
        <InfoCell label="Город" value={event.city} hint={event.area} />
        <InfoCell label="Площадка" value={event.venue} />
        <InfoCell label="Цена" value={event.price ?? 'уточнить'} strong />
      </div>

      <div className="flex flex-col gap-2 p-3">
        <p className="text-xs font-semibold leading-relaxed text-slate-600">
          {event.style}
        </p>
        {event.note && (
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs leading-relaxed text-slate-600">
            {event.note}
          </p>
        )}

        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] w-fit max-w-full items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <span className="truncate">{event.sourceLabel}</span>
          <span className="shrink-0 text-[11px] font-semibold text-slate-400">
            {sourceKindLabel[event.sourceKind]}
          </span>
        </a>
      </div>
    </article>
  );
}

interface EventImageProps {
  event: TripEvent;
}

function EventImage({ event }: EventImageProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = [event.remoteImage, import.meta.env.BASE_URL + event.image].filter(Boolean);
  const src = sources[sourceIndex];

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-28">
      {src ? (
        <img
          src={src}
          alt={event.imageLabel}
          loading="lazy"
          onError={() => setSourceIndex((value) => Math.min(value + 1, sources.length))}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl" aria-hidden="true">
          🎟️
        </div>
      )}
      <span className="absolute left-1.5 top-1.5 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-700 shadow-sm">
        {event.dateLabel}
      </span>
    </div>
  );
}

interface InfoCellProps {
  label: string;
  value: string;
  hint?: string;
  strong?: boolean;
}

function InfoCell({ label, value, hint, strong = false }: InfoCellProps) {
  return (
    <div className="min-w-0 bg-white p-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p
        className={`mt-0.5 line-clamp-2 leading-snug ${
          strong ? 'font-extrabold text-emerald-700' : 'font-semibold text-slate-800'
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-0.5 truncate text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}
