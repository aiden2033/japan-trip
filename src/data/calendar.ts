// Trip calendar data. To add an event, append an entry to `tripDayEvents`
// with the `date` set to its day (YYYY-MM-DD). Empty days render automatically.

export type TripDayEventCategory =
  | 'flight'
  | 'transport'
  | 'hotel'
  | 'activity'
  | 'food'
  | 'event'
  | 'note';

export interface TripDayEvent {
  id: string;
  date: string;
  title: string;
  time?: string;
  detail?: string;
  city?: string;
  category: TripDayEventCategory;
}

export const tripStartDate = '2026-08-29';
export const tripEndDate = '2026-09-13';
export const tripRoute = 'Осака → Киото → Токио';

export const tripDayEvents: TripDayEvent[] = [
  {
    id: 'arrival',
    date: '2026-08-29',
    title: 'Прилёт в Японию',
    detail: 'Начало поездки.',
    category: 'flight',
  },
  {
    id: 'departure',
    date: '2026-09-13',
    time: '08:45',
    title: 'Вылет домой',
    detail: 'Рейс утром в 08:45 — выехать в аэропорт сильно заранее.',
    category: 'flight',
  },
];

const dayInMs = 24 * 60 * 60 * 1000;

const toUtc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

const toIso = (utc: number) => {
  const date = new Date(utc);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const tripDays = (): string[] => {
  const days: string[] = [];
  const last = toUtc(tripEndDate);
  for (let cur = toUtc(tripStartDate); cur <= last; cur += dayInMs) {
    days.push(toIso(cur));
  }
  return days;
};

export const tripDayCount = Math.round((toUtc(tripEndDate) - toUtc(tripStartDate)) / dayInMs) + 1;

export const daysBetween = (fromIso: string, toIsoDate: string) =>
  Math.round((toUtc(toIsoDate) - toUtc(fromIso)) / dayInMs);
