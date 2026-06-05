import {
  emergencyCheckedAt,
  emergencyContacts,
  emergencyLinks,
  emergencyPhrases,
  emergencyPreparedness,
  emergencyScenarios,
  type EmergencyContactTone,
} from '../data/emergency';

const contactToneClass: Record<EmergencyContactTone, string> = {
  danger: 'border-rose-200 bg-rose-50 text-rose-950 focus-visible:ring-rose-400',
  orange: 'border-orange-200 bg-orange-50 text-orange-950 focus-visible:ring-orange-400',
  sky: 'border-sky-200 bg-sky-50 text-sky-950 focus-visible:ring-sky-400',
  slate: 'border-slate-200 bg-white text-slate-950 focus-visible:ring-slate-400',
};

const badgeToneClass: Record<EmergencyContactTone, string> = {
  danger: 'bg-rose-100 text-rose-700',
  orange: 'bg-orange-100 text-orange-700',
  sky: 'bg-sky-100 text-sky-700',
  slate: 'bg-slate-100 text-slate-600',
};

const contactById = new Map(emergencyContacts.map((contact) => [contact.id, contact]));

export default function Emergency() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 px-3 py-4">
      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-extrabold text-slate-900">Emergency card</h1>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
            offline
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Короткая карточка для Японии: телефоны, фразы для сотрудников и сценарии без live API.
          Ссылки ниже пригодятся только при интернете.
        </p>
        <p className="text-xs font-medium text-slate-500">
          Данные сверены: {emergencyCheckedAt}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {emergencyContacts.map((contact) => (
          <a
            key={contact.id}
            href={`tel:${contact.tel}`}
            className={`flex min-h-[132px] flex-col gap-3 rounded-xl border p-4 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 ${contactToneClass[contact.tone]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold">{contact.title}</p>
                <p className="mt-0.5 text-xs opacity-75">{contact.subtitle}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-bold uppercase ${badgeToneClass[contact.tone]}`}
              >
                {contact.badge}
              </span>
            </div>

            <div className="flex items-end justify-between gap-3">
              <span className="text-4xl font-black tracking-normal">{contact.number}</span>
              <span aria-hidden="true" className="pb-1 text-2xl">☎</span>
            </div>

            <p className="text-sm leading-snug opacity-80">{contact.useFor}</p>
          </a>
        ))}
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        <p className="font-bold">Важно перед звонком</p>
        <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-4">
          <li>Назови что случилось, город, адрес или ближайший ориентир.</li>
          <li>Если связь только data-only eSIM, emergency calls могут не пройти: попроси отель, магазин или прохожего позвонить.</li>
          <li>Для угрозы жизни сначала звони 110/119/118, не в hotline.</li>
        </ul>
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Показать сотруднику</h2>
            <p className="mt-1 text-sm text-slate-500">
              Японские фразы крупно, чтобы показать персоналу, полиции, врачу или прохожему.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {emergencyPhrases.map((phrase) => (
              <article key={phrase.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">
                  {phrase.title}
                </p>
                <p className="mt-2 text-xl font-black leading-snug text-slate-950">
                  {phrase.ja}
                </p>
                {phrase.reading && (
                  <p className="mt-1 text-xs font-medium text-slate-500">{phrase.reading}</p>
                )}
                <p className="mt-2 text-sm text-slate-600">{phrase.en}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-extrabold text-slate-900">Offline prep</h2>
          <ul className="flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-slate-600">
            {emergencyPreparedness.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Сценарии</h2>
          <p className="mt-1 text-sm text-slate-500">Короткие инструкции, которые остаются в приложении offline.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {emergencyScenarios.map((scenario) => (
            <article key={scenario.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{scenario.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{scenario.summary}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold uppercase text-slate-500">
                  {scenario.badge}
                </span>
              </div>

              <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-slate-700">
                {scenario.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              {scenario.relatedContacts && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {scenario.relatedContacts.map((contactId) => {
                    const contact = contactById.get(contactId);
                    if (!contact) return null;
                    return (
                      <a
                        key={contact.id}
                        href={`tel:${contact.tel}`}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                      >
                        {contact.title}: {contact.number}
                      </a>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Когда есть интернет</h2>
          <p className="mt-1 text-sm text-slate-500">
            Официальные страницы для проверки alerts, больниц, hotline и посольств.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {emergencyLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[72px] flex-col justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <span className="text-sm font-extrabold text-slate-900">{link.title}</span>
              <span className="mt-0.5 text-xs font-bold uppercase text-slate-500">
                {link.source}
              </span>
              <span className="mt-1 text-sm leading-snug text-slate-600">{link.note}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
