export type ShoppingCategory =
  | 'beauty'
  | 'health'
  | 'fashion'
  | 'accessories'
  | 'kitchen'
  | 'electronics'
  | 'eyewear'
  | 'hobby'
  | 'outdoor'
  | 'services';

export type DealTag =
  | 'gift'
  | 'compact'
  | 'voltage'
  | 'taxfree'
  | 'warranty'
  | 'language'
  | 'bulky';

export interface ShoppingCategoryMeta {
  id: ShoppingCategory;
  icon: string;
  label: string;
}

export interface ShoppingDeal {
  id: string;
  category: ShoppingCategory;
  product: string;
  shortName: string;
  image: string;
  imageLabel: string;
  japanPrice: string;
  worldPrice: string;
  savings: string;
  savingsPercent: number;
  reason: string;
  tags: DealTag[];
  bestPlaces: string[];
  description: string;
  note?: string;
  buyIn: {
    osaka: string[];
    kyoto: string[];
    tokyo: string[];
  };
}

export interface ShoppingSource {
  label: string;
  url: string;
}

export const shoppingCheckedAt = '8 июня 2026';

// JPY→RUB по курсу ЦБ РФ на дату сверки (100 ¥ = 45.93 ₽). Обновляй вместе с shoppingCheckedAt.
export const jpyToRubRate = 0.46;

export const shoppingCategories: ShoppingCategoryMeta[] = [
  { id: 'beauty', icon: '💄', label: 'Косметика' },
  { id: 'health', icon: '🧴', label: 'Аптека' },
  { id: 'fashion', icon: '👟', label: 'Одежда' },
  { id: 'accessories', icon: '⌚', label: 'Аксессуары' },
  { id: 'kitchen', icon: '🔪', label: 'Кухня' },
  { id: 'electronics', icon: '🎮', label: 'Техника' },
  { id: 'eyewear', icon: '👓', label: 'Очки' },
  { id: 'hobby', icon: '🎨', label: 'Хобби' },
  { id: 'outdoor', icon: '🏕️', label: 'Outdoor' },
  { id: 'services', icon: '🧳', label: 'Услуги' },
];

export const shoppingSources: ShoppingSource[] = [
  {
    label: 'ЦБ РФ: JPY/RUB',
    url: 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=08/06/2026',
  },
  {
    label: 'Japan tax-free guide',
    url: 'https://www.nta.go.jp/publication/pamph/shohi/menzei/201805/pdf/explanation_eng.pdf',
  },
  {
    label: 'UNIQLO Japan',
    url: 'https://www.uniqlo.com/jp/ja/',
  },
  {
    label: 'Bic Camera',
    url: 'https://www.biccamera.com/',
  },
  {
    label: 'Yodobashi',
    url: 'https://www.yodobashi.com/',
  },
  {
    label: 'Nintendo Switch 2 lineup',
    url: 'https://www.nintendo.com/jp/hardware/switch2/lineup/index.html',
  },
  {
    label: 'PlayStation Blog price update',
    url: 'https://blog.ja.playstation.com/2026/03/27/20260327-ps5-price-update-o/',
  },
  {
    label: 'Zoff tourist glasses',
    url: 'https://www.zoff.co.jp/shop/about/tourist.aspx',
  },
  {
    label: 'JINS international FAQ',
    url: 'https://faq-jp.jins.com/jp/faq/glasses/faq_detail.html?category=3040&id=1627&page=1',
  },
  {
    label: 'OWNDAYS services',
    url: 'https://www.owndays.com/jp/en/services',
  },
  {
    label: 'Garmin Japan',
    url: 'https://www.garmin.co.jp/products/wearables/forerunner-965-black/',
  },
  {
    label: 'e-earphone',
    url: 'https://www.e-earphone.jp/',
  },
  {
    label: 'Pokemon Center',
    url: 'https://www.pokemoncenter-online.com/',
  },
  {
    label: 'Yamato TA-Q-BIN',
    url: 'https://www.kuronekoyamato.co.jp/ytc/en/send/services/takkyubin/',
  },
];

