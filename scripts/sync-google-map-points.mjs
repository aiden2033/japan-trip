import { writeFile } from 'node:fs/promises';

const SOURCE_URL = 'https://maps.app.goo.gl/6QKnyBj1B4gE56PS8';
const OUTPUT_PATH = new URL('../src/data/friendsMapPlaces.ts', import.meta.url);

const CITY_ORDER = ['osaka', 'kyoto', 'tokyo', 'other'];
const CITY_BY_NAME = new Map([
  ['mount kongo', 'osaka'],
  ['mount kongō', 'osaka'],
  ['bic camera namba store', 'osaka'],
  ['yodobashi camera multimedia umeda', 'osaka'],
  ['camera kitamura osaka namba city shop', 'osaka'],
  ['парк студии "юниверсал" в осаке', 'osaka'],
  ['% arabica kyoto higashiyama', 'kyoto'],
  ['mount daimonji', 'kyoto'],
  ['эйкан-до', 'kyoto'],
  ['кинкаку-дзи', 'kyoto'],
  ['кавагоэ', 'tokyo'],
  ['kotsuboiijima park', 'tokyo'],
  ['35°31\'21.2"n 138°45\'14.1"e', 'tokyo'],
  ['fujisan shokupan', 'tokyo'],
  ['35°29\'53.5"n 138°46\'03.0"e', 'tokyo'],
  ['enoshima-ohashi bridge', 'tokyo'],
  ['35°18\'24.1"n 139°30\'07.7"e', 'tokyo'],
  ['slow rush coffee', 'tokyo'],
  ['lawson kawaguchiko station', 'tokyo'],
  ['godzilla head', 'tokyo'],
  ['парк ёёги', 'tokyo'],
  ['transparent public toilet yoyogi park', 'tokyo'],
  ['yoyogi fukamachi mini park', 'tokyo'],
  ['the national art center, tokyo', 'tokyo'],
  ['gōtokuji temple', 'tokyo'],
  ['the making of harry potter - warner bros. studio tour tokyo', 'tokyo'],
  ['tokyo skytree', 'tokyo'],
  ['музей хаконе под открытым небом', 'tokyo'],
]);

const NAME_OVERRIDES = new Map([
  ['35°31\'21.2"n 138°45\'14.1"e', 'Fuji maple viewpoint'],
  ['35°29\'53.5"n 138°46\'03.0"e', 'Fuji railroad crossing'],
  ['35°18\'24.1"n 139°30\'07.7"e', 'Slam Dunk crossing'],
]);

