import { Link } from 'react-router-dom';
import { bookings } from '../data/bookings';
import { places } from '../data/places';
import type { BookingItem, CityId, Place } from '../data/types';
import { CITY_ACCENT, formatHours } from '../lib/tags';
import { placeKey, useBooked } from '../lib/useStoredSet';
import BookingActions from '../components/BookingActions';
import TagChip from '../components/TagChip';

const CITY_ORDER: CityId[] = ['osaka', 'kyoto', 'tokyo'];

const placeByBooking = new Map(
  places.map((place) => [placeKey(place), place]),
);

const kindLabel: Record<BookingItem['kind'], string> = {
  ticket: 'Билет',
  reservation: 'Бронь',
  queue: 'Слот / очередь',
};

export default function Bookings() {
  const booked = useBooked();
  const total = bookings.length;
  const done = bookings.filter((item) => booked.items.has(bookingKey(item))).length;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-extrabold text-slate-900">🎫 Брони и билеты</h1>
        <p className="text-sm text-slate-600">
          Всё, что лучше купить или забронировать до поездки: смотровые, музеи и рестораны.
        </p>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{done}/{total} готово</span>
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label="Прогресс бронирований"
            aria-valuenow={done}
            aria-valuemin={0}
            aria-valuemax={total}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        Ссылки проверены в июне 2026. Перед оплатой всё равно сверяй дату, имя в билете,
        правила отмены и поддержку иностранной карты.
      </section>

      {CITY_ORDER.map((city) => {
        const cityItems = bookings.filter((item) => item.city === city);
        if (cityItems.length === 0) return null;
        const accent = CITY_ACCENT[city];
        const cityDone = cityItems.filter((item) => booked.items.has(bookingKey(item))).length;

        return (
          <section key={city} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold"
                style={{ backgroundColor: accent.bg, color: accent.text }}
              >
                {accent.name}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {cityDone}/{cityItems.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {cityItems.map((item) => {
                const place = placeByBooking.get(bookingKey(item));
                if (!place) return null;
                return (
                  <BookingCard
                    key={bookingKey(item)}
                    booking={item}
                    place={place}
                    done={booked.items.has(bookingKey(item))}
                    onToggle={() => booked.toggle({ city: item.city, slug: item.placeSlug })}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const bookingKey = (item: Pick<BookingItem, 'city' | 'placeSlug'>): string =>
  `${item.city}:${item.placeSlug}`;

interface BookingCardProps {
  booking: BookingItem;
  place: Place;
  done: boolean;
  onToggle: () => void;
}

function BookingCard({ booking, place, done, onToggle }: BookingCardProps) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border p-3 shadow-sm ${
        done ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          aria-label={done ? 'Отметить как неготовое' : 'Отметить как готовое'}
          className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg font-bold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
            done
              ? 'border-emerald-300 bg-emerald-600 text-white'
              : 'border-slate-200 bg-white text-slate-400 hover:border-emerald-300 hover:text-emerald-700'
          }`}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                booking.priority === 'critical'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {booking.priority === 'critical' ? 'Сильно заранее' : 'Заранее'}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {kindLabel[booking.kind]}
            </span>
          </div>
          <Link
            to={`/${place.city}/${place.slug}`}
            className="mt-1 block text-base font-extrabold leading-tight text-slate-900 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {place.nameRu}
          </Link>
          <p className="text-xs text-slate-500">{place.nameEn}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
        <span>⏱ {formatHours(place.timeEstimateHours)}</span>
        <span>🗓 {booking.leadTime}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {place.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{booking.note}</p>

      <BookingActions booking={booking} />
    </article>
  );
}