export const shoppingDeals: ShoppingDeal[] = [
  {
    id: 'j-scent',
    category: 'beauty',
    product: 'J-Scent Eau de Parfum 50 ml',
    shortName: 'J-Scent',
    image: 'photos/tokyo/ginza.jpg',
    imageLabel: 'Ginza: парфюмерные корнеры, Isetan и универмаги',
    japanPrice: 'около ¥4,950',
    worldPrice: 'около 24,900 ₽ за импорт',
    savings: 'до 90%',
    savingsPercent: 90,
    reason: 'Нишевый парфюм в РФ — с огромной импортной наценкой',
    tags: ['compact', 'gift'],
    bestPlaces: ['Токио · Isetan Shinjuku', 'Осака · Umeda Hankyu / Hanshin'],
    description:
      'Японская нишевая парфюмерия в РФ продается с огромной наценкой. В Японии это компактная покупка на один вечерний заход в универмаг.',
    note: '50 мл можно в ручную кладь в прозрачном пакете для жидкостей.',
    buyIn: {
      osaka: ['Umeda Hankyu / Hanshin beauty floors', 'Shinsaibashi Parco beauty zone'],
      kyoto: ['Kyoto Isetan у Kyoto Station', 'Kyoto BAL и соседние beauty-секции'],
      tokyo: ['Isetan Shinjuku', 'Ginza Mitsukoshi / Matsuya Ginza', 'Tsutaya и нишевые корнеры'],
    },
  },
  {
    id: 'kate-heroine',
    category: 'beauty',
    product: 'KATE Lip Monster + Heroine Make mascara',
    shortName: 'KATE / Heroine',
    image: 'photos/osaka/dotonbori.webp',
    imageLabel: 'Dotonbori: Donki и drugstore-покупки поздно вечером',
    japanPrice: 'около ¥1,320-1,540',
    worldPrice: 'около 4,500-5,500 ₽',
    savings: 'до 85%',
    savingsPercent: 85,
    reason: 'Тушь, тинты и помады — как обычная косметика, не импорт',
    tags: ['compact', 'gift'],
    bestPlaces: ['Осака · Don Quijote Dotonbori', 'Токио · @cosme Tokyo'],
    description:
      'Самая простая категория для закупки подарков: тушь, тинты и помады стоят в Японии как обычная косметика, а не редкий импорт.',
    note: 'Популярные оттенки Lip Monster быстро разбирают; сверяй номер оттенка и тип туши.',
    buyIn: {
      osaka: ['Don Quijote Dotonbori', 'Matsumoto Kiyoshi Shinsaibashi', '@cosme Osaka'],
      kyoto: ['Matsukiyo Shijo Kawaramachi', 'Don Quijote Kyoto Avanti', 'Loft Kyoto'],
      tokyo: ['Matsukiyo Ginza / Shinjuku', 'Donki Shibuya / Shinjuku', '@cosme Tokyo'],
    },
  },
  {
    id: 'skin-aqua-melano',
    category: 'beauty',
    product: 'Skin Aqua, Melano CC, CANMAKE, Softymo',
    shortName: 'J-beauty уход',
    image: 'photos/tokyo/shinjuku.jpg',
    imageLabel: 'Shinjuku: Matsukiyo, Donki и Bic в шаговой доступности',
    japanPrice: 'около ¥700-1,630',
    worldPrice: 'около 1,600-3,400 ₽',
    savings: '60-80%',
    savingsPercent: 80,
    reason: 'Санскрины и витамин C дёшевы, добивают чек до tax-free',
    tags: ['compact', 'gift', 'taxfree'],
    bestPlaces: ['Осака · Matsukiyo Shinsaibashi', 'Токио · Matsukiyo Shinjuku'],
    description:
      'Санскрины, гидрофильное масло и витамин C дают высокий процент экономии и хорошо добивают чек до tax-free.',
    note: 'Флаконы больше 100 мл клади в багаж. У санскринов много региональных формул и старых версий.',
    buyIn: {
      osaka: ['Matsukiyo Shinsaibashi', 'Don Quijote Dotonbori', 'Bic Camera Namba beauty floor'],
      kyoto: ['Matsukiyo Shijo Kawaramachi', 'Don Quijote Kyoto Avanti', 'Yodobashi Kyoto'],
      tokyo: ['Matsukiyo Shinjuku', 'Donki Shibuya / Shinjuku', 'Bic Camera Yurakucho'],
    },
  },
  {
    id: 'dhc-salonpas-santear',
    category: 'health',
    product: 'DHC Vitamin C, Salonpas, Soft Santear',
    shortName: 'DHC / Salonpas',
    image: 'photos/tokyo/asakusa.jpeg',
    imageLabel: 'Аптечная мелочь есть почти в любом туристическом районе',
    japanPrice: 'около ¥439-1,039',
    worldPrice: 'около 1,500-3,600 ₽',
    savings: '65-85%',
    savingsPercent: 85,
    reason: 'БАДы, пластыри и капли для линз — дешевле в разы',
    tags: ['compact', 'gift'],
    bestPlaces: ['Осака · Matsukiyo Shinsaibashi', 'Токио · Welcia Shinjuku'],
    description:
      'Простые БАДы, пластыри и капли для линз часто дешевле в разы. Это компактные товары с понятной повседневной пользой.',
    note: 'Не закупай лекарства коммерческими количествами. Сложные препараты от боли, простуды и сна проверяй по составу.',
    buyIn: {
      osaka: ['Matsukiyo Shinsaibashi', 'Sugi Drug Namba', 'Don Quijote Dotonbori'],
      kyoto: ['Matsukiyo Shijo Kawaramachi', 'Sugi Drug Kyoto Station', 'Don Quijote Kyoto Avanti'],
      tokyo: ['Matsukiyo Ginza / Shinjuku', 'Welcia Shinjuku', 'Donki Shibuya'],
    },
  },
  {
    id: 'uniqlo-gu-muji',
    category: 'fashion',
    product: 'UNIQLO AIRism, GU basics, MUJI cotton',
    shortName: 'UNIQLO / GU / MUJI',
    image: 'photos/tokyo/ginza.jpg',
    imageLabel: 'Ginza: флагманы UNIQLO, GU и MUJI',
    japanPrice: 'около ¥990-7,990',
    worldPrice: 'около 2,000-8,000+ ₽',
    savings: '50-75%',
    savingsPercent: 75,
    reason: 'Базовый гардероб дешевле и свежее по коллекциям',
    tags: ['taxfree'],
    bestPlaces: ['Токио · UNIQLO Ginza', 'Осака · MUJI Grand Front Osaka'],
    description:
      'База для поездки и дома: футболки, AIRism, носки, белье и легкий пух часто дешевле и свежее по коллекциям.',
    note: 'Японская размерная сетка меньше европейской; верхнюю одежду лучше примерять.',
    buyIn: {
      osaka: ['UNIQLO Shinsaibashi', 'GU Umeda', 'MUJI Grand Front Osaka'],
      kyoto: ['UNIQLO Kyoto Kawaramachi', 'GU Kyoto Avanti', 'MUJI Kyoto BAL'],
      tokyo: ['UNIQLO Ginza / Shinjuku', 'GU Ginza', 'MUJI Ginza'],
    },
  },
  {
    id: 'asics-onitsuka',
    category: 'fashion',
    product: 'ASICS GEL-NYC / GEL-KAYANO и Onitsuka Tiger Mexico 66',
    shortName: 'ASICS / Onitsuka',
    image: 'photos/tokyo/omotesando.jpeg',
    imageLabel: 'Omotesando и Harajuku: сильные точки для кроссовок',
    japanPrice: 'около ¥16,500-22,000',
    worldPrice: 'около 18,990-25,900 ₽',
    savings: '35-65%',
    savingsPercent: 65,
    reason: 'Кроссовки дешевле серого рынка, особенно беговые ASICS',
    tags: ['taxfree'],
    bestPlaces: ['Токио · Onitsuka Tiger Omotesando', 'Осака · ASICS Shinsaibashi'],
    description:
      'Кроссовки часто заметно дешевле российского серого рынка, особенно беговые ASICS и популярные Onitsuka.',
    note: 'Проверяй ширину колодки и наличие больших размеров. Популярные расцветки уходят быстро.',
    buyIn: {
      osaka: ['ASICS Osaka Shinsaibashi', 'Onitsuka Tiger Namba', 'ABC-Mart Grand Stage Umeda'],
      kyoto: ['ABC-Mart Grand Stage Kyoto', 'ASICS / Onitsuka отделы в Kawaramachi'],
      tokyo: ['ASICS Harajuku / Ginza', 'Onitsuka Tiger Omotesando', 'ABC-Mart Grand Stage Shibuya'],
    },
  },
  {
    id: 'gshock-seiko-citizen',
    category: 'accessories',
    product: 'G-Shock DW-5600, Seiko 5, Citizen Tsuyosa',
    shortName: 'JDM-часы',
    image: 'photos/tokyo/akihabara.jpg',
    imageLabel: 'Akihabara: Yodobashi и часовые витрины в электронике',
    japanPrice: 'около ¥11,440-46,200',
    worldPrice: 'около 11,900-33,000 ₽',
    savings: '35-55%',
    savingsPercent: 55,
    reason: 'Точные модели в Bic/Yodobashi: tax-free и баллы',
    tags: ['compact', 'taxfree', 'gift'],
    bestPlaces: ['Токио · Yodobashi Akiba', 'Осака · Bic Camera Namba'],
    description:
      'Понятная категория для покупки в Bic/Yodobashi: точные модели, tax-free и иногда магазинные points.',
    note: 'Сверяй референс и гарантию. Российское обслуживание японской версии может быть ограничено.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Camera Umeda', 'The Clock House Osaka'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto', 'The Clock House Kyoto'],
      tokyo: ['Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho', 'Seiko Dream Square Ginza'],
    },
  },
  {
    id: 'porter-anello',
    category: 'accessories',
    product: 'Porter/Yoshida bags и Anello backpacks',
    shortName: 'Porter / Anello',
    image: 'photos/tokyo/daikanyama.jpeg',
    imageLabel: 'Daikanyama и Omotesando: спокойный маршрут за сумками',
    japanPrice: 'около ¥4,950-42,900',
    worldPrice: 'около 5,000-36,000+ ₽',
    savings: '35-55%',
    savingsPercent: 55,
    reason: 'Porter без наценки в офиц. точках, Anello — бюджетно',
    tags: ['taxfree'],
    bestPlaces: ['Токио · Porter Omotesando', 'Осака · Kura Chika by Porter Osaka'],
    description:
      'Porter лучше брать в официальных точках, Anello - как практичный недорогой рюкзак без импортной наценки.',
    note: 'У Porter много фейков и ресейла; чек и официальный магазин сильно снижают риск.',
    buyIn: {
      osaka: ['Kura Chika by Porter Osaka', 'Loft Umeda', 'Hands Shinsaibashi'],
      kyoto: ['Kyoto BAL', 'Loft Kyoto', 'Hands Kyoto'],
      tokyo: ['Porter Omotesando', 'Kura Chika Marunouchi', 'Loft Shibuya / Ginza'],
    },
  },
  {
    id: 'jins-zoff-basic-glasses',
    category: 'eyewear',
    product: 'JINS, Zoff, OWNDAYS, Megane Ichiba prescription glasses',
    shortName: 'Очки с диоптриями',
    image: 'photos/tokyo/shibuya_cross.jpg',
    imageLabel: 'Shibuya и Shinjuku: быстрые сети оптики рядом с маршрутом',
    japanPrice: 'около ¥5,500-15,000+',
    worldPrice: 'около 5,000-30,000 ₽+',
    savings: '50-80%',
    savingsPercent: 80,
    reason: 'Базовые, 1.74, фотохром и прогрессивы сильно дешевле РФ',
    tags: ['compact', 'taxfree'],
    bestPlaces: ['Осака · JINS / Zoff / Megane Ichiba Namba', 'Токио · Zoff / OWNDAYS Shinjuku'],
    description:
      'Самый надежный optical-deal: обычные single-vision очки часто готовы за 30-60 минут, а 1.67-1.74, фотохром, цветные и прогрессивные линзы стоят намного доступнее РФ.',
    note: 'Иди в первый день поездки. Возьми рецепт с SPH / CYL / AXIS / ADD / PD латиницей, паспорт и текущие очки. Сложные рецепты могут занять 7-10 дней.',
    buyIn: {
      osaka: ['JINS Namba Parks / Umeda', 'Zoff Shinsaibashi / Namba', 'Megane Ichiba Shinsaibashi'],
      kyoto: ['Zoff Kyoto Kawaramachi', 'Megane Ichiba Kyoto Shijodori', 'JINS Kyoto Teramachi'],
      tokyo: ['JINS Shinjuku / Shibuya', 'Zoff Yaechika / Shinjuku', 'OWNDAYS Ginza / Shinjuku'],
    },
  },
  {
    id: 'tojiro-global-kai',
    category: 'kitchen',
    product: 'Tojiro F-808, Global G-2, Kai Shun',
    shortName: 'Японские ножи',
    image: 'photos/kyoto/nishiki_market.webp',
    imageLabel: 'Nishiki Market: кухонные магазины и Aritsugu',
    japanPrice: 'около ¥12,100-23,100',
    worldPrice: 'около 11,000-22,800 ₽',
    savings: '50-60%',
    savingsPercent: 60,
    reason: 'Шире выбор, проще проверить оригинал, ниже цена',
    tags: ['taxfree'],
    bestPlaces: ['Киото · Aritsugu Nishiki Market', 'Токио · Kappabashi'],
    description:
      'Ножи дают понятную выгоду: шире выбор, проще проверить оригинал и ниже цена на японские бренды.',
    note: 'Ножи только в сдаваемый багаж. Упакуй лезвие и сохрани чек.',
    buyIn: {
      osaka: ['Tower Knives Osaka', 'Doguyasuji Shotengai', 'kitchen stores near Namba'],
      kyoto: ['Aritsugu Nishiki Market', 'kitchen shops around Nishiki'],
      tokyo: ['Kappabashi', 'Kama-Asa', 'Tojiro Tokyo Store'],
    },
  },
  {
    id: 'zojirushi-tiger',
    category: 'kitchen',
    product: 'Zojirushi и Tiger термокружки',
    shortName: 'Zojirushi / Tiger',
    image: 'photos/osaka/umeda_sky_building.avif',
    imageLabel: 'Umeda: Yodobashi и крупные магазины техники рядом со станцией',
    japanPrice: 'около ¥2,920-3,420',
    worldPrice: 'около 4,600-7,000 ₽',
    savings: '65-75%',
    savingsPercent: 75,
    reason: 'Лёгкая небьющаяся термокружка дешевле крупной техники',
    tags: ['compact', 'gift'],
    bestPlaces: ['Осака · Yodobashi Umeda', 'Токио · Bic Camera Yurakucho'],
    description:
      'Легкая, небьющаяся и полезная покупка. Часто выгоднее, чем крупная японская кухонная техника.',
    note: 'Рисоварки и часть техники на 100V лучше не брать без трансформатора; термосы безопасны.',
    buyIn: {
      osaka: ['Yodobashi Umeda', 'Bic Camera Namba', 'Hands Shinsaibashi'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto', 'Loft Kyoto'],
      tokyo: ['Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho', 'Hands Shibuya'],
    },
  },
  {
    id: 'switch2-multilang-games',
    category: 'electronics',
    product: 'Nintendo Switch 2 Multi-Language System, Pro Controller, physical games',
    shortName: 'Switch 2 Multi-Language',
    image: 'photos/osaka/den-den-town.webp',
    imageLabel: 'Den Den Town: игровые магазины и техника в Осаке',
    japanPrice: 'около ¥9,980-69,980',
    worldPrice: 'около 7,500-55,000 ₽',
    savings: '35-52%',
    savingsPercent: 52,
    reason: 'Консоль, Pro Controller и картриджи заметно дешевле РФ-импорта',
    tags: ['taxfree', 'language', 'warranty'],
    bestPlaces: ['Осака · Bic Camera Namba / Joshin', 'Токио · Nintendo Tokyo / Yodobashi Akiba'],
    description:
      'Сильный игровой deal, но только если это Multi-Language System или аксессуары/физические игры. Pro Controller и картриджи проще всего проверить и увезти.',
    note: 'Не бери Nintendo Switch 2 Japanese-Language System: у нее только японский язык и привязка к Nintendo Account Japan.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Umeda', 'Joshin Super Kids Land / Den Den Town'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto', 'Nintendo Kyoto'],
      tokyo: ['Nintendo Tokyo / Osaka-style stock checks', 'Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho'],
    },
  },
  {
    id: 'psvr2-quest3s',
    category: 'electronics',
    product: 'PlayStation VR2 и Meta Quest 3S',
    shortName: 'PS VR2 / Quest 3S',
    image: 'photos/tokyo/akihabara.jpg',
    imageLabel: 'Akihabara: VR-шлемы лучше проверять в крупных сетях',
    japanPrice: 'около ¥59,400-66,980',
    worldPrice: 'около 34,000-58,000 ₽',
    savings: '28-52%',
    savingsPercent: 52,
    reason: 'PS VR2 силен по скидке, Quest 3S проходит порог как standalone VR',
    tags: ['taxfree', 'warranty', 'language'],
    bestPlaces: ['Токио · Yodobashi Akiba / Bic Yurakucho', 'Осака · Bic Camera Namba'],
    description:
      'VR оказался сильнее больших консолей как travel-покупка: PS VR2 заметно дешевле РФ, Quest 3S работает автономно и не требует 100V.',
    note: 'PS5 Pro и Quest 3 не включены: после свежих повышений/багажа экономия слабее. У Quest проверь Meta-аккаунт, у PS VR2 - комплектность.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Umeda', 'Sofmap Namba / Den Den Town'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho', 'Sony Store Ginza'],
    },
  },
  {
    id: 'gamepads-ps-nintendo',
    category: 'electronics',
    product: 'DualSense, DualSense Edge, Nintendo Switch 2 Pro Controller',
    shortName: 'Геймпады',
    image: 'photos/tokyo/akihabara.jpg',
    imageLabel: 'Akihabara: геймпады и аксессуары удобно сверять по витринам',
    japanPrice: 'около ¥9,800-34,980',
    worldPrice: 'около 6,000-21,000 ₽',
    savings: '30-52%',
    savingsPercent: 52,
    reason: 'Компактная игровая покупка без проблем с питанием',
    tags: ['compact', 'taxfree', 'gift', 'warranty'],
    bestPlaces: ['Токио · Yodobashi Akiba', 'Осака · Bic Camera Namba'],
    description:
      'Лучше крупных консолей как travel-покупка: работают в РФ, легко увезти, а DualSense Edge и Switch 2 Pro Controller часто дают максимальный процент экономии.',
    note: 'Гарантия японская. Для PC у Switch 2 Pro Controller совместимость хуже, чем у DualSense.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Umeda', 'Joshin Super Kids Land'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho', 'Sofmap Akihabara'],
    },
  },
  {
    id: 'fujifilm-x100vi',
    category: 'electronics',
    product: 'Fujifilm X100VI JP/EN model',
    shortName: 'Fujifilm X100VI',
    image: 'photos/tokyo/daikanyama.jpeg',
    imageLabel: 'Daikanyama: фотодень легко совместить с камерными магазинами',
    japanPrice: 'около ¥281,600',
    worldPrice: 'около 230,000 ₽',
    savings: '45-50%',
    savingsPercent: 50,
    reason: 'Если есть в наличии, камера сильно дешевле РФ-импорта',
    tags: ['compact', 'taxfree', 'warranty', 'language'],
    bestPlaces: ['Токио · Map Camera Shinjuku', 'Осака · Bic Camera Namba'],
    description:
      'Редкий, но сильный фото-deal: X100VI работает в РФ, а экономия перекрывает японскую гарантию, если модель действительно доступна по розничной цене.',
    note: 'Главный риск - дефицит. Проверь меню JP/EN, отсутствие русского языка и наличие tax-free до оплаты.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Umeda', 'Kitamura camera stores'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['Map Camera Shinjuku', 'Bic Camera Yurakucho', 'Yodobashi Akiba / Shinjuku'],
    },
  },
  {
    id: 'sony-wf1000xm5',
    category: 'electronics',
    product: 'Technics EAH-AZ100 и Sony WF-1000XM5',
    shortName: 'Premium earbuds',
    image: 'photos/tokyo/shibuya_cross.jpg',
    imageLabel: 'Shibuya: наушники удобно тестировать в Bic и e-earphone',
    japanPrice: 'около ¥24,399-39,600',
    worldPrice: 'около 18,400-20,700 ₽',
    savings: '20-45%',
    savingsPercent: 45,
    reason: 'Technics силен по низкой цене, Sony выгоден только до ¥25,000',
    tags: ['compact', 'taxfree', 'gift', 'warranty'],
    bestPlaces: ['Осака · e-earphone Nipponbashi', 'Токио · e-earphone Akihabara'],
    description:
      'Компактная и понятная покупка: Bluetooth и USB-C работают глобально. Technics AZ100 проходит порог по Kakaku/скидкам, Sony WF-1000XM5 - только при цене до ¥25,000.',
    note: 'Проверь цвет, голосовые подсказки и гарантию. Если Sony дороже ¥25,000, сравни с РФ перед покупкой.',
    buyIn: {
      osaka: ['e-earphone Osaka Nipponbashi', 'Bic Camera Namba', 'Yodobashi Umeda'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['e-earphone Akihabara', 'Yodobashi Akiba', 'Bic Camera Shinjuku'],
    },
  },
  {
    id: 'garmin-forerunner-965',
    category: 'electronics',
    product: 'Garmin Forerunner 965',
    shortName: 'Garmin 965',
    image: 'photos/tokyo/kawaguchiko.webp',
    imageLabel: 'Fuji area: Garmin логично брать под маршрут и трекинг',
    japanPrice: 'около ¥67,840-76,320',
    worldPrice: 'около 59,990 ₽',
    savings: 'около 40%',
    savingsPercent: 40,
    reason: 'Спортивные часы проходят порог только на sale / tax-free',
    tags: ['compact', 'taxfree', 'warranty', 'language'],
    bestPlaces: ['Токио · Yodobashi Akiba', 'Осака · Garmin dealers / Bic'],
    description:
      'Forerunner 965 имеет смысл при скидке или tax-free: это компактная покупка для бега и трекинга, но не универсальный smartwatch для РФ.',
    note: 'Порог покупки: примерно ¥74,000 или ниже. Заранее проверь язык, регион карт и Garmin Pay.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Umeda', 'Garmin dealer stores'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho', 'Garmin dealer stores'],
    },
  },
  {
    id: 'lamdash-refa-smartw',
    category: 'electronics',
    product: 'Panasonic Lamdash PRO 6 и ReFa BEAUTECH DRYER SMART W',
    shortName: 'Lamdash / ReFa W',
    image: 'photos/osaka/umeda_sky_building.avif',
    imageLabel: 'Umeda: крупные сети техники рядом со станцией',
    japanPrice: 'около ¥40,000-55,000',
    worldPrice: 'около 32,400-56,700 ₽',
    savings: '40-55%',
    savingsPercent: 55,
    reason: 'Выгодны только версии с 100-240V и понятной моделью',
    tags: ['taxfree', 'warranty'],
    bestPlaces: ['Осака · Yodobashi Umeda', 'Токио · Bic Camera Yurakucho'],
    description:
      'Lamdash PRO 6 и ReFa SMART W - редкие примеры уходовой техники, которую можно брать для РФ без тяжелого трансформатора.',
    note: 'Критично: на коробке/блоке должно быть AC100-240V. Dyson Japan, Nanocare domestic и рисоварки на 100V не бери.',
    buyIn: {
      osaka: ['Yodobashi Umeda', 'Bic Camera Namba', 'department stores with ReFa counters'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['Bic Camera Yurakucho', 'Yodobashi Akiba / Shinjuku', 'ReFa counters in department stores'],
    },
  },
  {
    id: 'pokemon-nendoroid-animate',
    category: 'hobby',
    product: 'Pokemon Center plush, Nendoroid, Animate acrylic stands',
    shortName: 'Pokemon / Nendoroid',
    image: 'photos/tokyo/akihabara.jpg',
    imageLabel: 'Akihabara: фигурки, мерч и б/у-витрины',
    japanPrice: 'около ¥1,540-7,020',
    worldPrice: 'около 3,100-9,500 ₽',
    savings: '55-85%',
    savingsPercent: 85,
    reason: 'Официальная коллекционка дешевле и безопаснее импорта',
    tags: ['gift'],
    bestPlaces: ['Токио · Pokemon Center Tokyo DX', 'Осака · Pokemon Center Osaka'],
    description:
      'Официальная мелкая коллекционка в Японии обычно дешевле и безопаснее маркетплейс-импорта.',
    note: 'В Mandarake/Surugaya проверяй состояние. Коробки объемные, а лимитки быстро распродаются.',
    buyIn: {
      osaka: ['Pokemon Center Osaka', 'Animate Osaka Nipponbashi', 'Den Den Town'],
      kyoto: ['Pokemon Center Kyoto', 'Animate Kyoto', 'Kyoto International Manga Museum shop'],
      tokyo: ['Pokemon Center Tokyo DX / Shibuya', 'Animate Ikebukuro', 'Akihabara shops'],
    },
  },
  {
    id: 'gunpla',
    category: 'hobby',
    product: 'Bandai Gunpla MG/RG kits',
    shortName: 'Gunpla',
    image: 'photos/osaka/den-den-town.webp',
    imageLabel: 'Den Den Town и Akihabara: модельки и инструменты',
    japanPrice: 'около ¥8,140',
    worldPrice: 'около 17,000 ₽',
    savings: 'до 75%',
    savingsPercent: 75,
    reason: 'Наборы Bandai дешевле по японской рознице',
    tags: ['gift'],
    bestPlaces: ['Токио · Gundam Base Tokyo', 'Осака · Joshin Super Kids Land'],
    description:
      'Наборы Bandai сильно дешевле при покупке по японской рознице, особенно если не нужен редкий ресейл.',
    note: 'Большие коробки легко мнутся и быстро забивают чемодан. У популярных релизов бывают лимиты.',
    buyIn: {
      osaka: ['Yodobashi Umeda', 'Joshin Super Kids Land', 'Den Den Town'],
      kyoto: ['Yodobashi Kyoto', 'Loft Kyoto', 'Animate Kyoto'],
      tokyo: ['Yodobashi Akiba', 'TamTam Akihabara', 'Gundam Base Tokyo'],
    },
  },
  {
    id: 'copic-holbein',
    category: 'hobby',
    product: 'Copic Sketch 72 и Holbein colored pencils',
    shortName: 'Copic / Holbein',
    image: 'photos/kyoto/manga_museum.jpeg',
    imageLabel: 'Kyoto Manga Museum: хороший якорь для арт-дня',
    japanPrice: 'около ¥35,640-41,250',
    worldPrice: 'около 51,000-68,000 ₽',
    savings: '50-75%',
    savingsPercent: 75,
    reason: 'Маркеры и карандаши дешевле импорта, особенно наборами',
    tags: ['taxfree'],
    bestPlaces: ['Токио · Sekaido Shinjuku', 'Осака · Yodobashi Umeda'],
    description:
      'Профессиональные маркеры и карандаши в Японии заметно дешевле импорта, особенно большими наборами.',
    note: 'Наборы тяжелые: Copic 72 около 1.3 кг, Holbein 150 еще массивнее.',
    buyIn: {
      osaka: ['Yodobashi Umeda', 'Loft Umeda', 'Hands Shinsaibashi'],
      kyoto: ['Loft Kyoto', 'Yodobashi Kyoto', 'Animate Kyoto art corners'],
      tokyo: ['Sekaido Shinjuku', 'Tools Ochanomizu', 'Yodobashi Akiba'],
    },
  },
  {
    id: 'snowpeak-soto-shimano',
    category: 'outdoor',
    product: 'Snow Peak titanium mug, SOTO WindMaster, Shimano/Daiwa reels',
    shortName: 'Outdoor / fishing',
    image: 'photos/tokyo/kawaguchiko.webp',
    imageLabel: 'Fuji area: outdoor-покупки особенно легко оправдать маршрутом',
    japanPrice: 'около ¥3,520-51,568',
    worldPrice: 'около 6,400-43,000 ₽',
    savings: '45-75%',
    savingsPercent: 75,
    reason: 'Титановая кружка, горелка, катушка — без наценки',
    tags: ['compact', 'gift', 'taxfree'],
    bestPlaces: ['Токио · WILD-1', 'Осака · Alpen Outdoors Namba'],
    description:
      'Лучше всего работают компактные товары: титановая кружка, горелка без баллона, катушка или велокомпонент.',
    note: 'Газовые баллоны в самолет нельзя. У дорогих JDM-катушек сервис фактически японский.',
    buyIn: {
      osaka: ['Alpen Outdoors Namba', 'Yodobashi Umeda', 'fishing shops around Umeda / Namba'],
      kyoto: ['Yodobashi Kyoto', 'Alpen / Sports Depo', 'outdoor shops near Kawaramachi'],
      tokyo: ['WILD-1', 'L-Breath / Victoria Shinjuku', 'Yodobashi Akiba'],
    },
  },
  {
    id: 'esim-yamato-jins',
    category: 'services',
    product: 'eSIM и Yamato luggage delivery',
    shortName: 'Связь / багаж',
    image: 'photos/tokyo/shibuya_cross.jpg',
    imageLabel: 'Shibuya: связь и багажные сервисы решают логистику',
    japanPrice: 'примерно ¥1,000-3,000',
    worldPrice: 'около 3,900 ₽+ или дороже у посредников',
    savings: 'высокая ценность',
    savingsPercent: 0,
    reason: 'Связь и доставка чемодана часто экономят больше сил, чем денег',
    tags: ['compact'],
    bestPlaces: ['Токио · eSIM online / Yamato counters', 'Осака · Yamato через отель'],
    description:
      'Это не сувениры, но часто экономит силы на маршруте: связь без роуминга и отправка чемодана между отелями.',
    note: 'Для eSIM нужен unlocked phone, для Yamato - запас времени и корректный адрес следующего отеля.',
    buyIn: {
      osaka: ['FamilyMart / IIJ eSIM', 'Yamato counters or hotel front desk'],
      kyoto: ['FamilyMart', 'Yamato через отель'],
      tokyo: ['Ubigi / Willer online', 'Yamato / JAL ABC airports'],
    },
  },
];
