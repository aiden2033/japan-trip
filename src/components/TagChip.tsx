import type { Tag } from '../data/types';
import { TAG_LABELS } from '../lib/tags';

interface TagChipProps {
  tag: Tag;
  onClick?: () => void;
  active?: boolean;
}

const isAlert = (tag: Tag) => tag === 'tickets-ahead';

export default function TagChip({ tag, onClick, active = false }: TagChipProps) {
  const base =
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs whitespace-nowrap transition-colors';
  const label = TAG_LABELS[tag];
  const alert = isAlert(tag);

  if (!onClick) {
    const display = alert
      ? 'bg-rose-100 text-rose-700 border border-rose-300 font-semibold'
      : 'bg-slate-100 text-slate-600 font-medium';
    return <span className={`${base} ${display}`}>{label}</span>;
  }

  const interactive = active
    ? 'bg-slate-800 text-white font-medium'
    : 'bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 active:bg-slate-200';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${base} min-h-[44px] ${interactive} focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400`}
    >
      {label}
    </button>
  );
}
