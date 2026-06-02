import { NavLink } from 'react-router-dom';

interface BottomTabBarProps {
  onSearch: () => void;
}

interface TabDef {
  to: string;
  label: string;
  icon: string;
}

const TABS: TabDef[] = [
  { to: '/', label: 'Главная', icon: '🏠' },
  { to: '/osaka', label: 'Осака', icon: '🏯' },
  { to: '/kyoto', label: 'Киото', icon: '⛩️' },
  { to: '/tokyo', label: 'Токио', icon: '🌆' },
];

export default function BottomTabBar({ onSearch }: BottomTabBarProps) {
  return (
    <nav
      aria-label="Навигация"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-3xl items-stretch">
        {TABS.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              end
              className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
            >
              {({ isActive }) => (
                <>
                  <span aria-hidden="true" className="text-lg leading-none">
                    {tab.icon}
                  </span>
                  <span className={isActive ? 'text-slate-900' : 'text-slate-500'}>
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li className="flex-1">
          <button
            type="button"
            onClick={onSearch}
            className="flex min-h-[44px] w-full flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-medium text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
          >
            <span aria-hidden="true" className="text-lg leading-none">🔎</span>
            <span>Поиск</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
