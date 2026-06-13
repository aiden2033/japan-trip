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
  // ── Осака (4 ночи) ───────────────────────────────────────────────
  {
    id: 'arrival',
    date: '2026-08-29',
    title: 'Прилёт в Японию (KIX)',
    detail:
      'Группа 14-16 чел: заранее купить ICOCA на всех (или Suica в Apple Wallet), договориться о точке сбора в аэропорту. До Осаки — Nankai Rapi:t / JR Haruka.',
    city: 'Осака',
    category: 'flight',
  },
  {
    id: 'osaka-checkin',
    date: '2026-08-29',
    title: 'Заселение в Осаке (4 ночи)',
    detail: 'База до 2 сентября. Для большой группы бронировать заранее, явно non-smoking rooms.',
    city: 'Осака',
    category: 'hotel',
  },
  {
    id: 'dotonbori-evening',
    date: '2026-08-29',
    title: 'Вечер на Дотонбори',
    detail: 'Лёгкий первый вечер. На ужин разбиться на 3-4 подгруппы — большой стол найти сложно.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'osaka-castle-day',
    date: '2026-08-30',
    title: 'Осакский замок + Умэда Скай',
    detail: 'Замок утром по прохладе, Умэда Скай Билдинг — на закат.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'nara-daytrip',
    date: '2026-08-31',
    title: 'Дейтрип в Нару',
    detail: 'Олени, Тодай-дзи. Из Осаки ~40-50 мин (Kintetsu/JR). Начинать рано.',
    city: 'Нара',
    category: 'activity',
  },
  {
    id: 'himeji-daytrip',
    date: '2026-09-01',
    title: 'Дейтрип в Химэдзи (или свободный день)',
    detail:
      'Замок Химэдзи — ~1 ч на синкансэне из Осаки. Альтернатива для группы: свободный день / шопинг (Америкамура, рынок Куромон, Ден-Ден Таун).',
    city: 'Осака',
    category: 'activity',
  },

  // ── Киото (4 ночи) ───────────────────────────────────────────────
  {
    id: 'osaka-kyoto-transfer',
    date: '2026-09-02',
    title: 'Переезд Осака → Киото',
    detail:
      'JR Special Rapid ~30 мин (синкансэн не нужен — слишком короткий участок). Большие чемоданы отправить takkyubin сразу в токийский отель, чтобы не таскать.',
    city: 'Киото',
    category: 'transport',
  },
  {
    id: 'kyoto-checkin',
    date: '2026-09-02',
    title: 'Заселение в Киото (4 ночи)',
    detail: 'База до 6 сентября.',
    city: 'Киото',
    category: 'hotel',
  },
  {
    id: 'fushimi-inari',
    date: '2026-09-02',
    title: 'Фусими Инари',
    detail: 'Идти ближе к закату / вечером — меньше толп, тысячи ворот тории работают круглосуточно.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'arashiyama',
    date: '2026-09-03',
    title: 'Арасияма',
    detail: 'Бамбуковая роща и парк обезьян. Приезжать рано утром, пока пусто.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'higashiyama',
    date: '2026-09-04',
    title: 'Хигасияма: Киёмидзу-дэра, пагода Ясака, Гион',
    detail: 'Пеший маршрут по старым кварталам. Майко/гейко не фотографировать без разрешения.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'uji-daytrip',
    date: '2026-09-05',
    title: 'Дейтрип в Удзи (или свободный день)',
    detail: 'Родина матчи, Бёдо-ин. ~20-30 мин на поезде. Альтернатива — свободный день в Киото.',
    city: 'Удзи',
    category: 'activity',
  },

  // ── Токио (7 ночей) ──────────────────────────────────────────────
  {
    id: 'kyoto-tokyo-shinkansen',
    date: '2026-09-06',
    title: 'Синкансэн Киото → Токио',
    detail:
      'Hikari ~2:40 (Nozomi ~2:15). Для 14-16 чел брони мест делать заранее через Smart-EX одним заказом, чтобы сидеть вместе. Фудзи видно справа по ходу (места D/E) — проверить направление.',
    city: 'Токио',
    category: 'transport',
  },
  {
    id: 'tokyo-checkin',
    date: '2026-09-06',
    title: 'Заселение в Токио (7 ночей)',
    detail: 'База до вылета 13 сентября. Вечер — перекрёсток Сибуя.',
    city: 'Токио',
    category: 'hotel',
  },
  {
    id: 'shibuya-harajuku',
    date: '2026-09-07',
    title: 'Сибуя Скай + Харадзюку/Омотэсандо + Мэйдзи',
    detail: 'Сибуя Скай — билеты бронировать заранее на конкретный слот (закат разбирают быстро).',
    city: 'Токио',
    category: 'activity',
  },
  {
    id: 'teamlab-asakusa',
    date: '2026-09-08',
    title: 'teamLab Planets + Асакуса (Сэнсо-дзи)',
    detail: 'teamLab — только по предзаказу билетов на слот; на всю группу взять заранее.',
    city: 'Токио',
    category: 'event',
  },
  {
    id: 'fuji-daytrip',
    date: '2026-09-09',
    title: 'Дейтрип к Фудзи: Кавагутико / Хаконэ',
    detail:
      'Кавагутико — чистый вид на Фудзи, но погодная рулетка; Хаконэ — онсэн+озеро, надёжнее в облака. Сезон тайфунов: смотреть прогноз (Windy/JMA) за 2-3 дня и при риске переносить на резервный день.',
    city: 'Фудзи',
    category: 'activity',
  },
  {
    id: 'shinjuku-akihabara',
    date: '2026-09-10',
    title: 'Синдзюку + Голден Гай / Акихабара',
    detail: 'Вечерний Синдзюку, Голден Гай (крошечные бары — заходить мини-группами).',
    city: 'Токио',
    category: 'activity',
  },
  {
    id: 'reserve-day',
    date: '2026-09-11',
    title: 'Резервный день / шопинг',
    detail:
      'Запас на перенос Фудзи из-за погоды или то, что не успели. Иначе — Гиндза/Уэно, сувениры, tax-free (паспорт с собой, покупки от ¥5000).',
    city: 'Токио',
    category: 'note',
  },
  {
    id: 'pack-day',
    date: '2026-09-12',
    title: 'Последние покупки и упаковка',
    detail: 'Докупить сладости/матчу, собрать чемоданы (запас места на сувениры). Ранний сон — рейс утром.',
    city: 'Токио',
    category: 'note',
  },
  {
    id: 'departure',
    date: '2026-09-13',
    time: '08:45',
    title: 'Вылет домой',
    detail: 'Рейс утром в 08:45 — выехать в аэропорт сильно заранее (группой закладывать запас на регистрацию).',
    city: 'Токио',
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
