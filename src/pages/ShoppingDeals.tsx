import { useMemo, useState } from 'react';
import {
  shoppingCategories,
  shoppingCheckedAt,
  shoppingDeals,
  shoppingSources,
  type ShoppingCategory,
  type ShoppingDeal,
} from '../data/shoppingDeals';
import { CITY_ACCENT } from '../lib/tags';

type CategoryFilter = ShoppingCategory | 'all';

const categoryById = new Map(
  shoppingCategories.map((category) => [category.id, category]),
);

const cityLabels = {
  osaka: 'Осака',
  kyoto: 'Киото',
  tokyo: 'Токио',
} as const;

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

export default function ShoppingDeals() {
  const [category, setCategory] = useState<CategoryFilter>('all');

  const visibleDeals = useMemo(
    () => shoppingDeals.filter((deal) => category === 'all' || deal.category === category),
    [category],
  );

  const counts = useMemo(() => {
    const next = new Map<CategoryFilter, number>([['all', shoppingDeals.length]]);
    shoppingCategories.forEach((item) => {
      next.set(item.id, shoppingDeals.filter((deal) => deal.category === item.id).length);
    });
    return next;
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Shopping guide
          </p>
          <h1 className="text-xl font-extrabold text-slate-900">Выгодно купить</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            16 покупок и услуг, которые туристу из России чаще всего выгоднее смотреть
            в Японии: drugstore-косметика, базовая одежда, JDM-часы, кухонные вещи,
            электроника, хобби и сервисы по маршруту Osaka - Kyoto - Tokyo.
          </p>
          <p className="text-xs font-medium text-slate-500">
            Цены ориентировочные, источники сверены: {shoppingCheckedAt}. Финальную цену,
            наличие и tax-free проверяй в день покупки.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {dealRules.map((rule) => (
            <article
              key={rule.title}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <h2 className="text-sm font-extrabold text-slate-900">{rule.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-slate-800">Категории</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryButton
            active={category === 'all'}
            icon="🛍️"
            label="Все"
            count={counts.get('all') ?? 0}
            onClick={() => setCategory('all')}
          />
          {shoppingCategories.map((item) => (
            <CategoryButton
              key={item.id}
              active={category === item.id}
              icon={item.icon}
              label={item.label}
              count={counts.get(item.id) ?? 0}
              onClick={() => setCategory(item.id)}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </section>

      <footer className="flex flex-col gap-2 border-t border-slate-200 py-4">
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
              className="inline-flex min-h-[32px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              {source.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

interface CategoryButtonProps {
  active: boolean;
  icon: string;
  label: string;
  count: number;
  onClick: () => void;
}

function CategoryButton({ active, icon, label, count, onClick }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={`rounded-full px-1.5 py-0.5 text-[11px] ${
          active ? 'bg-white/15 text-slate-100' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

interface DealCardProps {
  deal: ShoppingDeal;
}

function DealCard({ deal }: DealCardProps) {
  const category = categoryById.get(deal.category);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <DealImage deal={deal} />

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              <span aria-hidden="true">{category.icon}</span>
              {category.label}
            </span>
          )}
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
            {deal.savings}
          </span>
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-base font-extrabold leading-tight text-slate-900">
            {deal.product}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{deal.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <PriceBox label="Средняя РФ / мир" value={deal.worldPrice} />
          <PriceBox label="В Японии" value={deal.japanPrice} strong />
        </div>

        {deal.note && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
            {deal.note}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-3">
          <h3 className="text-sm font-bold text-slate-800">Где искать</h3>
          <div className="grid grid-cols-1 gap-2">
            {(['osaka', 'kyoto', 'tokyo'] as const).map((city) => (
              <CityPlaces
                key={city}
                city={city}
                places={deal.buyIn[city]}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

interface DealImageProps {
  deal: ShoppingDeal;
}

function DealImage({ deal }: DealImageProps) {
  const [failed, setFailed] = useState(false);
  const category = categoryById.get(deal.category);

  if (failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-slate-100 px-4 text-center">
        <div>
          <div className="text-2xl" aria-hidden="true">{category?.icon ?? '🛍️'}</div>
          <div className="mt-1 text-sm font-bold text-slate-700">{deal.shortName}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={import.meta.env.BASE_URL + deal.image}
        alt={deal.imageLabel}
        loading="lazy"
        onError={() => setFailed(true)}
        className="aspect-video w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-3">
        <p className="text-xs font-semibold text-white drop-shadow">{deal.imageLabel}</p>
      </div>
    </div>
  );
}

interface PriceBoxProps {
  label: string;
  value: string;
  strong?: boolean;
}

function PriceBox({ label, value, strong = false }: PriceBoxProps) {
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
    </div>
  );
}

interface CityPlacesProps {
  city: 'osaka' | 'kyoto' | 'tokyo';
  places: string[];
}

function CityPlaces({ city, places }: CityPlacesProps) {
  const accent = CITY_ACCENT[city];

  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
      <div className="mb-1 flex items-center gap-2">
        <span
          className="inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: accent.bg, color: accent.text }}
        >
          {cityLabels[city]}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {places.map((place) => (
          <li key={place} className="break-words text-xs leading-relaxed text-slate-600">
            {place}
          </li>
        ))}
      </ul>
    </div>
  );
}
