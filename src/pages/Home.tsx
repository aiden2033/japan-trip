import { Link } from 'react-router-dom';
import { trip } from '../data/trip';
import { cities } from '../data/cities';
import { places } from '../data/places';
import { CITY_ACCENT } from '../lib/tags';
import { useFavorites, placeKey } from '../lib/useStoredSet';
import Collapsible from '../components/Collapsible';

interface HomeProps {
  onSearch: () => void;
}

const routeSteps = (route: string): string[] =>
  route.split('→').map((step) => step.trim());

export default function Home({ onSearch }: HomeProps) {
  const favorites = useFavorites();
  const favoritePlaces = places.filter((p) => favorites.items.has(placeKey(p)));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-extrabold text-slate-900">Гид по Японии 🇯🇵</h1>
        <p className="text-sm text-slate-600">{trip.summary}</p>
        <p className="text-xs font-medium text-slate-500">{trip.dates}</p>

        <div className="flex flex-wrap items-center gap-1.5">
          {routeSteps(trip.route).map((step, index) => (
            <span key={step} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-400">→</span>
              )}
              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                {step}
              </span>
            </span>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={onSearch}
        className="flex min-h-[44px] w-full items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 text-left text-sm text-slate-500 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <span aria-hidden="true">🔎</span>
        Найти место по всем городам…
      </button>

      {favoritePlaces.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            ❤️ Избранное ({favoritePlaces.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {favoritePlaces.map((place) => {
              const accent = CITY_ACCENT[place.city];
              return (
                <li key={placeKey(place)}>
                  <Link
                    to={`/${place.city}/${place.slug}`}
                    className="flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  >
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: accent.bg, color: accent.text }}
                    >
                      {accent.name}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">
                      {place.nameRu}
                    </span>
                    <span className="shrink-0 text-slate-300">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Города</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {cities.map((city) => {
            const accent = CITY_ACCENT[city.id];
            return (
              <Link
                key={city.id}
                to={`/${city.id}`}
                className="flex min-h-[44px] flex-col gap-1 rounded-xl border p-3 text-white shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                style={{ backgroundColor: accent.bg, borderColor: accent.border }}
              >
                <span className="text-base font-extrabold">{city.nameRu}</span>
                <span className="text-xs opacity-90">
                  {city.nameEn}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Collapsible title="Советы по Японии">
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {trip.globalTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="Вылет / последняя ночь">
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {trip.departure.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Collapsible>
    </div>
  );
}
