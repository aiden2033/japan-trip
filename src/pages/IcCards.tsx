import { useMemo, useState } from 'react';

type Arrival = 'kansai' | 'kanto' | 'unknown';
type Device = 'iphone' | 'android';
type TripLength = 'short' | 'medium' | 'long';
type CardFormat = 'physical' | 'digital';
type Fit = 'best' | 'good' | 'watch';

interface SegmentOption<T extends string> {
  value: T;
  label: string;
  hint: string;
}

interface Recommendation {
  title: string;
  badge: string;
  fit: Fit;
  summary: string;
  reasons: string[];
  alternatives: Array<{
    name: string;
    note: string;
  }>;
}

const arrivalOptions: SegmentOption<Arrival>[] = [
  { value: 'kansai', label: 'Kansai', hint: 'Osaka / Kyoto' },
  { value: 'kanto', label: 'Kanto', hint: 'Tokyo / Narita / Haneda' },
  { value: 'unknown', label: 'Не знаю', hint: 'Выбрать по формату' },
];

const deviceOptions: SegmentOption<Device>[] = [
  { value: 'iphone', label: 'iPhone', hint: 'Apple Wallet' },
  { value: 'android', label: 'Android', hint: 'Проверить FeliCa' },
];

const tripLengthOptions: SegmentOption<TripLength>[] = [
  { value: 'short', label: 'До 28 дней', hint: 'Обычная поездка' },
  { value: 'medium', label: '29-180 дней', hint: 'Visitor-карты коротки' },
  { value: 'long', label: '180+ дней', hint: 'Нужна обычная карта' },
];

const formatOptions: SegmentOption<CardFormat>[] = [
  { value: 'physical', label: 'Физическая', hint: 'Карта в руках' },
  { value: 'digital', label: 'Цифровая', hint: 'Телефон / Wallet' },
];

const sources = [
  {
    label: 'JNTO IC cards',
    url: 'https://www.japan.travel/en/plan/ic-card/',
  },
  {
    label: 'JR East Welcome Suica',
    url: 'https://www.jreast.co.jp/en/multi/welcomesuica/welcomesuica.html',
  },
  {
    label: 'PASMO visitors',
    url: 'https://www.pasmo.co.jp/visitors/en/',
  },
  {
    label: 'JR West ICOCA',
    url: 'https://www.jr-odekake.net/icoca/',
  },
];

const essentials = [
  {
    title: '28 дней',
    text: 'Welcome Suica и туристический PASMO рассчитаны на короткие поездки: срок действия 28 дней с покупки или выпуска.',
  },
  {
    title: 'Остаток',
    text: 'У visitor-карт остаток обычно не возвращается. Пополняй небольшими суммами ближе к концу маршрута.',
  },
  {
    title: 'Пополнение',
    text: 'Физические карты чаще всего пополняются наличными в автоматах, кассах и convenience stores.',
  },
  {
    title: 'Android',
    text: 'Android, купленный вне Японии, часто не подходит для mobile IC из-за FeliCa / Osaifu-Keitai. Для него безопаснее физическая карта.',
  },
];

const cardNotes = [
  {
    name: 'ICOCA',
    area: 'Лучше при старте в Kansai',
    text: 'Обычная пополняемая карта JR West. Хороший выбор для Osaka / Kyoto и работает в большинстве совместимых IC-зон по стране.',
  },
  {
    name: 'Welcome Suica',
    area: 'Токио и аэропорты Kanto',
    text: 'Visitor-вариант Suica без депозита, но с лимитом 28 дней и без возврата остатка.',
  },
  {
    name: 'TOURIST PASMO / PASMO PASSPORT',
    area: 'Kanto visitor card',
    text: 'PASMO PASSPORT был прежней туристической картой до 2024 года; в 2026 актуальный visitor-вариант называется TOURIST PASMO.',
  },
  {
    name: 'mobile Suica / PASMO / ICOCA',
    area: 'Лучше для iPhone',
    text: 'На iPhone это самый удобный вариант: выпуск в Wallet, меньше очередей и проще пополнять без физической карты.',
  },
];

const fitStyle: Record<Fit, string> = {
  best: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  good: 'border-sky-200 bg-sky-50 text-sky-800',
  watch: 'border-amber-200 bg-amber-50 text-amber-900',
};

const fitLabel: Record<Fit, string> = {
  best: 'Лучший выбор',
  good: 'Рабочий выбор',
  watch: 'С оговорками',
};

