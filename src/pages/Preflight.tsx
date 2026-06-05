import { preflightGroups, preflightTasks, PREFLIGHT_CHECKED_AT } from '../data/preflight';
import type { PreflightPriority, PreflightTask } from '../data/preflight';
import { usePreflight } from '../lib/useStoredSet';

const priorityLabel: Record<PreflightPriority, string> = {
  critical: 'Критично',
  important: 'Важно',
  nice: 'Опционально',
};

const priorityClass: Record<PreflightPriority, string> = {
  critical: 'bg-rose-100 text-rose-700',
  important: 'bg-amber-100 text-amber-800',
  nice: 'bg-slate-100 text-slate-600',
};

type SourceKind = NonNullable<NonNullable<PreflightTask['sourceLinks']>[number]['kind']>;

const sourceKindLabel: Record<SourceKind, string> = {
  official: 'Офиц.',
  guide: 'Гайд',
  booking: 'Бронь',
  service: 'Сервис',
};

export default function Preflight() {
  const preflight = usePreflight();
  const total = preflightTasks.length;
  const done = preflightTasks.filter((task) => preflight.items.has(task.id)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Before-trip checklist</h1>
            <p className="text-sm text-slate-600">
              Документы, связь, деньги, брони и багаж перед вылетом в Японию.
            </p>
            <p className="text-xs font-medium text-slate-500">
              Источники по правилам сверены: {PREFLIGHT_CHECKED_AT}
            </p>
          </div>

          {done > 0 && (
            <button
              type="button"
              onClick={preflight.clear}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Сбросить
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{done}/{total} готово</span>
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label="Прогресс подготовки к поездке"
            aria-valuenow={done}
            aria-valuemin={0}
            aria-valuemax={total}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-10 text-right text-xs font-semibold text-slate-500">{pct}%</span>
        </div>
      </section>

      {preflightGroups.map((group) => {
        const groupDone = group.tasks.filter((task) => preflight.items.has(task.id)).length;

        return (
          <section key={group.id} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg" aria-hidden="true">{group.icon}</span>
                <h2 className="text-base font-extrabold text-slate-900">{group.title}</h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {groupDone}/{group.tasks.length}
                </span>
              </div>
              <p className="text-sm text-slate-600">{group.summary}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {group.tasks.map((task) => (
                <PreflightCard
                  key={task.id}
                  task={task}
                  done={preflight.hasKey(task.id)}
                  onToggle={() => preflight.toggleKey(task.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

interface PreflightCardProps {
  task: PreflightTask;
  done: boolean;
  onToggle: () => void;
}

function PreflightCard({ task, done, onToggle }: PreflightCardProps) {
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
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${priorityClass[task.priority]}`}
            >
              {priorityLabel[task.priority]}
            </span>
            <span className="text-xs font-semibold text-slate-500">{task.timing}</span>
          </div>
          <h3 className="mt-1 text-base font-extrabold leading-tight text-slate-900">
            {task.title}
          </h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{task.details}</p>

      {task.sourceLinks && task.sourceLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {task.sourceLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              {link.kind && (
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] uppercase text-slate-500">
                  {sourceKindLabel[link.kind]}
                </span>
              )}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
