import { NavLink, Link } from 'react-router-dom';
import type { CityId } from '../data/types';
import { CITY_ACCENT } from '../lib/tags';
import MoreMenu from './MoreMenu';

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearchFocus: () => void;
}

const CITY_TABS: CityId[] = ['osaka', 'kyoto', 'tokyo'];

export default function Header({ query, onQueryChange, onSearchFocus }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 py-2">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex min-h-[44px] shrink-0 items-center text-base font-extrabold leading-tight text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Гид по Японии 🇯🇵
          </Link>

          <div className="relative flex-1">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              🔎
            </span>
            <input
              type="search"
              inputMode="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={onSearchFocus}
              placeholder="Поиск места…"
              aria-label="Поиск места"
              className="h-11 w-full rounded-full border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            />
          </div>
        </div>

        <nav
          aria-label="Города"
          className="hidden items-center gap-2 overflow-x-auto md:flex"
        >
          {CITY_TABS.map((city) => (
            <CityTab
              key={city}
              to={`/${city}`}
              label={CITY_ACCENT[city].name}
              accentBg={CITY_ACCENT[city].bg}
              accentText={CITY_ACCENT[city].text}
            />
          ))}

          <NavLink
            to="/passport"
            end
            aria-label="Книжка странника"
            title="Книжка странника"
            className="ml-auto shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {({ isActive }) => (
              <span
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border text-xl transition-colors ${
                  isActive
                    ? 'border-rose-300 bg-rose-100'
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                📕
              </span>
            )}
          </NavLink>

          <MoreMenu onSearch={onSearchFocus} />
        </nav>
      </div>
    </header>
  );
}

interface CityTabProps {
  to: string;
  label: string;
  accentBg?: string;
  accentText?: string;
}

function CityTab({ to, label, accentBg, accentText }: CityTabProps) {
  return (
    <NavLink
      to={to}
      end
      className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      {({ isActive }) => (
        <span
          className={`inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
            isActive
              ? 'text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          style={
            isActive && accentBg
              ? { backgroundColor: accentBg, color: accentText }
              : isActive
                ? { backgroundColor: '#0f172a', color: '#ffffff' }
                : undefined
          }
        >
          {label}
        </span>
      )}
    </NavLink>
  );
}