const NOTE_OVERRIDES = new Map([
  ['mount kongo', 'Горный выезд из Осаки: тропы, виды и спокойная природа за городом.'],
  ['mount kongō', 'Горный выезд из Осаки: тропы, виды и спокойная природа за городом.'],
  ['bic camera namba store', 'Большой магазин электроники у Namba, удобно совместить с прогулкой по центру Осаки.'],
  [
    'yodobashi camera multimedia umeda',
    'Огромный магазин техники у Osaka Station: камеры, электроника и быстрый шопинг в Umeda.',
  ],
  [
    'camera kitamura osaka namba city shop',
    'Фототовары и камеры в районе Namba, полезная точка для пленки, аксессуаров или ресейла.',
  ],
  [
    'парк студии "юниверсал" в осаке',
    'Крупный тематический парк Universal Studios Japan, лучше планировать как отдельный день.',
  ],
  [
    '% arabica kyoto higashiyama',
    'Кофейная точка у Higashiyama: удобно взять кофе перед прогулкой к Yasaka Pagoda и старым улицам.',
  ],
  ['mount daimonji', 'Подъем к виду на Киото и место знаменитого огненного знака Daimonji.'],
  ['эйкан-до', 'Храм с красивыми садами и сильным осенним маршрутом рядом с Nanzen-ji.'],
  ['кинкаку-дзи', 'Золотой павильон и один из самых узнаваемых храмов Киото.'],
  ['кавагоэ', 'Дневной выезд из Токио за старым кварталом Kurazukuri и атмосферой Edo-периода.'],
  [
    '35°31\'21.2"n 138°45\'14.1"e',
    'Красивый вид на Фудзи через сакуру, а осенью и через красные клены.',
  ],
  ['35°29\'53.5"n 138°46\'03.0"e', 'Переезд с видом на Фудзи.'],
  [
    '35°18\'24.1"n 139°30\'07.7"e',
    'Поинт из аниме Slam Dunk рядом с Kamakurakokomae Station.',
  ],
  ['slow rush coffee', 'Кофейная остановка в Kamakura/Zushi-стороне, хорошо ложится в приморский маршрут.'],
  ['lawson kawaguchiko station', 'Популярная точка у Kawaguchiko Station с видом на Фудзи над магазином.'],
  ['godzilla head', 'Голова Годзиллы над Kabukicho: быстрый фото-поинт в Shinjuku.'],
  ['парк ёёги', 'Большой городской парк между Harajuku и Shibuya, хороший запасной слот для прогулки.'],
  [
    'transparent public toilet yoyogi park',
    'Архитектурная точка Tokyo Toilet у Yoyogi: короткая остановка рядом с парком.',
  ],
  [
    'yoyogi fukamachi mini park',
    'Небольшой парк у Yoyogi, интересен как часть маршрута по объектам Tokyo Toilet.',
  ],
  [
    'the national art center, tokyo',
    'Крупный музейный центр в Roppongi с выставками и эффектной стеклянной архитектурой.',
  ],
  ['gōtokuji temple', 'Тихий храм с множеством фигурок манэки-нэко, лучше ехать без спешки.'],
  [
    'the making of harry potter - warner bros. studio tour tokyo',
    'Большой студийный тур по миру Harry Potter, требует отдельного тайм-слота и билетов заранее.',
  ],
  ['tokyo skytree', 'Высокая смотровая башня в Sumida, хороший вариант для вида на город в ясную погоду.'],
  [
    'музей хаконе под открытым небом',
    'Открытый музей скульптуры в Hakone, удобно совмещать с дневным маршрутом по району.',
  ],
  [
    'gotemba premium outlets',
    'Аутлеты у Gotemba: шопинг с возможным видом на Фудзи, если повезет с погодой.',
  ],
  ['кюсю', 'Крупный южный остров Японии; точка скорее как дальняя идея вне основного маршрута.'],
  [
    "children's peace monument",
    'Мемориал Садако Сасаки и бумажных журавликов в Парке мира Хиросимы.',
  ],
  ['cue.', 'Небольшая точка в Хиросиме из списка, удобно держать как короткую остановку рядом с центром.'],
  ['kawaguchiko station', 'Главный транспортный узел у озера Kawaguchiko для маршрутов к видам на Фудзи.'],
  [
    'donguri republic - donguri kyowakoku (ghibli store)',
    'Магазин Ghibli/Donguri Republic: сувениры и мерч по фильмам Studio Ghibli.',
  ],
  [
    'hōkan-ji temple (yasaka pagoda)',
    'Пагода Yasaka в Higashiyama: один из самых фотогеничных старых видов Киото.',
  ],
  ['hario cafe kyoto store', 'Кафе HARIO в Киото, хорошая остановка для кофе рядом с Higashiyama.'],
  [
    'киотский международный музей манги',
    'Музей манги в бывшей школе: хорошая культурная пауза между храмами и центром Киото.',
  ],
  ['arashiyama bamboo forest', 'Бамбуковая роща Arashiyama, лучше приходить рано из-за толп.'],
  [
    'namba yasaka jinja',
    'Святилище в Namba с огромной сценой в форме львиной головы, короткая яркая остановка.',
  ],
  ['улица дотонбори', 'Главная неоновая улица Осаки для вечерней еды, вывесок и фото у Glico Man.'],
  ['мемориал мира в хиросиме', 'Центральная точка Парка мира в Хиросиме и важный исторический мемориал.'],
  [
    '山中湖ビーチサイドマリーナ',
    'Марина на озере Yamanakako: спокойная точка у воды и возможные виды на Фудзи.',
  ],
  ['shibuya crossing', 'Знаменитый перекресток Shibuya, лучше смотреть с уровня улицы или сверху.'],
  ['арашияма', 'Район на западе Киото: бамбук, река, мост Togetsukyo и спокойные храмовые маршруты.'],
  [
    'святилище фусими инари',
    'Святилище с тысячами красных тории на склоне горы; лучше идти рано или вечером.',
  ],
  [
    'suga shrine',
    'Святилище у знаменитой лестницы из Your Name, короткий аниме-фото-поинт в Токио.',
  ],
  ['синдзюку', 'Плотный район Токио для вечерних улиц, баров, неона и удобных пересадок.'],
  ['сибуя', 'Квартал Токио для перехода Shibuya, магазинов, кафе и вечерней городской энергии.'],
  ['гинкаку-дзи', 'Серебряный павильон у северного конца Философской тропы, тихий храмовый слот.'],
  ['nara park', 'Парк Нары с оленями, храмами и удобным дневным выездом из Osaka/Kyoto.'],
  [
    'накамегуро',
    'Район у канала Meguro: приятная прогулка, кафе и особенно сильная сакура весной.',
  ],
  ['сэнсодзи', 'Главный храм Asakusa с воротами Kaminarimon и торговой улицей Nakamise.'],
]);

