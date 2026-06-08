export type ShoppingCategory =
  | 'beauty'
  | 'health'
  | 'fashion'
  | 'accessories'
  | 'kitchen'
  | 'electronics'
  | 'hobby'
  | 'outdoor'
  | 'services';

export type DealTag = 'gift' | 'compact' | 'voltage' | 'taxfree';

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

export const shoppingCategories: ShoppingCategoryMeta[] = [
  { id: 'beauty', icon: '💄', label: 'Косметика' },
  { id: 'health', icon: '🧴', label: 'Аптека' },
  { id: 'fashion', icon: '👟', label: 'Одежда' },
  { id: 'accessories', icon: '⌚', label: 'Аксессуары' },
  { id: 'kitchen', icon: '🔪', label: 'Кухня' },
  { id: 'electronics', icon: '🎮', label: 'Техника' },
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
    id: 'ricoh-switch-ps5',
    category: 'electronics',
    product: 'Ricoh GR IIIx, Switch 2 Multi-Language, PS5 Pro',
    shortName: 'Камеры и консоли',
    image: 'photos/osaka/den-den-town.webp',
    imageLabel: 'Den Den Town: техника, игры и хобби в Осаке',
    japanPrice: 'около ¥69,980-137,980',
    worldPrice: 'около 60,000-145,000 ₽',
    savings: '25-60%',
    savingsPercent: 60,
    reason: 'Выгодно по модели: Ricoh GR IIIx, PS5 Pro, Switch 2',
    tags: ['voltage', 'taxfree'],
    bestPlaces: ['Токио · Yodobashi Akiba', 'Осака · Bic Camera Namba'],
    description:
      'Выгодно только по конкретной модели и наличию. Лучшие кейсы - Ricoh GR IIIx, PS5 Pro и multi-language Switch 2.',
    note: 'Гарантия японская. Switch 2 Japan-only не бери без понимания ограничений языка и аккаунта.',
    buyIn: {
      osaka: ['Bic Camera Namba', 'Yodobashi Umeda', 'Den Den Town stores'],
      kyoto: ['Yodobashi Kyoto', 'Bic Camera JR Kyoto'],
      tokyo: ['Yodobashi Akiba / Shinjuku', 'Bic Camera Yurakucho', 'Sony Store Ginza'],
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
    product: 'eSIM, Yamato luggage delivery, JINS/Zoff glasses',
    shortName: 'Сервисы',
    image: 'photos/tokyo/shibuya_cross.jpg',
    imageLabel: 'Shibuya: связь, очки и багажные сервисы решают логистику',
    japanPrice: 'примерно ¥1,000-5,900',
    worldPrice: 'около 3,900 ₽+ или кратно дороже у посредников',
    savings: 'высокая ценность',
    savingsPercent: 0,
    reason: 'Связь, доставка багажа и очки за день — экономят силы',
    tags: ['compact'],
    bestPlaces: ['Токио · JINS / Zoff Shinjuku', 'Осака · JINS Namba / Umeda'],
    description:
      'Это не сувениры, но часто экономит больше денег и сил: связь, чемоданы между отелями и запасные очки за день.',
    note: 'Для eSIM нужен unlocked phone, для Yamato - запас времени, для очков - простой рецепт или проверка на месте.',
    buyIn: {
      osaka: ['FamilyMart / IIJ eSIM', 'Yamato counters or hotel front desk', 'JINS Namba / Umeda'],
      kyoto: ['FamilyMart', 'Yamato через отель', 'JINS / Zoff Kyoto Kawaramachi'],
      tokyo: ['Ubigi / Willer online', 'Yamato / JAL ABC airports', 'JINS / Zoff Shinjuku / Shibuya'],
    },
  },
];
