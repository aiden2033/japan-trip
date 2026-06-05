export type PreflightGroupId =
  | 'documents-entry'
  | 'medicines-customs'
  | 'money-ic'
  | 'connectivity'
  | 'tickets-bookings'
  | 'offline-safety'
  | 'luggage';

export type PreflightPriority = 'critical' | 'important' | 'nice';

export interface PreflightSourceLink {
  label: string;
  url: string;
  kind?: 'official' | 'guide' | 'booking' | 'service';
}

export interface PreflightTask {
  id: string;
  title: string;
  details: string;
  timing: string;
  priority: PreflightPriority;
  sourceLinks?: PreflightSourceLink[];
}

export interface PreflightGroup {
  id: PreflightGroupId;
  title: string;
  icon: string;
  summary: string;
  tasks: PreflightTask[];
}

export const PREFLIGHT_CHECKED_AT = 'июнь 2026';

export const preflightGroups: PreflightGroup[] = [
  {
    id: 'documents-entry',
    title: 'Документы / въезд',
    icon: '🛂',
    summary: 'Виза, паспорт, страховка и QR для въезда без поиска бумажек в аэропорту.',
    tasks: [
      {
        id: 'visa-status',
        title: 'Проверить визовый режим и подать документы',
        details:
          'Для российского паспорта заложить время на обычную туристическую визу: анкеты, фото, маршрут, подтверждения перелётов/отелей и финансовые документы. Проверять требования у японской дипмиссии по месту подачи.',
        timing: 'За 2-3 месяца',
        priority: 'critical',
        sourceLinks: [
          { label: 'MOFA visa', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html', kind: 'official' },
          { label: 'Посольство в РФ', url: 'https://www.ru.emb-japan.go.jp/VISANDTOURISM/VisaToiawase.html', kind: 'official' },
        ],
      },
      {
        id: 'passport-pages',
        title: 'Проверить загранпаспорт и страницы',
        details:
          'Паспорт должен покрывать всю поездку, а для визы нужны свободные страницы. Сделать фото/сканы разворота, визы и страховки, сохранить отдельно от оригинала.',
        timing: 'Сразу',
        priority: 'critical',
        sourceLinks: [
          { label: 'MOFA checklist', url: 'https://www.mofa.go.jp/files/000130342.pdf', kind: 'official' },
        ],
      },
      {
        id: 'visit-japan-web',
        title: 'Заполнить Visit Japan Web',
        details:
          'Создать поездку, внести паспортные данные, адрес первого отеля и таможенную декларацию. QR сохранить в телефон и в офлайн-папку.',
        timing: 'За 3-7 дней',
        priority: 'important',
        sourceLinks: [
          { label: 'Visit Japan Web', url: 'https://services.digital.go.jp/en/visit-japan-web/', kind: 'official' },
          { label: 'Japan Customs e-Gates', url: 'https://www.customs.go.jp/english/passenger/egate.htm', kind: 'official' },
        ],
      },
      {
        id: 'travel-insurance',
        title: 'Оформить медицинскую страховку',
        details:
          'Полис должен покрывать Японию, даты поездки, экстренную медицину и багажные риски. Номер полиса и ассистанс сохранить в контакты.',
        timing: 'До визы или сразу после билетов',
        priority: 'important',
        sourceLinks: [
          { label: 'MOFA insurance note', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html', kind: 'official' },
        ],
      },
      {
        id: 'entry-packet',
        title: 'Собрать въездной пакет',
        details:
          'В одной офлайн-папке держать визу, билеты туда-обратно, брони отелей, страховку, первый адрес в Японии и контакты отелей. Распечатать минимальный комплект на случай разряда телефона.',
        timing: 'За неделю',
        priority: 'important',
      },
    ],
  },
  {
    id: 'medicines-customs',
    title: 'Лекарства / таможня',
    icon: '💊',
    summary: 'Аптечка без сюрпризов на контроле и без запрещённых компонентов.',
    tasks: [
      {
        id: 'medicine-ingredients',
        title: 'Проверить состав всех лекарств',
        details:
          'Сверить действующие вещества, особенно рецептурные препараты, психотропные, стимуляторы, наркотические обезболивающие, CBD/каннабис и препараты от простуды. Не полагаться только на торговое название.',
        timing: 'За 5-6 недель',
        priority: 'critical',
        sourceLinks: [
          { label: 'MHLW medicines', url: 'https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html', kind: 'official' },
          { label: 'Narcotics Control', url: 'https://www.ncd.mhlw.go.jp/en/application2.html', kind: 'official' },
        ],
      },
      {
        id: 'yunyu-kakuninsho',
        title: 'Оформить Yunyu Kakunin-sho, если нужно',
        details:
          'Заявка нужна для отдельных рецептурных/инъекционных препаратов, превышения личных лимитов и части медизделий. Если есть сомнение, написать в MHLW до вылета, а не выяснять на границе.',
        timing: 'За 3-5 недель',
        priority: 'critical',
        sourceLinks: [
          { label: 'MHLW Q&A PDF', url: 'https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/dl/qa2.pdf', kind: 'official' },
        ],
      },
      {
        id: 'medicine-packaging',
        title: 'Упаковать лекарства прозрачно',
        details:
          'Везти в оригинальной упаковке, с рецептом/справкой на английском для рецептурных препаратов. В ручной клади держать всё критичное на 2-3 дня.',
        timing: 'В день сборов',
        priority: 'important',
        sourceLinks: [
          { label: 'MHLW medicines', url: 'https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html', kind: 'official' },
        ],
      },
      {
        id: 'customs-restricted',
        title: 'Не везти спорную еду и декларируемые товары',
        details:
          'Проверить ограничения на мясо, растения, крупные суммы, дорогую технику и товары не для личного пользования. Таможенную декларацию лучше заполнить заранее через Visit Japan Web.',
        timing: 'Перед упаковкой',
        priority: 'important',
        sourceLinks: [
          { label: 'Japan Customs passenger', url: 'https://www.customs.go.jp/english/passenger/', kind: 'official' },
          { label: 'Passenger clearance', url: 'https://www.customs.go.jp/english/summary/passenger.htm', kind: 'official' },
        ],
      },
    ],
  },
  {
    id: 'money-ic',
    title: 'Деньги / IC',
    icon: '💴',
    summary: 'Наличные, карты, IC-карта и синкансэн без кассовой паники.',
    tasks: [
      {
        id: 'cash-starter',
        title: 'Подготовить стартовые иены',
        details:
          'Взять наличные на первый день и мелкие расходы: храмы, рынки, маленькие кафе, locker, пополнение IC. Остальное снимать в японских ATM по мере необходимости.',
        timing: 'За 1-2 недели',
        priority: 'important',
      },
      {
        id: 'cards-atm',
        title: 'Проверить карты и ATM-план',
        details:
          'Взять минимум две независимые карты, проверить лимиты, PIN, комиссии, уведомления и возможность снятия за рубежом. Контакты банка сохранить офлайн.',
        timing: 'За неделю',
        priority: 'critical',
      },
      {
        id: 'ic-card-plan',
        title: 'Выбрать IC-карту',
        details:
          'Для маршрута через Осаку удобно купить ICOCA в Kansai Airport или добавить мобильную Suica/ICOCA на iPhone. Android вне японского рынка обычно не подходит для мобильной IC.',
        timing: 'До вылета / в аэропорту',
        priority: 'critical',
        sourceLinks: [
          { label: 'JR-West ICOCA', url: 'https://www.westjr.co.jp/global/en/howto/icoca/', kind: 'official' },
        ],
      },
      {
        id: 'smart-ex-account',
        title: 'Завести SmartEX и проверить оплату',
        details:
          'Создать аккаунт, привязать карту и проверить, проходит ли оплата. Это основной онлайн-канал для Tokaido/Sanyo/Kyushu Shinkansen и привязки билета к IC.',
        timing: 'За 3-4 недели',
        priority: 'important',
        sourceLinks: [
          { label: 'SmartEX', url: 'https://smart-ex.jp/en/', kind: 'official' },
        ],
      },
      {
        id: 'tax-free-passport',
        title: 'Подготовить паспорт для tax-free покупок',
        details:
          'Покупки tax-free оформляют по паспорту, поэтому оригинал нужен с собой в магазинах. Сразу проверить правила вывоза и упаковку расходников.',
        timing: 'Перед shopping-днями',
        priority: 'nice',
        sourceLinks: [
          { label: 'Japan Customs', url: 'https://www.customs.go.jp/english/passenger/', kind: 'official' },
        ],
      },
    ],
  },
  {
    id: 'connectivity',
    title: 'Связь',
    icon: '📶',
    summary: 'Интернет, перевод и зарядка готовы до посадки в самолёт.',
    tasks: [
      {
        id: 'esim-install',
        title: 'Купить и установить eSIM',
        details:
          'Установить профиль до вылета, сохранить QR/инструкцию офлайн и не включать передачу данных до Японии, если провайдер считает срок с первого подключения.',
        timing: 'За 3-7 дней',
        priority: 'critical',
      },
      {
        id: 'roaming-backup',
        title: 'Оставить аварийный роуминг',
        details:
          'Проверить, что основной номер работает за границей для SMS/банков/мессенджеров. Настроить лимиты, чтобы не словить дорогой автотрафик.',
        timing: 'За неделю',
        priority: 'important',
      },
      {
        id: 'offline-translation',
        title: 'Скачать офлайн-перевод',
        details:
          'Google Translate с японским пакетом, Papago как запасной вариант и DeepL для длинного текста. Проверить камеру-переводчик до поездки.',
        timing: 'За неделю',
        priority: 'important',
      },
      {
        id: 'charging-kit',
        title: 'Собрать зарядный набор',
        details:
          'Пауэрбанк, USB-C/Lightning, компактный сетевой блок, переходник при необходимости. В ручную кладь положить кабель, который точно заряжает телефон.',
        timing: 'В день сборов',
        priority: 'important',
      },
    ],
  },
  {
    id: 'tickets-bookings',
    title: 'Билеты / брони',
    icon: '🎫',
    summary: 'Слоты, рестораны и переезды с понятными дедлайнами.',
    tasks: [
      {
        id: 'critical-attractions',
        title: 'Закрыть критичные билеты',
        details:
          'Ghibli Museum, teamLab, Shibuya Sky и похожие тайм-слоты не оставлять на месте. Проверить имя, дату, часовой пояс продаж и условия переноса.',
        timing: 'За 2-6 недель',
        priority: 'critical',
      },
      {
        id: 'restaurant-reservations',
        title: 'Подтвердить рестораны',
        details:
          'Для fine dining и маленьких counter-мест проверить окно бронирования, депозит, dress code, аллергию и cancellation fee. Подтверждения сохранить офлайн.',
        timing: 'За 1-3 месяца',
        priority: 'critical',
      },
      {
        id: 'hotel-flight-audit',
        title: 'Сверить перелёты и отели',
        details:
          'Проверить написание имени, даты, аэропорты, нормы багажа, check-in окна, late arrival note и дедлайны бесплатной отмены.',
        timing: 'За 2 недели',
        priority: 'important',
      },
      {
        id: 'shinkansen-tickets',
        title: 'Купить или запланировать синкансэн',
        details:
          'Для Osaka/Kyoto/Tokyo выбрать SmartEX или покупку на станции. Если везёшь крупный чемодан, заранее смотреть места с oversized luggage area.',
        timing: 'За 1-4 недели',
        priority: 'important',
        sourceLinks: [
          { label: 'SmartEX reservations', url: 'https://smart-ex.jp/en/reservation/reserve_smart/sp/', kind: 'official' },
        ],
      },
    ],
  },
  {
    id: 'offline-safety',
    title: 'Офлайн / безопасность',
    icon: '🧭',
    summary: 'План на разряд телефона, тайфун, потерю карты и ночной вокзал.',
    tasks: [
      {
        id: 'offline-maps',
        title: 'Скачать офлайн-карты',
        details:
          'Google Maps для Osaka/Kyoto/Tokyo и Organic Maps как полностью офлайн-запас. Отметить отели, вокзалы, day trips и ближайшие конбини.',
        timing: 'За неделю',
        priority: 'critical',
      },
      {
        id: 'safety-apps',
        title: 'Поставить приложения безопасности',
        details:
          'Safety tips / JNTO, JMA weather и резервный канал предупреждений. Включить push-уведомления для землетрясений, тайфунов и сильного дождя.',
        timing: 'За неделю',
        priority: 'important',
        sourceLinks: [
          { label: 'JNTO Safety tips', url: 'https://www.jnto.go.jp/safety-tips/eng/app.html', kind: 'official' },
          { label: 'JMA', url: 'https://www.jma.go.jp/jma/indexe.html', kind: 'official' },
        ],
      },
      {
        id: 'emergency-card',
        title: 'Собрать аварийную карточку',
        details:
          'В телефоне и на бумаге: контакты, адреса отелей на японском/английском, страховка, группа крови/аллергии, контакт банка и посольства.',
        timing: 'За неделю',
        priority: 'important',
      },
      {
        id: 'weather-watch',
        title: 'Мониторить погоду и тайфуны',
        details:
          'Конец августа и сентябрь требуют гибкости: выездные дни к Фудзи/Хаконэ/Камакуре держать переносимыми, проверять JMA за 2-4 дня.',
        timing: 'За 2-4 дня до выездов',
        priority: 'important',
        sourceLinks: [
          { label: 'JMA weather', url: 'https://www.jma.go.jp/jma/indexe.html', kind: 'official' },
        ],
      },
      {
        id: 'offline-copies',
        title: 'Разложить копии не в одном месте',
        details:
          'Сканы документов и брони хранить в телефоне, облаке и у попутчика. Бумажную копию паспорта положить отдельно от паспорта.',
        timing: 'Перед вылетом',
        priority: 'important',
      },
    ],
  },
  {
    id: 'luggage',
    title: 'Багаж',
    icon: '🧳',
    summary: 'Чемодан не мешает вокзалам, а ручная кладь переживает задержку багажа.',
    tasks: [
      {
        id: 'carry-on-24h',
        title: 'Собрать 24-часовой набор в ручную кладь',
        details:
          'Документы, деньги, лекарства, зарядка, смена белья, базовая косметика и лёгкая вещь на жару. Это спасает при задержке чемодана.',
        timing: 'В день сборов',
        priority: 'critical',
      },
      {
        id: 'luggage-forwarding',
        title: 'Запланировать takkyubin',
        details:
          'Между городами отправлять чемодан hotel-to-hotel через Yamato/аналог, если отели принимают доставку. Проверить адрес, дату доставки и cut-off time на ресепшене.',
        timing: 'Перед каждым переездом',
        priority: 'important',
        sourceLinks: [
          { label: 'Yamato Hands-Free Travel', url: 'https://www.global-yamato.com/en/hands-free-travel/', kind: 'service' },
        ],
      },
      {
        id: 'oversized-luggage',
        title: 'Проверить размер чемодана для синкансэна',
        details:
          'Если сумма сторон большая, бронировать место с oversized luggage area или отправлять чемодан заранее. Не планировать тесные пересадки с крупным багажом.',
        timing: 'До покупки синкансэна',
        priority: 'important',
        sourceLinks: [
          { label: 'SmartEX luggage', url: 'https://smart-ex.jp/en/reservation/reserve_smart/sp/', kind: 'official' },
        ],
      },
      {
        id: 'weather-pack',
        title: 'Упаковаться под жару и ливни',
        details:
          'Лёгкая дышащая одежда, компактный зонт/дождевик, полотенце, удобная обувь и запасной слой для кондиционеров в транспорте.',
        timing: 'В день сборов',
        priority: 'important',
      },
      {
        id: 'bag-tags',
        title: 'Подписать багаж',
        details:
          'Бирка с именем, телефоном/email и адресом первого отеля. Внутрь чемодана положить дублирующую записку, чтобы багаж можно было вернуть без внешней бирки.',
        timing: 'Перед вылетом',
        priority: 'nice',
      },
    ],
  },
];

export const preflightTasks = preflightGroups.flatMap((group) => group.tasks);
