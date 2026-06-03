import { Link, useNavigate } from 'react-router-dom';
import { cities } from '../data/cities';
import { places } from '../data/places';
import { CITY_ACCENT, stampGlyph } from '../lib/tags';
import { useVisited, placeKey } from '../lib/useStoredSet';
import Stamp from '../components/Stamp';

export default function Passport() {
  const navigate = useNavigate();
  const visited = useVisited();

  const collectedTotal = places.filter((p) => visited.items.has(placeKey(p))).length;
  const grandTotal = places.length;
  const pct = grandTotal > 0 ? Math.round((collectedTotal / grandTotal) * 100) : 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-extrabold text-slate-900">📕 Книжка странника</h1>
        <p className="text-sm text-slate-600">
          Собрано печатей: {collectedTotal} из {grandTotal}
        </p>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={collectedTotal}
          aria-valuemin={0}
          aria-valuemax={grandTotal}
          aria-label="Прогресс по печатям"
        >
          <div
            className="h-full rounded-full bg-[#c0392b] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </section>

      {collectedTotal === 0 ? (
        <section className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
          <Stamp size="lg" glyph="⛩" />
          <p className="max-w-sm text-sm text-slate-600">
            Здесь появятся печати мест, которые ты отметишь посещёнными. Открой место и нажми ✓.
          </p>
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            К городам
          </Link>
        </section>
      ) : (
        cities.map((city) => {
          const cityPlaces = places.filter((p) => p.city === city.id);
          const collectedPlaces = cityPlaces.filter((p) => visited.items.has(placeKey(p)));
          if (collectedPlaces.length === 0) return null;
          const accent = CITY_ACCENT[city.id];

          return (
            <section key={city.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                  style={{ backgroundColor: accent.bg, color: accent.text }}
                >
                  {city.nameRu}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {collectedPlaces.length}/{cityPlaces.length}
                </span>
              </div>

              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {collectedPlaces.map((place) => (
                  <li key={placeKey(place)}>
                    <button
                      type="button"
                      onClick={() => navigate(`/${place.city}/${place.slug}`)}
                      className="flex min-h-[44px] w-full flex-col items-center gap-1.5 rounded-xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    >
                      <Stamp size="lg" glyph={stampGlyph(place)} ariaLabel={place.nameRu} />
                      <span className="w-full truncate text-center text-xs font-medium text-slate-600">
                        {place.nameRu}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}
