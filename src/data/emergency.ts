export type EmergencyContactTone = 'danger' | 'orange' | 'sky' | 'slate';

export interface EmergencyContact {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  tel: string;
  badge: string;
  tone: EmergencyContactTone;
  useFor: string;
  details: string[];
  phrase?: {
    ja: string;
    en: string;
  };
}

export interface EmergencyPhrase {
  id: string;
  title: string;
  ja: string;
  reading?: string;
  en: string;
}

export interface EmergencyScenario {
  id: string;
  title: string;
  badge: string;
  summary: string;
  steps: string[];
  relatedContacts?: string[];
}

export interface EmergencyLink {
  id: string;
  title: string;
  source: string;
  url: string;
  note: string;
}

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'police',
    title: 'Полиция',
    subtitle: 'Police / 事件・事故',
    number: '110',
    tel: '110',
    badge: 'crime / accident',
    tone: 'danger',
    useFor: 'Преступление, нападение, кража, ДТП, непосредственная опасность.',
    details: [
      'Оставайся в безопасном месте и назови город, адрес или ближайший ориентир.',
      'Если нужен английский, начни с "English please" и не вешай трубку.',
    ],
    phrase: {
      ja: '警察を呼んでください。',
      en: 'Please call the police.',
    },
  },
  {
    id: 'fire-ambulance',
    title: 'Скорая / пожарные',
    subtitle: 'Fire / Ambulance / 救急・消防',
    number: '119',
    tel: '119',
    badge: 'medical / fire',
    tone: 'orange',
    useFor: 'Пожар, серьёзная травма, внезапная болезнь, нужна скорая.',
    details: [
      'Скажи "ambulance" или "fire", затем адрес и что случилось.',
      'Скорую нельзя выбрать по больнице: бригада везёт туда, где примут по состоянию.',
    ],
    phrase: {
      ja: '救急車を呼んでください。',
      en: 'Please call an ambulance.',
    },
  },
  {
    id: 'coast-guard',
    title: 'Береговая охрана',
    subtitle: 'Japan Coast Guard / 海上保安庁',
    number: '118',
    tel: '118',
    badge: 'sea emergency',
    tone: 'sky',
    useFor: 'Инцидент на море, человек в воде, судно в беде, подозрительное судно, разлив масла.',
    details: [
      'Сообщи когда, где и что произошло; говори коротко и спокойно.',
      'Подходит для морских происшествий, а не для обычной городской полиции.',
    ],
  },
  {
    id: 'jnto-hotline',
    title: 'JNTO Japan Visitor Hotline',
    subtitle: 'English / Chinese / Korean',
    number: '050-3816-2787',
    tel: '+815038162787',
    badge: '24/7 visitor help',
    tone: 'slate',
    useFor: 'Помощь туристам при болезни, аварии, disaster-ситуации и общих travel-вопросах.',
    details: [
      'Работает 24 часа в день, 365 дней в году.',
      'Из-за границы: +81-50-3816-2787.',
    ],
  },
];

export const emergencyPhrases: EmergencyPhrase[] = [
  {
    id: 'traveler-help',
    title: 'Я турист, помогите',
    ja: '私は旅行者です。助けてください。',
    reading: 'Watashi wa ryokosha desu. Tasukete kudasai.',
    en: 'I am a traveler. Please help me.',
  },
  {
    id: 'english',
    title: 'Нужен английский',
    ja: '英語を話せますか？',
    reading: 'Eigo o hanasemasu ka?',
    en: 'Do you speak English?',
  },
  {
    id: 'ambulance',
    title: 'Вызовите скорую',
    ja: '救急車を呼んでください。',
    reading: 'Kyukyusha o yonde kudasai.',
    en: 'Please call an ambulance.',
  },
  {
    id: 'police',
    title: 'Вызовите полицию',
    ja: '警察を呼んでください。',
    reading: 'Keisatsu o yonde kudasai.',
    en: 'Please call the police.',
  },
  {
    id: 'hospital',
    title: 'Нужна больница',
    ja: '病院に連れて行ってください。',
    reading: 'Byoin ni tsurete itte kudasai.',
    en: 'Please take me to a hospital.',
  },
  {
    id: 'lost-passport',
    title: 'Потерян паспорт',
    ja: 'パスポートをなくしました。',
    reading: 'Pasupoto o nakushimashita.',
    en: 'I lost my passport.',
  },
  {
    id: 'evacuation',
    title: 'Где эвакуация',
    ja: '避難所はどこですか？',
    reading: 'Hinanjo wa doko desu ka?',
    en: 'Where is the evacuation shelter?',
  },
  {
    id: 'hotel',
    title: 'Не могу вернуться в отель',
    ja: 'ホテルに戻れません。',
    reading: 'Hoteru ni modoremasen.',
    en: 'I cannot return to my hotel.',
  },
  {
    id: 'allergy',
    title: 'Есть аллергия',
    ja: 'アレルギーがあります。',
    reading: 'Arerugi ga arimasu.',
    en: 'I have allergies.',
  },
];

