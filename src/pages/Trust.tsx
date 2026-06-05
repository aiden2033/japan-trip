import { trustTopics } from '../data/trust';
import type { TrustSourceKind } from '../data/types';

const sourceKindLabel: Record<TrustSourceKind, string> = {
  official: 'официально',
  government: 'гос.',
  operator: 'оператор',
  guide: 'гайд',
};

const sourceKindClass: Record<TrustSourceKind, string> = {
  official: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  government: 'border-sky-200 bg-sky-50 text-sky-800',
  operator: 'border-amber-200 bg-amber-50 text-amber-900',
  guide: 'border-slate-200 bg-white text-slate-700',
};

export default function Trust() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-3 py-4">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Проверяемость источников
        </p>
        <h1 className="text-xl font-extrabold leading-tight text-slate-900">
          Trust layer для важных правил
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Короткая сводка по темам, где ошибка стоит денег, времени или проблем на границе.
        </p>
      </section>

      <section className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm leading-relaxed text-rose-950 shadow-sm">
        <strong className="font-extrabold">Важное может устареть.</strong> Перед покупкой,
        ввозом лекарств, оформлением tax-free, поездкой с большим багажом или заполнением
        въездных форм сверяй официальный источник по ссылке в теме.
      </section>

      <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-slate-600">
        <span className="rounded-full bg-slate-200 px-2.5 py-1">
          {trustTopics.length} тем
        </span>
        <span className="rounded-full bg-slate-200 px-2.5 py-1">
          Проверено: 5 июня 2026
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {trustTopics.map((topic) => (
          <li key={topic.title}>
            <article className="flex flex-col gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                  {topic.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  Проверено: {topic.checkedAt}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-base font-extrabold leading-tight text-slate-900">
                  {topic.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">{topic.summary}</p>
              </div>

              <dl className="grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 text-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="py-2 pr-0 text-rose-950 sm:pr-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-rose-700">
                    Риск
                  </dt>
                  <dd>{topic.risk}</dd>
                </div>
                <div className="py-2 pl-0 text-slate-700 sm:pl-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Что может измениться
                  </dt>
                  <dd>{topic.whatCanChange}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-1.5">
                {topic.links.map((link) => (
                  <a
                    key={`${topic.title}:${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[40px] max-w-full items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${sourceKindClass[link.kind]}`}
                  >
                    <span className="truncate">{link.label}</span>
                    <span className="shrink-0 text-xs opacity-75">
                      {sourceKindLabel[link.kind]}
                    </span>
                  </a>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
