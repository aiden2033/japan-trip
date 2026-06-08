import { useId, useMemo, useState, type ReactNode } from 'react';
import {
  jpyToRubRate,
  shoppingCategories,
  shoppingCheckedAt,
  shoppingDeals,
  shoppingSources,
  type DealTag,
  type ShoppingCategory,
  type ShoppingCategoryMeta,
  type ShoppingDeal,
} from '../data/shoppingDeals';
import { CITY_ACCENT } from '../lib/tags';
import Collapsible from '../components/Collapsible';

type CategoryFilter = ShoppingCategory | 'all';
type SortKey = 'savings' | 'default';

const categoryById = new Map(
  shoppingCategories.map((category) => [category.id, category]),
);

const rowPrice = (value: string) =>
  value.replace(/^(около|примерно)\s+/i, '').replace(/\s+за импорт$/i, '');

const roundRub = (value: number) => {
  if (value < 1000) return Math.round(value / 10) * 10;
  if (value < 10000) return Math.round(value / 100) * 100;
  return Math.round(value / 500) * 500;
};

const formatRub = (value: number) => value.toLocaleString('ru-RU');

// Парсит иены из строки (включая диапазоны «¥1,320-1,540») и переводит в рубли по курсу ЦБ.
const yenToRub = (japanPrice: string): string | null => {
  const match = japanPrice.match(/¥\s*([\d,]+)(?:\s*[-–]\s*([\d,]+))?/);
  if (!match) return null;
  const toRub = (yen: string) => roundRub(Number(yen.replace(/,/g, '')) * jpyToRubRate);
  const low = toRub(match[1]);
  const high = match[2] ? toRub(match[2]) : null;
  return high && high !== low
    ? `≈ ${formatRub(low)}–${formatRub(high)} ₽`
    : `≈ ${formatRub(low)} ₽`;
};

const dealRules = [
  {
    title: 'Tax-free',
    text: 'Бери паспорт. Сверяй минимальную сумму и правила магазина; consumables могут запечатать до выезда.',
  },
  {
    title: 'Гарантия',
    text: 'У электроники и часов проверь международную гарантию, язык меню и региональные ограничения.',
  },
  {
    title: 'Вольтаж',
    text: 'Японская бытовая техника часто 100V. Для РФ безопаснее international model или товар без питания.',
  },
  {
    title: 'Багаж',
    text: 'Ножи только в сдаваемый багаж, крупные коробки Gunpla и техника быстро съедают место.',
  },
];

const tagFilters: { tag: DealTag; label: string }[] = [
  { tag: 'gift', label: '🎁 Подарки' },
  { tag: 'compact', label: '🎒 Компактно' },
  { tag: 'voltage', label: '🔌 Без 100V риска' },
  { tag: 'taxfree', label: '🏷️ Tax-free' },
];