export const emergencyScenarios: EmergencyScenario[] = [
  {
    id: 'earthquake',
    title: 'Землетрясение',
    badge: 'earthquake',
    summary: 'Сначала защита от падающих предметов, потом выходы, обувь и информация.',
    steps: [
      'Во время толчков: пригнись, прикрой голову, держись подальше от стекла и шкафов.',
      'После толчков: надень обувь, проверь выход, возьми паспорт, телефон, лекарства и power bank.',
      'Не пользуйся лифтом. При пожаре или команде персонала выходи по лестнице.',
      'Если ты у моря после сильного или долгого землетрясения: уходи на возвышенность или вглубь, не жди подтверждения.',
    ],
    relatedContacts: ['fire-ambulance', 'jnto-hotline'],
  },
  {
    id: 'typhoon',
    title: 'Тайфун / ливень',
    badge: 'typhoon',
    summary: 'Оставайся внутри, избегай воды и стекла, планируй транспорт с запасом.',
    steps: [
      'Не ходи к рекам, каналам, морю, горам и подземным переходам при flood warning.',
      'Оставайся в отеле или прочном здании; отойди от окон, убери вещи с балкона.',
      'Заряди телефон и power bank, держи воду, наличные, паспорт и лекарства под рукой.',
      'Проверяй JMA, NHK World, Safety tips и объявления отеля; транспорт может остановиться заранее.',
    ],
    relatedContacts: ['jnto-hotline'],
  },
  {
    id: 'medical',
    title: 'Медицинская помощь',
    badge: 'medical',
    summary: 'Для угрозы жизни звони 119, для поиска клиники используй JNTO medical или hotline.',
    steps: [
      'Если боль сильная, есть потеря сознания, травма, ожог, кровь, chest pain или trouble breathing: 119.',
      'Покажи фразу "救急車を呼んでください。" и адрес отеля/места рядом.',
      'Если не emergency: ищи клинику через JNTO medical guide или звони в JNTO hotline.',
      'Возьми паспорт, страховку, карту, наличные и список аллергий/лекарств.',
    ],
    relatedContacts: ['fire-ambulance', 'jnto-hotline'],
  },
  {
    id: 'lost-passport',
    title: 'Потерян паспорт',
    badge: 'passport',
    summary: 'Сначала police report, затем посольство/консульство и airline/insurance.',
    steps: [
      'Обратись в ближайший koban или police station и попроси документ о потере/краже.',
      'Свяжись со своим посольством или консульством; уточни emergency travel document.',
      'Сообщи в отель, авиакомпанию и страховую. Держи копии паспорта и виз/штампов отдельно.',
      'Не планируй выезд из Японии, пока не понятны документы на замену.',
    ],
    relatedContacts: ['police', 'jnto-hotline'],
  },
  {
    id: 'police',
    title: 'Полиция / кража / ДТП',
    badge: 'police',
    summary: 'При угрозе или ДТП звони 110, для потерянных вещей начинай с koban.',
    steps: [
      'При опасности, преступлении или ДТП звони 110 и оставайся на месте, если это безопасно.',
      'Для потерянной вещи спроси в отеле, на станции и в ближайшем koban.',
      'Запиши номер обращения, адрес участка и имя/контакт сотрудника, если дадут.',
      'Не подписывай непонятные документы без перевода; попроси English support или JNTO hotline.',
    ],
    relatedContacts: ['police', 'jnto-hotline'],
  },
  {
    id: 'hotel-evacuation',
    title: 'Эвакуация из отеля',
    badge: 'hotel',
    summary: 'Следуй персоналу, не используй лифт, бери только essentials.',
    steps: [
      'Возьми паспорт, телефон, power bank, лекарства, очки, кошелёк, ключ-карту и обувь.',
      'Не используй лифт при землетрясении, пожаре или smoke alarm.',
      'Следуй указаниям персонала и держись своей группы; сообщи, если кто-то пропал или травмирован.',
      'Покажи персоналу фразу "避難所はどこですか？", если не понимаешь направление.',
    ],
    relatedContacts: ['fire-ambulance', 'jnto-hotline'],
  },
];

