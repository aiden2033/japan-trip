import { NavLink } from 'react-router-dom';
import MoreMenu from './MoreMenu';

interface BottomTabBarProps {
  onSearch: () => void;
}

interface TabDef {
  to: string;
  label: string;
  icon: string;
}

const TABS: TabDef[] = [
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
        <li className="flex-1 border-l border-slate-200">
          <NavLink
            to="/passport"
            end
            aria-label="Книжка странника"
            title="Книжка странника"
            className="flex min-h-[44px] flex-col items-center justify-center py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
          >
            {({ isActive }) => (
              <span
                aria-hidden="true"
                className={`text-2xl leading-none transition-transform ${isActive ? 'scale-110' : ''}`}
              >
                📕
              </span>
            )}
          </NavLink>
        </li>
        <li className="flex-1 border-l border-slate-200">
          <MoreMenu onSearch={onSearch} variant="bottom" />
        </li>
      </ul>
    </nav>
  );
}
