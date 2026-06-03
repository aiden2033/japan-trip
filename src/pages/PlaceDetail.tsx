import { Link, useNavigate, useParams } from 'react-router-dom';
import type { CityId } from '../data/types';
import { places } from '../data/places';
import { cities } from '../data/cities';
import { CITY_ACCENT, formatHours, mapsUrl } from '../lib/tags';
import PlaceImage from '../components/PlaceImage';
import PlaceToggles from '../components/PlaceToggles';
import TagChip from '../components/TagChip';
import IncompatibleNote from '../components/IncompatibleNote';

const CITY_IDS: CityId[] = ['osaka', 'kyoto', 'tokyo'];

const isCityId = (value: string | undefined): value is CityId =>
  Boolean(value) && CITY_IDS.includes(value as CityId);

export default function PlaceDetail() {
  const { city, slug } = useParams();
  const navigate = useNavigate();

  const cityMeta = isCityId(city) ? cities.find((c) => c.id === city) : undefined;
  const place = places.find((p) => p.slug === slug && p.city === city);

  if (!cityMeta || !place) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-3 py-10 text-center">
        <p className="text-base font-semibold text-slate-700">Место не найдено 😕</p>
        <p className="text-sm text-slate-500">
          Возможно, ссылка устарела или адрес введён с ошибкой.
        </p>
        <Link
          to={cityMeta ? `/${cityMeta.id}` : '/'}
          className="mx-auto inline-flex min-h-[44px] items-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          ← {cityMeta ? `Назад в ${cityMeta.nameRu}` : 'На главную'}
        </Link>
      </div>
    );
  }

  const accent = CITY_ACCENT[place.city];
  const goBack = () => navigate(`/${cityMeta.id}`);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-3 py-4">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-[44px] w-fit items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        ← Назад в {cityMeta.nameRu}
      </button>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <PlaceImage place={place} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: accent.bg, color: accent.text }}
          >
            {accent.name}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold leading-tight text-slate-900">
          {place.nameRu}
        </h1>
        <p className="text-sm text-slate-500">{place.nameEn}</p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {place.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>

      <PlaceToggles place={place} variant="detail" />

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
        <span className="font-medium">⏱ {formatHours(place.timeEstimateHours)}</span>
        {place.bestTime && (
          <span className="font-medium">🕒 Лучшее время: {place.bestTime}</span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-slate-700">{place.description}</p>

      {place.note && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          {place.note}
        </div>
      )}

      <IncompatibleNote place={place} places={places} />

      {place.anime && place.anime.length > 0 && (
        <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-3">
          <p className="mb-1.5 text-sm font-semibold text-fuchsia-900">
            🎬 Аниме, связанные с этим местом
          </p>
          <ul className="flex flex-col gap-1">
            {place.anime.map((title) => (
              <li key={title} className="text-sm text-fuchsia-800">
                • {title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={mapsUrl(place.mapsQuery)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        🗺 Открыть в Google Maps
      </a>
    </div>
  );
}
