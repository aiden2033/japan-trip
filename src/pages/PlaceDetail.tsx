import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { CityId } from '../data/types';
import { places } from '../data/places';
import { cities } from '../data/cities';
import { bookingByPlaceKey } from '../data/bookings';
import { CITY_ACCENT, formatHours } from '../lib/tags';
import { formatDistance } from '../lib/geo';
import { nearbyPlaces } from '../lib/nearby';
import { placeKey } from '../lib/useStoredSet';
import PlaceImage from '../components/PlaceImage';
import PlaceToggles from '../components/PlaceToggles';
import TagChip from '../components/TagChip';
import IncompatibleNote from '../components/IncompatibleNote';
import NavHandoff from '../components/NavHandoff';
import BookingActions from '../components/BookingActions';

const CITY_IDS: CityId[] = ['osaka', 'kyoto', 'tokyo', 'other'];

const isCityId = (value: string | undefined): value is CityId =>
  Boolean(value) && CITY_IDS.includes(value as CityId);

export default function PlaceDetail() {
  const { city, slug } = useParams();
  const navigate = useNavigate();
  const [showJapanese, setShowJapanese] = useState(false);

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
  const booking = bookingByPlaceKey.get(placeKey(place));

  const nearby = place.coords
    ? nearbyPlaces(place.coords, places, {
        sameCity: place.city,
        excludeSlug: place.slug,
        limit: 4,
      })
    : [];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-3 pb-32 pt-4 md:pb-4">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-[44px] w-fit items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        ← Назад в {cityMeta.nameRu}
      </button>
      <button
        type="button"
        onClick={goBack}
        aria-label={`Назад в ${cityMeta.nameRu}`}
        title={`Назад в ${cityMeta.nameRu}`}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-3 z-30 inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/15 backdrop-blur md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          ←
        </span>
        <span>Назад</span>
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
          {place.nameJa && (
            <span className="ml-2 align-middle text-base font-medium text-slate-400">
              {place.nameJa}
            </span>
          )}
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

      {(place.hours || place.transport) && (
        <div className="flex flex-col gap-1.5 text-sm text-slate-700">
          {place.hours && (
            <p>
              <span className="font-medium">🕒 Часы: </span>
              {place.hours}
            </p>
          )}
          {place.transport && (
            <p>
              <span className="font-medium">🚃 Как добраться: </span>
              {place.transport}
            </p>
          )}
        </div>
      )}

      <p className="text-sm leading-relaxed text-slate-700">{place.description}</p>

      {place.note && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          {place.note}
        </div>
      )}

      <IncompatibleNote place={place} places={places} />

      {booking && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-900">🎫 Бронь / билеты</p>
          <p className="mt-1 text-sm text-amber-800">{booking.note}</p>
          <p className="mt-1 text-xs font-medium text-amber-700">
            Когда: {booking.leadTime} · проверено: {booking.checkedAt}
          </p>
          <div className="mt-2">
            <BookingActions booking={booking} compact />
          </div>
        </div>
      )}

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

      <NavHandoff
        coords={place.coords}
        query={place.mapsQuery}
        name={place.nameRu}
        transport={place.transport}
      />

      {place.nameJa && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setShowJapanese((v) => !v)}
            aria-expanded={showJapanese}
            className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            🗾 Показать на японском
          </button>
          {showJapanese && (
            <div className="flex flex-col gap-3 rounded-2xl border-2 border-slate-900 bg-white p-5 text-center text-slate-900">
              <p className="text-4xl font-extrabold leading-tight">{place.nameJa}</p>
              <p className="text-lg font-semibold leading-snug">{place.mapsQuery}</p>
            </div>
          )}
        </div>
      )}

      {nearby.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-900">📍 Рядом (пешком)</p>
          <ul className="flex flex-col gap-1.5">
            {nearby.map(({ place: near, km }) => (
              <li key={near.slug}>
                <Link
                  to={`/${near.city}/${near.slug}`}
                  className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 text-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <span className="font-medium text-slate-800">{near.nameRu}</span>
                  <span className="shrink-0 text-slate-500">
                    {formatDistance(km)} · ⏱ {formatHours(near.timeEstimateHours)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
