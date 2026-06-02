import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { CityId, Place, Tag } from '../data/types';
import { cities } from '../data/cities';
import { places } from '../data/places';
import { dayTripGroups } from '../data/trip';
import { CITY_ACCENT } from '../lib/tags';
import Collapsible from '../components/Collapsible';
import PlaceCard from '../components/PlaceCard';
import TagChip from '../components/TagChip';

const CITY_IDS: CityId[] = ['osaka', 'kyoto', 'tokyo'];

const isCityId = (value: string | undefined): value is CityId =>
  Boolean(value) && CITY_IDS.includes(value as CityId);

export default function CityPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [activeTags, setActiveTags] = useState<Tag[]>([]);

  const cityMeta = useMemo(
    () => (isCityId(city) ? cities.find((c) => c.id === city) : undefined),
    [city],
  );

  const cityPlaces = useMemo(
    () => (isCityId(city) ? places.filter((p) => p.city === city) : []),
    [city],
  );

  if (!cityMeta) {
    return <Navigate to="/" replace />;
  }

  const accent = CITY_ACCENT[cityMeta.id];
  const availableTags = uniqueTags(cityPlaces);

  const toggleTag = (tag: Tag) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const matchesTags = (place: Place) =>
    activeTags.length === 0 || activeTags.every((tag) => place.tags.includes(tag));

  const regularPlaces = cityPlaces.filter((p) => !p.isDayTrip && matchesTags(p));
  const mainPlaces = regularPlaces.filter((p) => !p.foodSpot);
  const cafePlaces = regularPlaces.filter((p) => p.foodSpot);
  const dayTripPlaces = cityPlaces.filter((p) => p.isDayTrip && matchesTags(p));

  const groupsForCity = dayTripGroups.filter((group) =>
    dayTripPlaces.some((p) => p.dayTripGroup === group.id),
  );

  const openPlace = (slug: string) => navigate(`/${cityMeta.id}/${slug}`);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold"
            style={{ backgroundColor: accent.bg, color: accent.text }}
          >
            {cityMeta.nameRu}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {cityMeta.nameEn}
          </span>
        </div>
        <p className="text-sm text-slate-600">{cityMeta.intro}</p>
      </section>

      <Collapsible title="🏨 Где остановиться">
        <ul className="flex flex-col gap-1.5">
          {cityMeta.stay.map((area) => (
            <li key={area.area} className="text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{area.area}</span>
              {' — '}
              {area.why}
            </li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="Советы по городу">
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {cityMeta.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </Collapsible>

      {availableTags.length > 0 && (
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-800">Фильтр по тегам</h2>
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="inline-flex min-h-[44px] items-center rounded-full px-2 text-xs font-semibold text-slate-500 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Сбросить ✕
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                active={activeTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mainPlaces.map((place) => (
          <PlaceCard
            key={place.slug}
            place={place}
            places={places}
            onOpen={openPlace}
          />
        ))}
      </section>

      {cafePlaces.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-slate-800">🍴 Еда, кафе и бары</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cafePlaces.map((place) => (
              <PlaceCard
                key={place.slug}
                place={place}
                places={places}
                onOpen={openPlace}
              />
            ))}
          </div>
        </section>
      )}

      {regularPlaces.length === 0 && dayTripPlaces.length === 0 && (
        <p className="text-sm text-slate-500">
          Ничего не найдено под выбранные теги. Сбрось фильтр.
        </p>
      )}

      {groupsForCity.map((group) => {
        const groupPlaces = dayTripPlaces.filter((p) => p.dayTripGroup === group.id);
        if (groupPlaces.length === 0) return null;
        return (
          <section
            key={group.id}
            className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-3"
          >
            <h2 className="text-sm font-bold text-amber-800">🚆 {group.label}</h2>
            {group.note && (
              <p className="mt-1 text-xs text-amber-700">{group.note}</p>
            )}
            <p className="mt-1 text-xs font-medium text-amber-700">
              Выбери один на день — взаимоисключающие варианты.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {groupPlaces.map((place) => (
                <PlaceCard
                  key={place.slug}
                  place={place}
                  places={places}
                  onOpen={openPlace}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const uniqueTags = (list: Place[]): Tag[] => {
  const set = new Set<Tag>();
  list.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set];
};