export const emergencyLinks: EmergencyLink[] = [
  {
    id: 'jnto-hotline',
    title: 'Japan Visitor Hotline',
    source: 'JNTO',
    url: 'https://www.japan.travel/en/plan/hotline/',
    note: 'Официальная страница hotline и emergency numbers.',
  },
  {
    id: 'safety-tips',
    title: 'Safety tips app',
    source: 'Japan Tourism Agency / JNTO',
    url: 'https://www.jnto.go.jp/safety-tips/eng/app.html',
    note: 'Push alerts for earthquake, tsunami and weather warnings; есть flowcharts и useful phrases.',
  },
  {
    id: 'jma-warnings',
    title: 'Weather warnings / advisories',
    source: 'JMA',
    url: 'https://www.data.jma.go.jp/multi/warn/index.html?lang=en',
    note: 'Официальные weather warnings/advisories по регионам.',
  },
  {
    id: 'jma-earthquake',
    title: 'Earthquake information',
    source: 'JMA',
    url: 'https://www.data.jma.go.jp/multi/quake/',
    note: 'Последние earthquake reports и intensity.',
  },
  {
    id: 'jma-cyclone',
    title: 'Tropical Cyclone Information',
    source: 'JMA',
    url: 'https://www.data.jma.go.jp/multi/cyclone/index.html?lang=en',
    note: 'Официальная информация по tropical cyclones / typhoons.',
  },
  {
    id: 'jma-menu',
    title: 'JMA disaster menu',
    source: 'JMA',
    url: 'https://www.jma.go.jp/jma/en/menu.html',
    note: 'Единый вход к weather, earthquake, tsunami, volcano and typhoon information.',
  },
  {
    id: 'jnto-medical',
    title: 'Medical guide and hospital search',
    source: 'JNTO',
    url: 'https://www.jnto.go.jp/emergency/eng/mi_guide.html',
    note: 'Поиск medical institutions, emergency hospital guidance, 119/110 и hotline.',
  },
  {
    id: 'nhk-world',
    title: 'NHK WORLD-JAPAN app',
    source: 'NHK',
    url: 'https://www3.nhk.or.jp/nhkworld/en/app/',
    note: 'News, live stream and earthquake/tsunami notifications in multiple languages.',
  },
  {
    id: 'embassies',
    title: 'Foreign missions in Japan',
    source: 'MOFA',
    url: 'https://www.mofa.go.jp/about/emb_cons/protocol/index.html',
    note: 'Контакты посольств и консульств для lost passport и emergency documents.',
  },
];

export const emergencyPreparedness = [
  'Сохрани страницу offline до поездки; внешние ссылки нужны только когда интернет есть.',
  'Держи адрес отеля на японском в заметках и на бумаге.',
  'Убедись, что SIM/eSIM умеет голосовые звонки, если рассчитываешь звонить 110/119/118.',
  'Носи копию паспорта, страховки, allergies/medications и emergency contact отдельно от паспорта.',
];

export const emergencyCheckedAt = 'июнь 2026';
