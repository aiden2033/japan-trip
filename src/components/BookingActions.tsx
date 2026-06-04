import type { BookingItem, BookingLink } from '../data/types';

interface BookingActionsProps {
  booking: BookingItem;
  compact?: boolean;
}

const LINK_STYLE: Record<NonNullable<BookingLink['kind']>, string> = {
  official: 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800',
  partner: 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100',
  concierge: 'border-violet-200 bg-violet-50 text-violet-800 hover:bg-violet-100',
  phone: 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
  info: 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
};

export default function BookingActions({ booking, compact = false }: BookingActionsProps) {
  return (
    <div className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {booking.links.map((link) => (
        <a
          key={`${booking.city}:${booking.placeSlug}:${link.label}`}
          href={link.url}
          target={link.url.startsWith('tel:') ? undefined : '_blank'}
          rel={link.url.startsWith('tel:') ? undefined : 'noopener noreferrer'}
          className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
            LINK_STYLE[link.kind ?? 'info']
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