const DAY_TRIP_NAMES = new Set([
  'mount kongo',
  'mount kongō',
  'кавагоэ',
  'kotsuboiijima park',
  '35°31\'21.2"n 138°45\'14.1"e',
  'fujisan shokupan',
  '35°29\'53.5"n 138°46\'03.0"e',
  'enoshima-ohashi bridge',
  '35°18\'24.1"n 139°30\'07.7"e',
  'slow rush coffee',
  'lawson kawaguchiko station',
  'музей хаконе под открытым небом',
]);

const normalize = (value) =>
  value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const slugify = (value) => {
  const ascii = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (ascii) return ascii;

  return Buffer.from(value).toString('hex').slice(0, 32);
};

const decodeHtml = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('\\u003d', '=')
    .replaceAll('\\u0026', '&')
    .replaceAll('\\u002f', '/');

const fetchText = async (url, headers = undefined) => {
  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
};

const getListEndpoint = async () => {
  const html = await fetchText(SOURCE_URL);
  const match = html.match(/\/maps\/preview\/entitylist\/getlist\?[^"'<>\\]+/);
  if (!match) {
    throw new Error(`Could not find Google Maps getlist endpoint in ${SOURCE_URL}`);
  }

  return new URL(decodeHtml(match[0]), 'https://www.google.com/maps').toString();
};

const parseGoogleResponse = (text) => {
  const jsonText = text.replace(/^\)\]\}'\n/, '');
  const data = JSON.parse(jsonText);
  const entries = data?.[0]?.[8];
  if (!Array.isArray(entries)) {
    throw new Error('Google Maps response shape changed: expected entries at data[0][8]');
  }

  return entries
    .map((entry, index) => {
      const metadata = entry?.[1] ?? [];
      const coords = metadata?.[5] ?? [];
      const rawName = String(entry?.[2] ?? '').trim();
      const rawNote = String(entry?.[3] ?? '').trim();
      const lat = coords?.[2];
      const lng = coords?.[3];

      if (!rawName || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;

      const normalized = normalize(rawName);
      const city = CITY_BY_NAME.get(normalized) ?? 'other';
      const name = NAME_OVERRIDES.get(normalized) ?? rawName;
      const note = NOTE_OVERRIDES.get(normalized) ?? rawNote;

      return {
        sourceIndex: index,
        id: `${slugify(name)}${city === 'other' ? '-google' : ''}`,
        name,
        city,
        coords: { lat, lng },
        note,
        isDayTrip: DAY_TRIP_NAMES.has(normalized),
      };
    })
    .filter(Boolean);
};

const uniqueIds = (places) => {
  const seen = new Map();

  return places.map((place) => {
    const count = seen.get(place.id) ?? 0;
    seen.set(place.id, count + 1);
    return count === 0 ? place : { ...place, id: `${place.id}-${count + 1}` };
  });
};

const tsString = (value) => JSON.stringify(value);

const formatPlace = (place) => {
  const lines = [
    '  {',
    `    id: ${tsString(place.id)},`,
    `    name: ${tsString(place.name)},`,
    `    city: ${tsString(place.city)},`,
    `    coords: { lat: ${place.coords.lat}, lng: ${place.coords.lng} },`,
  ];

  if (place.note) lines.push(`    note: ${tsString(place.note)},`);
  if (place.isDayTrip) lines.push('    isDayTrip: true,');

  lines.push('  }');
  return lines.join('\n');
};

const renderFile = (places) => `import type { CityId } from './types';

export interface FriendsMapPlace {
  id: string;
  name: string;
  city: CityId;
  coords: { lat: number; lng: number };
  note?: string;
  isDayTrip?: boolean;
}

// Generated by scripts/sync-google-map-points.mjs from ${SOURCE_URL}
export const friendsMapPlaces: FriendsMapPlace[] = [
${places.map(formatPlace).join(',\n')}
];
`;

const endpoint = await getListEndpoint();
const responseText = await fetchText(endpoint);
const places = uniqueIds(parseGoogleResponse(responseText)).sort((a, b) => {
  const cityDiff = CITY_ORDER.indexOf(a.city) - CITY_ORDER.indexOf(b.city);
  return cityDiff || a.sourceIndex - b.sourceIndex;
});

await writeFile(OUTPUT_PATH, renderFile(places));

const counts = places.reduce((acc, place) => {
  acc[place.city] = (acc[place.city] ?? 0) + 1;
  return acc;
}, {});

console.log(
  `Wrote ${places.length} Google Maps points to ${OUTPUT_PATH.pathname}: ${CITY_ORDER.map(
    (city) => `${city}=${counts[city] ?? 0}`,
  ).join(', ')}`,
);
