import { useMemo } from 'react';
import {
  tripDays,
  tripDayEvents,
  tripDayCount,
  tripStartDate,
  tripEndDate,
  tripRoute,
  daysBetween,
  type TripDayEvent,
  type TripDayEventCategory,
} from '../data/calendar';

const categoryMeta: Record<
  TripDayEventCategory,
  { icon: string; chip: string; accentCard: boolean }
> = {
  flight: { icon: '✈️', chip: 'border-emerald-200 bg-emerald-50 text-emerald-800', accentCard: true },
  transport: { icon: '🚄', chip: 'border-sky-200 bg-sky-50 text-sky-800', accentCard: false },
  hotel: { icon: '🏨', chip: 'border-violet-200 bg-violet-50 text-violet-800', accentCard: false },
  activity: { icon: '📍', chip: 'border-amber-200 bg-amber-50 text-amber-900', accentCard: false },
  food: { icon: '🍜', chip: 'border-rose-200 bg-rose-50 text-rose-800', accentCard: false },
  event: { icon: '🎉', chip: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800', accentCard: false },
  note: { icon: '📝', chip: 'border-slate-200 bg-slate-50 text-slate-700', accentCard: false },
};

// Logical order of events within a single day: arrival/transfer first,
// then hotel check-in, then activities/food, then loose notes.
const categoryRank: Record<TripDayEventCategory, number> = {
  flight: 0,
  transport: 1,
  hotel: 2,
  activity: 3,
  food: 3,
  event: 3,
  note: 4,
};

const atNoon = (date: string) => new Date(`${date}T12:00:00+09:00`);

const weekdayShort = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(atNoon(date)).toUpperCase();

const monthShort = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(atNoon(date)).replace('.', '');

const dayNumber = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { day: 'numeric' }).format(atNoon(date));

const monthLong = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' })
    .format(atNoon(date))
    .replace(/\s*г\.?$/, '');

const todayIso = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

interface MonthGroup {
  key: string;
  label: string;
  days: string[];
}

export default function Calendar() {
  const today = todayIso();

  const months = useMemo<MonthGroup[]>(() => {
    const map = new Map<string, MonthGroup>();
    tripDays().forEach((date) => {
      const key = date.slice(0, 7);
      const group = map.get(key) ?? { key, label: monthLong(date), days: [] };
      group.days.push(date);
      map.set(key, group);
    });
    return [...map.values()];
  }, []);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, TripDayEvent[]>();
    tripDayEvents.forEach((event) => {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    });
    // Stable sort keeps the authoring order from `tripDayEvents` as the final
    // tie-breaker, so same-category events stay in the order they were written.
    map.forEach((list) =>
      list.sort((a, b) => {
        const byCategory = categoryRank[a.category] - categoryRank[b.category];
        if (byCategory !== 0) return byCategory;
        if (a.time && b.time) return a.time.localeCompare(b.time);
        return 0;
      }),
    );
    return map;
  }, []);

  const countdown = useMemo(() => {
    if (today < tripStartDate) return `до старта ${daysBetween(today, tripStartDate)} дн.`;
    if (today > tripEndDate) return 'поездка завершена';
    return `идёт · день ${daysBetween(tripStartDate, today) + 1} из ${tripDayCount}`;
  }, [today]);

  const plannedCount = tripDayEvents.length;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 py-4">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{tripRoute}</p>
            <h1 className="text-xl font-extrabold leading-tight text-slate-900">Календарь поездки</h1>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            {countdown}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatBox label="дней" value={tripDayCount} />
          <StatBox label="событий" value={plannedCount} />
          <StatBox label="города" value={3} />
        </div>

        <p className="text-sm leading-relaxed text-slate-600">
          {`${dayNumber(tripStartDate)} ${monthShort(tripStartDate)} — ${dayNumber(tripEndDate)} ${monthShort(tripEndDate)} 2026`}.
          Прилёт и вылет уже отмечены, остальные дни заполняем по ходу планирования.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        {months.map((month) => (
          <section key={month.key} className="flex flex-col gap-1">
            <h2 className="sticky top-[61px] z-10 -mx-3 bg-slate-50/95 px-3 py-1.5 text-sm font-extrabold capitalize text-slate-900 backdrop-blur">
              {month.label}
            </h2>

            <ol className="flex flex-col">
              {month.days.map((date, indexInMonth) => {
                const isLastOverall =
                  month.key === months[months.length - 1].key &&
                  indexInMonth === month.days.length - 1;
                return (
                  <DayRow
                    key={date}
                    date={date}
                    events={eventsByDay.get(date) ?? []}
                    isToday={date === today}
                    tripDayIndex={daysBetween(tripStartDate, date) + 1}
                    showRail={!isLastOverall}
                  />
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

interface DayRowProps {
  date: string;
  events: TripDayEvent[];
  isToday: boolean;
  tripDayIndex: number;
  showRail: boolean;
}

function DayRow({ date, events, isToday, tripDayIndex, showRail }: DayRowProps) {
  const hasEvents = events.length > 0;
  const accent = events.some((event) => categoryMeta[event.category].accentCard);

  return (
    <li className="flex gap-3">
      <div className="flex w-12 shrink-0 flex-col items-center">
        <div
          className={`flex w-full flex-col items-center rounded-xl border py-1.5 ${
            accent
              ? 'border-emerald-300 bg-emerald-50'
              : isToday
                ? 'border-slate-900 bg-slate-900'
                : 'border-slate-200 bg-white'
          }`}
        >
          <span
            className={`text-[10px] font-bold leading-none ${
              isToday && !accent ? 'text-slate-300' : 'text-slate-400'
            }`}
          >
            {weekdayShort(date)}
          </span>
          <span
            className={`text-lg font-extrabold leading-tight ${
              isToday && !accent ? 'text-white' : 'text-slate-900'
            }`}
          >
            {dayNumber(date)}
          </span>
          <span
            className={`text-[9px] font-semibold leading-none ${
              isToday && !accent ? 'text-slate-300' : 'text-slate-400'
            }`}
          >
            {monthShort(date)}
          </span>
        </div>
        {showRail && <div className="my-1 w-px flex-1 bg-slate-200" />}
      </div>

      <div className={`min-w-0 flex-1 ${showRail ? 'pb-3' : ''}`}>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-xs font-semibold text-slate-400">
            День {tripDayIndex} из {tripDayCount}
          </span>
          {isToday && (
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
              сегодня
            </span>
          )}
        </div>

        {hasEvents ? (
          <div className="mt-1.5 flex flex-col gap-2">
            {events.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-1.5 rounded-xl border border-dashed border-slate-200 px-3 py-2 text-xs font-medium text-slate-400">
            Свободный день
          </p>
        )}
      </div>
    </li>
  );
}

interface EventRowProps {
  event: TripDayEvent;
}

function EventRow({ event }: EventRowProps) {
  const meta = categoryMeta[event.category];
  return (
    <article
      className={`flex items-start gap-2.5 rounded-xl border px-3 py-2 shadow-sm ${
        meta.accentCard ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200 bg-white'
      }`}
    >
      <span aria-hidden="true" className="text-xl leading-none">
        {meta.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {event.time && (
            <span className="text-sm font-extrabold tabular-nums text-slate-900">{event.time}</span>
          )}
          <span className="text-sm font-bold text-slate-900">{event.title}</span>
        </div>
        {event.detail && (
          <p className="mt-0.5 text-xs leading-snug text-slate-500">{event.detail}</p>
        )}
        {event.city && (
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${meta.chip}`}
          >
            {event.city}
          </span>
        )}
      </div>
    </article>
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
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}