export default function ShoppingDeals() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [activeTags, setActiveTags] = useState<Set<DealTag>>(() => new Set());
  const [sort, setSort] = useState<SortKey>('savings');

  const toggleTag = (tag: DealTag) =>
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });

  const resetFilters = () => {
    setCategory('all');
    setActiveTags(new Set());
  };

  const visibleDeals = useMemo(() => {
    let list = shoppingDeals.filter(
      (deal) => category === 'all' || deal.category === category,
    );

    activeTags.forEach((tag) => {
      list =
        tag === 'voltage'
          ? list.filter((deal) => !deal.tags.includes('voltage'))
          : list.filter((deal) => deal.tags.includes(tag));
    });

    if (sort === 'savings') {
      list = [...list].sort((a, b) => b.savingsPercent - a.savingsPercent);
    }
    return list;
  }, [category, activeTags, sort]);

  const counts = useMemo(() => {
    const next = new Map<CategoryFilter, number>([['all', shoppingDeals.length]]);
    shoppingCategories.forEach((item) => {
      next.set(item.id, shoppingDeals.filter((deal) => deal.category === item.id).length);
    });
    return next;
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-3 py-4">
      <header className="mb-3 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h1 className="text-lg font-extrabold leading-tight text-slate-900">
            Выгодно купить в Японии
          </h1>
          <span className="shrink-0 text-[11px] font-medium text-slate-400">
            {shoppingDeals.length} покупок · сверено {shoppingCheckedAt}
          </span>
        </div>
        <p className="text-xs leading-snug text-slate-500">
          Что туристу из РФ выгоднее брать в Японии по маршруту Осака → Киото → Токио.
          Цены ориентировочные — финальную сверяй в день покупки.
        </p>
        <p className="text-[11px] leading-snug text-slate-400">
          Рубли в скобках — пересчёт по курсу ЦБ (100 ¥ ≈ {Math.round(jpyToRubRate * 100)} ₽) на {shoppingCheckedAt}.
        </p>
      </header>

      <div className="mb-3">
        <Collapsible title="⚠️ Важно перед покупкой" defaultCollapsed>
          <ul className="flex flex-col gap-2">
            {dealRules.map((rule) => (
              <li key={rule.title} className="text-xs leading-relaxed">
                <span className="font-bold text-slate-800">{rule.title}. </span>
                <span className="text-slate-600">{rule.text}</span>
              </li>
            ))}
          </ul>
        </Collapsible>
      </div>

      <div className="sticky top-[61px] z-20 -mx-3 mb-3 border-b border-slate-200 bg-white/95 px-3 pb-2 pt-2 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:static md:mx-0 md:rounded-xl md:border md:bg-white">
        <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ChipCategory
            active={category === 'all'}
            icon="🛍️"
            label="Все"
            count={counts.get('all') ?? 0}
            onClick={() => setCategory('all')}
          />
          {shoppingCategories.map((item) => (
            <ChipCategory
              key={item.id}
              active={category === item.id}
              icon={item.icon}
              label={item.label}
              count={counts.get(item.id) ?? 0}
              onClick={() => setCategory(item.id)}
            />
          ))}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="-mx-3 flex flex-1 gap-1.5 overflow-x-auto px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tagFilters.map((filter) => (
              <ChipToggle
                key={filter.tag}
                active={activeTags.has(filter.tag)}
                onClick={() => toggleTag(filter.tag)}
              >
                {filter.label}
              </ChipToggle>
            ))}
          </div>

          <label className="relative shrink-0">
            <span className="sr-only">Сортировка</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 appearance-none rounded-full border border-slate-300 bg-white pl-3 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <option value="savings">↓ Макс. выгода</option>
              <option value="default">По умолчанию</option>
            </select>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            >
              <path d="M5.5 8 10 12.5 14.5 8z" />
            </svg>
          </label>
        </div>
      </div>

      {visibleDeals.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {visibleDeals.map((deal) => (
            <DealRow key={deal.id} deal={deal} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
          <span className="text-3xl" aria-hidden="true">🔍</span>
          <p className="text-sm font-semibold text-slate-700">Ничего не нашлось</p>
          <p className="max-w-xs text-xs leading-relaxed text-slate-500">
            Под выбранные фильтры нет покупок. Сбросьте фильтры или выберите другую категорию.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition active:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      <footer className="mt-5 flex flex-col gap-2 border-t border-slate-200 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Источники цен и правил
        </p>
        <div className="flex flex-wrap gap-2">
          {shoppingSources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              {source.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

interface ChipCategoryProps {
  active: boolean;
  icon: string;
  label: string;
  count: number;
  onClick: () => void;
}

function ChipCategory({ active, icon, label, count, onClick }: ChipCategoryProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[13px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 active:bg-slate-100'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={`rounded-full px-1.5 text-[11px] tabular-nums ${
          active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

interface ChipToggleProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

function ChipToggle({ active, onClick, children }: ChipToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-[13px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
        active
          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
          : 'border-slate-200 bg-white text-slate-600 active:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

interface DealRowProps {
  deal: ShoppingDeal;
}

function DealRow({ deal }: DealRowProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const category = categoryById.get(deal.category);
  const japanRub = yenToRub(deal.japanPrice);

  return (
    <li>
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${deal.shortName}: выгода ${deal.savings}, в Японии ${rowPrice(deal.japanPrice)}`}
          className="flex min-h-[44px] w-full items-stretch gap-3 p-2.5 text-left active:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
        >
          <DealThumb deal={deal} category={category} />

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
            {category && (
              <span className="inline-flex w-fit items-center gap-1 rounded bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-500">
                <span aria-hidden="true">{category.icon}</span>
                {category.label}
              </span>
            )}
            <span className="truncate text-sm font-bold leading-tight text-slate-900">
              {deal.shortName}
            </span>
            <p className="line-clamp-2 text-xs leading-snug text-slate-500">{deal.reason}</p>
          </div>

          <div className="flex max-w-[6.5rem] shrink-0 flex-col items-end justify-center gap-0.5 pl-1">
            {deal.savingsPercent > 0 ? (
              <span className="rounded-md bg-emerald-600 px-2 py-1 text-base font-extrabold leading-none text-white tabular-nums">
                −{deal.savingsPercent}%
              </span>
            ) : (
              <span className="whitespace-nowrap rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-bold leading-none text-white">
                {deal.savings}
              </span>
            )}
            <span className="max-w-full truncate text-[11px] font-bold leading-tight text-emerald-700 tabular-nums">
              {rowPrice(deal.japanPrice)}
            </span>
            {japanRub && (
              <span className="max-w-full truncate text-[10px] font-semibold leading-tight text-emerald-600 tabular-nums">
                {japanRub}
              </span>
            )}
            <span className="max-w-full truncate text-[10px] leading-tight text-slate-400 line-through tabular-nums">
              {rowPrice(deal.worldPrice)}
            </span>
          </div>

          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 self-center text-slate-300 transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {open && <DealDetails deal={deal} category={category} panelId={panelId} />}
      </article>
    </li>
  );
}

interface DealThumbProps {
  deal: ShoppingDeal;
  category: ShoppingCategoryMeta | undefined;
}

function DealThumb({ deal, category }: DealThumbProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center text-2xl" aria-hidden="true">
          {category?.icon ?? '🛍️'}
        </div>
      ) : (
        <img
          src={import.meta.env.BASE_URL + deal.image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

interface DealDetailsProps {
  deal: ShoppingDeal;
  category: ShoppingCategoryMeta | undefined;
  panelId: string;
}

function DealDetails({ deal, category, panelId }: DealDetailsProps) {
  return (
    <div id={panelId} className="border-t border-slate-100 px-2.5 pb-3 pt-2.5">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {category && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <span aria-hidden="true">{category.icon}</span>
            {category.label}
          </span>
        )}
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
          {deal.savings}
        </span>
        {deal.tags.includes('taxfree') && (
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
            🏷️ tax-free
          </span>
        )}
        {deal.tags.includes('voltage') && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            🔌 100V риск
          </span>
        )}
      </div>

      <p className="mb-1 text-sm font-bold text-slate-900">{deal.product}</p>

      <div className="mb-2 grid grid-cols-2 gap-2">
        <PriceBox label="Средняя РФ / мир" value={deal.worldPrice} />
        <PriceBox label="В Японии" value={deal.japanPrice} hint={yenToRub(deal.japanPrice)} strong />
      </div>

      <p className="text-xs leading-relaxed text-slate-600">{deal.description}</p>

      {deal.note && (
        <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[11px] leading-relaxed text-amber-900">
          {deal.note}
        </p>
      )}

      {deal.bestPlaces.length > 0 && (
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          <span className="font-bold text-slate-700">Лучше всего: </span>
          {deal.bestPlaces.join(' · ')}
        </p>
      )}

      <div className="mt-3">
        <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Где искать
        </h3>
        <div className="flex flex-col gap-1.5">
          {(['osaka', 'kyoto', 'tokyo'] as const).map((city) => (
            <div key={city} className="flex gap-2">
              <span
                className="mt-0.5 inline-flex h-5 shrink-0 items-center rounded px-1.5 text-[10px] font-bold"
                style={{ backgroundColor: CITY_ACCENT[city].bg, color: CITY_ACCENT[city].text }}
              >
                {CITY_ACCENT[city].name}
              </span>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {deal.buyIn[city].join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PriceBoxProps {
  label: string;
  value: string;
  hint?: string | null;
  strong?: boolean;
}

function PriceBox({ label, value, hint, strong = false }: PriceBoxProps) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        strong ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <p className={`text-[11px] font-bold uppercase ${strong ? 'text-emerald-700' : 'text-slate-500'}`}>
        {label}
      </p>
      <p className={`mt-1 break-words text-sm leading-snug ${strong ? 'font-extrabold text-emerald-950' : 'font-semibold text-slate-800'}`}>
        {value}
      </p>
      {hint && (
        <p className={`mt-0.5 text-xs font-semibold tabular-nums ${strong ? 'text-emerald-700' : 'text-slate-500'}`}>
          {hint}
        </p>
      )}
    </div>
  );
}