export default function IcCards() {
  const [arrival, setArrival] = useState<Arrival>('kansai');
  const [device, setDevice] = useState<Device>('iphone');
  const [tripLength, setTripLength] = useState<TripLength>('short');
  const [cardFormat, setCardFormat] = useState<CardFormat>('physical');

  const recommendation = useMemo(
    () => getRecommendation({ arrival, device, tripLength, cardFormat }),
    [arrival, device, tripLength, cardFormat],
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Транспорт
        </p>
        <h1 className="text-xl font-extrabold text-slate-900">IC Card decision tree</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Быстрый выбор между ICOCA, Welcome Suica, туристическим PASMO и mobile IC
          для маршрута Osaka - Kyoto - Tokyo.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3">
        <SegmentedControl
          title="Где прилёт?"
          value={arrival}
          options={arrivalOptions}
          onChange={setArrival}
        />
        <SegmentedControl
          title="Телефон"
          value={device}
          options={deviceOptions}
          onChange={setDevice}
        />
        <SegmentedControl
          title="Срок поездки"
          value={tripLength}
          options={tripLengthOptions}
          onChange={setTripLength}
        />
        <SegmentedControl
          title="Формат карты"
          value={cardFormat}
          options={formatOptions}
          onChange={setCardFormat}
        />
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${fitStyle[recommendation.fit]}`}>
            {fitLabel[recommendation.fit]}
          </span>
          <span className="text-xs font-semibold text-slate-500">{recommendation.badge}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-extrabold leading-tight text-slate-900">
            {recommendation.title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">{recommendation.summary}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {recommendation.reasons.map((reason) => (
            <div
              key={reason}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              {reason}
            </div>
          ))}
        </div>

        {recommendation.alternatives.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
            <h3 className="text-sm font-bold text-slate-800">Альтернативы</h3>
            <ul className="flex flex-col gap-2">
              {recommendation.alternatives.map((alternative) => (
                <li key={alternative.name} className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-900">{alternative.name}</span>
                  {' - '}
                  {alternative.note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-800">Что учесть</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {essentials.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-800">Коротко по картам</h2>
        <div className="grid grid-cols-1 gap-2">
          {cardNotes.map((card) => (
            <article key={card.name} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">{card.name}</h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {card.area}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="flex flex-col gap-2 border-t border-slate-200 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Источники, проверено в июне 2026
        </p>
        <ul className="flex flex-col gap-1.5">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-sky-700 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}

interface Selection {
  arrival: Arrival;
  device: Device;
  tripLength: TripLength;
  cardFormat: CardFormat;
}

function getRecommendation({
  arrival,
  device,
  tripLength,
  cardFormat,
}: Selection): Recommendation {
  const tripIsShort = tripLength === 'short';
  const tripIsLongerThanVisitor = tripLength !== 'short';

  if (cardFormat === 'digital') {
    if (device === 'android') {
      return {
        title: physicalTitle(arrival, tripIsShort),
        badge: 'Android + digital',
        fit: 'watch',
        summary:
          'Для Android безопаснее планировать физическую карту: mobile Suica / PASMO / ICOCA обычно требуют японский FeliCa / Osaifu-Keitai.',
        reasons: [
          'Если телефон куплен вне Японии, цифровая IC-карта часто не выпускается или не проходит через турникеты.',
          tripIsLongerThanVisitor
            ? 'Поездка длиннее 28 дней: visitor-карты не закроют весь срок без пересборки плана.'
            : 'Для короткой поездки физическая visitor-карта проще, чем проверять совместимость Android.',
          arrival === 'kansai'
            ? 'В Kansai бери ICOCA: это самый прямой физический вариант для Osaka / Kyoto.'
            : 'В Kanto смотри Welcome Suica или TOURIST PASMO, если нужен быстрый visitor-вариант.',
          'Пополняй физическую карту наличными небольшими суммами.',
        ],
        alternatives: [
          {
            name: 'mobile Suica / PASMO / ICOCA',
            note: 'имеет смысл только если Android точно поддерживает FeliCa / Osaifu-Keitai.',
          },
          {
            name: 'iPhone + Wallet',
            note: 'если есть доступный iPhone, цифровая карта становится самым удобным вариантом.',
          },
        ],
      };
    }

    return {
      title: mobileTitle(arrival),
      badge: 'iPhone + digital',
      fit: 'best',
      summary:
        'Для iPhone выбирай mobile IC: не нужна пластиковая карта, проще пополнять и меньше зависимость от наличных.',
      reasons: [
        arrival === 'kansai'
          ? 'Старт в Kansai: mobile ICOCA выглядит самым естественным выбором.'
          : arrival === 'kanto'
            ? 'Старт в Kanto: mobile Suica или PASMO логичнее всего.'
            : 'Если регион прилёта неясен, mobile Suica / PASMO / ICOCA решают задачу без поиска кассы.',
        tripIsLongerThanVisitor
          ? 'Для поездки дольше 28 дней обычная mobile IC лучше visitor-карт с коротким сроком.'
          : 'Для поездки до 28 дней можно также рассмотреть Welcome Suica Mobile, если нужен visitor-сценарий.',
        'Физический депозит не нужен, а карта остаётся в Wallet.',
        'Проверь заранее, проходит ли твоя иностранная банковская карта для пополнения.',
      ],
      alternatives: [
        {
          name: 'ICOCA',
          note: 'физический запасной вариант при прилёте в Kansai.',
        },
        {
          name: 'Welcome Suica / TOURIST PASMO',
          note: 'физический visitor-вариант при прилёте в Kanto, но только на 28 дней.',
        },
      ],
    };
  }

  if (arrival === 'kansai') {
    return {
      title: 'ICOCA',
      badge: 'Kansai + physical',
      fit: 'best',
      summary:
        'При старте в Osaka / Kyoto бери ICOCA: это обычная физическая IC-карта JR West с хорошей совместимостью по стране.',
      reasons: [
        'Нет 28-дневного visitor-лимита как у Welcome Suica и туристического PASMO.',
        'Удобно купить и пополнить в зоне JR West.',
        'Работает в совместимых IC-зонах, включая Tokyo, но не для непрерывных поездок между разными IC-регионами.',
        'Депозит обычной ICOCA возвращается при сдаче карты, если есть время и подходящее место.',
      ],
      alternatives: [
        {
          name: 'mobile ICOCA',
          note: 'лучше физической карты, если у тебя iPhone и ты хочешь цифровой формат.',
        },
        {
          name: 'Welcome Suica / TOURIST PASMO',
          note: 'нормально, если старт поменяется на Tokyo, Narita или Haneda.',
        },
      ],
    };
  }

  if (arrival === 'kanto') {
    return {
      title: tripIsShort ? 'Welcome Suica или TOURIST PASMO' : 'Welcome Suica / TOURIST PASMO только как временный вариант',
      badge: 'Kanto + physical',
      fit: tripIsShort ? 'good' : 'watch',
      summary: tripIsShort
        ? 'При прилёте в Tokyo, Narita или Haneda бери visitor-карту: Welcome Suica или TOURIST PASMO, наследник PASMO PASSPORT.'
        : 'Для поездки дольше 28 дней visitor-карты Kanto короткие: планируй mobile IC на iPhone или обычную карту, если она доступна.',
      reasons: [
        'Welcome Suica и TOURIST PASMO действуют 28 дней.',
        'Остаток на visitor-картах не возвращается, поэтому не держи большой баланс в конце поездки.',
        'Пополнение физической Welcome Suica - наличными.',
        tripIsShort
          ? 'Для короткой поездки это самый простой физический сценарий в Kanto.'
          : 'После 28 дней понадобится другой способ оплаты или новая карта, если правила продажи позволяют.',
      ],
      alternatives: [
        {
          name: 'mobile Suica / PASMO / ICOCA',
          note: 'лучше для iPhone, особенно если поездка длиннее 28 дней.',
        },
        {
          name: 'ICOCA',
          note: 'подходит как обычная физическая карта, если удобнее купить её в Kansai по маршруту.',
        },
      ],
    };
  }

  return {
    title: tripIsShort ? 'Выбирай по аэропорту: ICOCA или Welcome Suica / TOURIST PASMO' : 'Лучше mobile IC на iPhone или обычная ICOCA',
    badge: 'Unknown arrival + physical',
    fit: 'good',
    summary:
      'Если точка прилёта ещё не ясна, решение простое: в Kansai бери ICOCA, в Kanto - Welcome Suica или TOURIST PASMO.',
    reasons: [
      'ICOCA удобнее всего покупать на старте в Osaka / Kyoto.',
      'Welcome Suica и TOURIST PASMO удобнее всего брать на старте в Tokyo / Narita / Haneda.',
      tripIsLongerThanVisitor
        ? 'Если поездка дольше 28 дней, visitor-карты Kanto не подходят как единственная карта.'
        : 'Если поездка до 28 дней, visitor-карты Kanto нормально закрывают срок.',
      'На Android заранее не закладывайся на mobile IC, если телефон не японский.',
    ],
    alternatives: [
      {
        name: 'mobile Suica / PASMO / ICOCA',
        note: 'самый гибкий вариант для iPhone при неизвестном аэропорте.',
      },
      {
        name: 'ICOCA',
        note: 'самый спокойный физический вариант, если маршрут начинается в Kansai.',
      },
    ],
  };
}

function physicalTitle(arrival: Arrival, tripIsShort: boolean): string {
  if (arrival === 'kansai') return 'ICOCA';
  if (arrival === 'kanto') {
    return tripIsShort
      ? 'Welcome Suica или TOURIST PASMO'
      : 'Welcome Suica / TOURIST PASMO только на первые 28 дней';
  }
  return 'Физическая IC-карта по аэропорту';
}

function mobileTitle(arrival: Arrival): string {
  if (arrival === 'kansai') return 'mobile ICOCA';
  if (arrival === 'kanto') return 'mobile Suica или PASMO';
  return 'mobile Suica / PASMO / ICOCA';
}

interface SegmentedControlProps<T extends string> {
  title: string;
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}

function SegmentedControl<T extends string>({
  title,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-bold text-slate-800">{title}</legend>
      <div className="grid grid-cols-1 gap-1 rounded-xl bg-slate-100 p-1 sm:grid-cols-3">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`min-h-[52px] rounded-lg px-3 py-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                active
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              }`}
            >
              <span className="block text-sm font-extrabold leading-tight">{option.label}</span>
              <span className="mt-0.5 block text-xs font-medium leading-tight">{option.hint}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
