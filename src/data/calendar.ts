// Trip calendar data. To add an event, append an entry to `tripDayEvents`
// with the `date` set to its day (YYYY-MM-DD). Empty days render automatically.

export type TripDayEventCategory =
  | 'flight'
  | 'transport'
  | 'hotel'
  | 'activity'
  | 'food'
  | 'event'
  | 'note';

export interface TripDayEvent {
  id: string;
  date: string;
  title: string;
  time?: string;
  detail?: string;
  city?: string;
  category: TripDayEventCategory;
}

export const tripStartDate = '2026-08-29';
export const tripEndDate = '2026-09-13';
export const tripRoute = 'Осака → Киото → Токио';

export const tripDayEvents: TripDayEvent[] = [
  // ── Осака (4 ночи) ───────────────────────────────────────────────
  {
    id: 'arrival',
    date: '2026-08-29',
    title: 'Прилёт в Японию (KIX)',
    detail:
      'Группа 14-16 чел: заранее купить ICOCA на всех (или Suica в Apple Wallet), договориться о точке сбора в аэропорту. До Осаки — Nankai Rapi:t / JR Haruka.',
    city: 'Осака',
    category: 'flight',
  },
  {
    id: 'osaka-checkin',
    date: '2026-08-29',
    title: 'Заселение в Осаке (4 ночи)',
    detail: 'База до 2 сентября. Для большой группы бронировать заранее, явно non-smoking rooms.',
    city: 'Осака',
    category: 'hotel',
  },
  {
    id: 'dotonbori-evening',
    date: '2026-08-29',
    title: 'Вечер на Дотонбори',
    detail: 'Лёгкий первый вечер. На ужин разбиться на 3-4 подгруппы — большой стол найти сложно.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'mizuno-dinner',
    date: '2026-08-29',
    title: 'Окономияки Мидзуно',
    detail:
      'Классический первый укус Осаки прямо в Дотонбори (с 1945 г.). Очередь 30-90 мин — для 14-16 чел сесть разом нереально, делиться на столики или держать рядом запасной рамен (Kyushu Ramen Kio).',
    city: 'Осака',
    category: 'food',
  },
  {
    id: 'osaka-castle-day',
    date: '2026-08-30',
    title: 'Осакский замок + Умэда Скай',
    detail: 'Замок утром по прохладе, Умэда Скай Билдинг — на закат.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'kuromon-lunch',
    date: '2026-08-30',
    title: 'Рынок Куромон (обед)',
    detail:
      'После замка — обед на «кухне Осаки»: морепродукты на гриле, суши, фрукты. Брать порциями на ходу и делиться, на большую группу так проще.',
    city: 'Осака',
    category: 'food',
  },
  {
    id: 'hep-five-wheel',
    date: '2026-08-30',
    title: 'Колесо обозрения HEP FIVE',
    detail:
      'Красное колесо на крыше ТЦ в Умэде, рядом с Умэда Скай — быстрый аттракцион (15 мин) + шопинг в самом HEP FIVE перед закатом.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'shinsekai-evening',
    date: '2026-08-30',
    title: 'Синсэкай + башня Цутэнкаку',
    detail:
      'Вечером — ретро-квартал «нового мира»: кусикацу (шпажки в кляре, соус не макать дважды) и подсвеченная башня Цутэнкаку. Атмосферно и бюджетно на всю группу.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'nara-daytrip',
    date: '2026-08-31',
    title: 'Дейтрип в Нару',
    detail: 'Олени, Тодай-дзи. Из Осаки ~40-50 мин (Kintetsu/JR). Начинать рано.',
    city: 'Нара',
    category: 'activity',
  },
  {
    id: 'nara-evening-dotonbori',
    date: '2026-08-31',
    title: 'Вечер в Намбе / Дотонбори',
    detail:
      'Вернувшись из Нары — лёгкий вечер у базы: такояки и неон Дотонбори, плюс пушистый чизкейк Rikuro’s в Намбе по пути. Без плотной программы, день и так пеший.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'nara-dinner-ramen',
    date: '2026-08-31',
    title: 'Ужин: рамен в Дотонбори',
    detail:
      'Просто и сытно после дня на ногах — Kyushu Ramen Kio прямо в Дотонбори. На 14-16 чел сесть разом сложно, заходить подгруппами или держать рядом запасную точку.',
    city: 'Осака',
    category: 'food',
  },
  {
    id: 'himeji-daytrip',
    date: '2026-09-01',
    title: 'Дейтрип в Химэдзи (или свободный день)',
    detail:
      'Замок Химэдзи — ~1 ч на синкансэне из Осаки. Альтернатива для группы: свободный день / шопинг (Америкамура, рынок Куромон, Ден-Ден Таун).',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'amerikamura-denden',
    date: '2026-09-01',
    title: 'Америкамура + Ден-Ден Таун',
    detail:
      'Для тех, кто остаётся в Осаке: молодёжный стритвир и винтаж в Америкамуре, затем отаку-квартал Ниппонбаси (Ден-Ден Таун) — аниме, фигурки, ретро-игры. Многие лавки открываются к полудню.',
    city: 'Осака',
    category: 'activity',
  },
  {
    id: 'osaka-last-dinner',
    date: '2026-09-01',
    title: 'Прощальный ужин в Осаке',
    detail:
      'Последний вечер в Осаке. Вариант на группу — Идзумо унаги или суши-каунтер Якко суши Тэнго (бюджетно), для special occasion — La Cime по ранней брони.',
    city: 'Осака',
    category: 'food',
  },

  // ── Киото (4 ночи) ───────────────────────────────────────────────
  {
    id: 'osaka-kyoto-transfer',
    date: '2026-09-02',
    title: 'Переезд Осака → Киото',
    detail:
      'JR Special Rapid ~30 мин (синкансэн не нужен — слишком короткий участок). Большие чемоданы отправить takkyubin сразу в токийский отель, чтобы не таскать.',
    city: 'Киото',
    category: 'transport',
  },
  {
    id: 'kyoto-checkin',
    date: '2026-09-02',
    title: 'Заселение в Киото (4 ночи)',
    detail: 'База до 6 сентября.',
    city: 'Киото',
    category: 'hotel',
  },
  {
    id: 'fushimi-inari',
    date: '2026-09-02',
    title: 'Фусими Инари',
    detail: 'Идти ближе к закату / вечером — меньше толп, тысячи ворот тории работают круглосуточно.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'arashiyama',
    date: '2026-09-03',
    title: 'Арасияма',
    detail: 'Бамбуковая роща и парк обезьян. Приезжать рано утром, пока пусто.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'nishiki-market-day',
    date: '2026-09-03',
    title: 'Рынок Нисики',
    detail:
      'Во второй половине дня — «кухня Киото»: цукэмоно, тофу/юба, тамагояки на палочке, матча-сладости. Есть строго у витрин (на ходу нельзя). Рядом фуд-зона Takashimaya, если на группу нужен нормальный обед.',
    city: 'Киото',
    category: 'food',
  },
  {
    id: 'pontocho-kamo-evening',
    date: '2026-09-03',
    title: 'Понтотё и река Камо',
    detail:
      'Вечер на узкой аллее изакай вдоль реки Камо: летние террасы «юка» над водой. Для большой группы бронировать столы заранее или разбиться по нескольким заведениям.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'higashiyama',
    date: '2026-09-04',
    title: 'Хигасияма: Киёмидзу-дэра, пагода Ясака, Гион',
    detail: 'Пеший маршрут по старым кварталам. Майко/гейко не фотографировать без разрешения.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'higashiyama-lunch',
    date: '2026-09-04',
    title: 'Обед у Гиона (рыбные боулы)',
    detail:
      'Когда устанете от храмов — Live Shellfish Center у Гиона: брать fish bowls и spicy tuna, быстро и вкусно. На большую группу делиться на столики.',
    city: 'Киото',
    category: 'food',
  },
  {
    id: 'kodai-ji',
    date: '2026-09-04',
    title: 'Кодай-дзи + Саннэндзака/Ниэннэндзака',
    detail:
      'По пути между Киёмидзу и Гионом — изящный храм Кодай-дзи с садами и мощёные улочки-спуски Саннэндзака/Ниэннэндзака (лавки, керамика, матча-сладости). Осторожно на скользких ступенях.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'yasaka-shrine-maruyama',
    date: '2026-09-04',
    title: 'Святилище Ясака + парк Маруяма',
    detail:
      'Финал прогулки по Хигасияме: ярко-оранжевое святилище Ясака с подвесными фонарями (вечером зажигаются) на стыке Гиона и зелёного парка Маруяма — удобная точка завершить день.',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'uji-daytrip',
    date: '2026-09-05',
    title: 'Дейтрип в Удзи (или свободный день)',
    detail: 'Родина матчи, Бёдо-ин. ~20-30 мин на поезде. Альтернатива — свободный день в Киото.',
    city: 'Удзи',
    category: 'activity',
  },
  {
    id: 'ginkakuji-philosophers',
    date: '2026-09-05',
    title: 'Гинкаку-дзи + Философская тропа',
    detail:
      'Удзи — это полдня, так что во второй половине вернуться в Киото: Серебряный павильон с садом и спокойная зелёная Философская тропа вдоль канала (~2 км).',
    city: 'Киото',
    category: 'activity',
  },
  {
    id: 'kyoto-wagyu-dinner',
    date: '2026-09-05',
    title: 'Прощальный ужин в Киото',
    detail:
      'Последний вечер в Киото. Вариант на группу — якинику Гюракутэй (wagyu set, мясо жарится за столом) или живой counter-kaiseki Гиро Гиро Хитосина по брони. Бронировать заранее на 14-16 чел.',
    city: 'Киото',
    category: 'food',
  },

  // ── Токио (7 ночей) ──────────────────────────────────────────────
  {
    id: 'kyoto-tokyo-shinkansen',
    date: '2026-09-06',
    title: 'Синкансэн Киото → Токио',
    detail:
      'Hikari ~2:40 (Nozomi ~2:15). Для 14-16 чел брони мест делать заранее через Smart-EX одним заказом, чтобы сидеть вместе. Фудзи видно справа по ходу (места D/E) — проверить направление.',
    city: 'Токио',
    category: 'transport',
  },
  {
    id: 'tokyo-checkin',
    date: '2026-09-06',
    title: 'Заселение в Токио (7 ночей)',
    detail: 'База до вылета 13 сентября. Вечер — перекрёсток Сибуя.',
    city: 'Токио',
    category: 'hotel',
  },
  {
    id: 'shibuya-harajuku',
    date: '2026-09-07',
    title: 'Сибуя Скай + Харадзюку/Омотэсандо + Мэйдзи',
    detail: 'Сибуя Скай — билеты бронировать заранее на конкретный слот (закат разбирают быстро).',
    city: 'Токио',
    category: 'activity',
  },
  {
    id: 'omotesando-matcha',
    date: '2026-09-07',
    title: 'Матча-пауза на Омотэсандо',
    detail:
      'Короткий чайный стоп между Харадзюку и Омотэсандо — The Matcha Tokyo: стильно и быстро, без долгой посадки. Удобно встроить в прогулку, очередь на группу проверить.',
    city: 'Токио',
    category: 'food',
  },
  {
    id: 'shibuya-sushi-dinner',
    date: '2026-09-07',
    title: 'Ужин: стоячие суши в Сибуе',
    detail:
      'Перед или после Сибуя Скай — Uogashi Nihon-Ichi на Догэндзаке: суши готовят прямо перед тобой, хорошая цена для Сибуи (хвалили scallop). Формат стоячий, заходить мини-группами.',
    city: 'Токио',
    category: 'food',
  },
  {
    id: 'teamlab-asakusa',
    date: '2026-09-08',
    title: 'teamLab Planets + Асакуса (Сэнсо-дзи)',
    detail: 'teamLab — только по предзаказу билетов на слот; на всю группу взять заранее.',
    city: 'Токио',
    category: 'event',
  },
  {
    id: 'asakusa-lunch',
    date: '2026-09-08',
    title: 'Обед в Асакусе (мондзя)',
    detail:
      'В старом районе — мондзяки (токийский родственник окономияки, едят лопатками) в Asakusa Monja Zenya, либо стритфуд на Накамисэ по пути к Сэнсо-дзи.',
    city: 'Токио',
    category: 'food',
  },
  {
    id: 'hatcoffee-asakusa',
    date: '2026-09-08',
    title: 'HATCOFFEE (3D латте-арт)',
    detail:
      'Маленькая кофейня рядом с Асакусой с объёмными фигурками на кофе — лёгкая пауза после teamLab и прогулки вдоль Сумиды. Места мало, приходить не впритык.',
    city: 'Токио',
    category: 'food',
  },
  {
    id: 'fuji-daytrip',
    date: '2026-09-09',
    title: 'Дейтрип к Фудзи: Кавагутико / Хаконэ',
    detail:
      'Кавагутико — чистый вид на Фудзи, но погодная рулетка; Хаконэ — онсэн+озеро, надёжнее в облака. Сезон тайфунов: смотреть прогноз (Windy/JMA) за 2-3 дня и при риске переносить на резервный день.',
    city: 'Фудзи',
    category: 'activity',
  },
  {
    id: 'akihabara-day',
    date: '2026-09-10',
    title: 'Акихабара + мост Хидзири-баси',
    detail:
      'Днём — «электрический город»: аниме, фигурки, ретро-игры, многоэтажный Mandarake (закладывать время на этажи). По пути — мост Хидзири-баси, где разом сходятся три линии поездов (кадр из «Судзумэ»).',
    city: 'Токио',
    category: 'activity',
  },
  {
    id: 'shinjuku-akihabara',
    date: '2026-09-10',
    title: 'Синдзюку + Голден Гай',
    detail:
      'Вечерний неоновый Синдзюку (Омоидэ-ёкотё, 3D-кот у East exit), затем Голден Гай — крошечные бары на 4-8 мест, заходить мини-группами (часто берут cover charge).',
    city: 'Токио',
    category: 'activity',
  },
  {
    id: 'akihabara-ramen',
    date: '2026-09-10',
    title: 'Рамен после Акихабары',
    detail:
      'Перекус между районами — Kyushu Jangara у Акихабары, либо удон в Udon Shin рядом с Синдзюку вечером (популярно, проверить очередь).',
    city: 'Токио',
    category: 'food',
  },
  {
    id: 'reserve-day',
    date: '2026-09-11',
    title: 'Резервный день / шопинг',
    detail:
      'Запас на перенос Фудзи из-за погоды или то, что не успели. Иначе — Гиндза/Уэно, сувениры, tax-free (паспорт с собой, покупки от ¥5000).',
    city: 'Токио',
    category: 'note',
  },
  {
    id: 'reserve-ueno-yanaka',
    date: '2026-09-11',
    title: 'Опция: Уэно + Янака',
    detail:
      'Если Фудзи переносить не надо — спокойный день старого Токио: музеи и рынок Амэёко в Уэно, затем тихие деревянные улочки Янаки с котами. Без подъёмов, легко на группу.',
    city: 'Токио',
    category: 'activity',
  },
  {
    id: 'reserve-ueno-gyukatsu',
    date: '2026-09-11',
    title: 'Опция: гюкацу после Уэно',
    detail:
      'Плотный обед/ужин после музеев — Gyukatsu Motomura у Уэно: мясо в кляре дожариваешь сам на маленькой плитке. Популярно, заходить подгруппами и закладывать очередь.',
    city: 'Токио',
    category: 'food',
  },
  {
    id: 'pack-day',
    date: '2026-09-12',
    title: 'Последние покупки и упаковка',
    detail: 'Докупить сладости/матчу, собрать чемоданы (запас места на сувениры). Ранний сон — рейс утром.',
    city: 'Токио',
    category: 'note',
  },
  {
    id: 'departure',
    date: '2026-09-13',
    time: '08:45',
    title: 'Вылет домой',
    detail: 'Рейс утром в 08:45 — выехать в аэропорт сильно заранее (группой закладывать запас на регистрацию).',
    city: 'Токио',
    category: 'flight',
  },
];

const dayInMs = 24 * 60 * 60 * 1000;

const toUtc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

const toIso = (utc: number) => {
  const date = new Date(utc);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const tripDays = (): string[] => {
  const days: string[] = [];
  const last = toUtc(tripEndDate);
  for (let cur = toUtc(tripStartDate); cur <= last; cur += dayInMs) {
    days.push(toIso(cur));
  }
  return days;
};

export const tripDayCount = Math.round((toUtc(tripEndDate) - toUtc(tripStartDate)) / dayInMs) + 1;

export const daysBetween = (fromIso: string, toIsoDate: string) =>
  Math.round((toUtc(toIsoDate) - toUtc(fromIso)) / dayInMs);
