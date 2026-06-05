import type { TrustTopic } from './types';

const CHECKED_AT = '5 июня 2026';

export const trustTopics: TrustTopic[] = [
  {
    title: 'IC-карты: Suica, PASMO, ICOCA',
    category: 'Транспорт',
    checkedAt: CHECKED_AT,
    risk: 'Средний: физические карты и туристические версии периодически меняют доступность.',
    whatCanChange: 'Наличие пластика, депозит/возврат, поддержка мобильных кошельков и точки продажи.',
    summary:
      'IC-карта нужна для метро, поездов, автобусов, автоматов и convenience stores. Для плана поездки важно проверить, получится ли купить физическую карту по прилёте или проще использовать Welcome Suica Mobile.',
    links: [
      {
        label: 'JNTO: IC Travel Cards',
        url: 'https://www.japan.travel/en/plan/ic-card/',
        kind: 'official',
      },
      {
        label: 'JR East: Welcome Suica',
        url: 'https://www.jreast.co.jp/multi/welcomesuica/welcomesuica.html',
        kind: 'operator',
      },
      {
        label: 'JR East: Welcome Suica Mobile',
        url: 'https://www.jreast.co.jp/multi/en/wsmlp/',
        kind: 'operator',
      },
    ],
  },
  {
    title: 'JR Pass и SmartEX',
    category: 'Поезда',
    checkedAt: CHECKED_AT,
    risk: 'Высокий: цены, зоны действия, Nozomi/Mizuho-условия и правила онлайн-брони меняются.',
    whatCanChange: 'Стоимость JR Pass, eligibility, доплаты, возможность резервировать места и поддержка иностранных карт.',
    summary:
      'JR Pass имеет смысл считать против отдельных билетов. Для Tokaido-Sanyo-Kyushu Shinkansen отдельные билеты и места удобнее проверять через SmartEX; условия JR Pass и SmartEX не взаимозаменяемы.',
    links: [
      {
        label: 'JR: Japan Rail Pass',
        url: 'https://japanrailpass.net/en/about_jrp/',
        kind: 'operator',
      },
      {
        label: 'JR: Conditions for use',
        url: 'https://japanrailpass.net/en/use/conditions-for-use/',
        kind: 'operator',
      },
      {
        label: 'SmartEX',
        url: 'https://smart-ex.jp/en/',
        kind: 'operator',
      },
    ],
  },
  {
    title: 'Лекарства и ввоз препаратов',
    category: 'Граница',
    checkedAt: CHECKED_AT,
    risk: 'Критический: правила зависят от вещества, количества и формы препарата.',
    whatCanChange: 'Списки контролируемых веществ, лимиты без Import Confirmation и онлайн-процедура подачи.',
    summary:
      'Перед поездкой нужно сверить каждый препарат по MHLW. Рецепт из своей страны сам по себе не разрешает ввоз запрещённых или контролируемых веществ; для части лекарств требуется разрешение до вылета.',
    links: [
      {
        label: 'MHLW: medicines for personal use',
        url: 'https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html',
        kind: 'government',
      },
      {
        label: 'MHLW: Import Confirmation',
        url: 'https://impconf.mhlw.go.jp/aicpte/page/login.jsp?lang=en',
        kind: 'government',
      },
      {
        label: 'MHLW: Narcotics Control Department',
        url: 'https://www.ncd.mhlw.go.jp/en/index.html',
        kind: 'government',
      },
    ],
  },
  {
    title: 'Tax-free покупки',
    category: 'Покупки',
    checkedAt: CHECKED_AT,
    risk: 'Высокий: tax-free правила и оформление реформируются, а магазины применяют их по-разному.',
    whatCanChange: 'Минимальные суммы, порядок возврата налога, требования к паспорту/VJW и проверка при выезде.',
    summary:
      'Tax-free товары нужно вывезти из Японии. Не стоит вскрывать расходники или передавать покупки другим людям до выезда; Customs может проверить товары и начислить налог при нарушении.',
    links: [
      {
        label: 'JTA: Japan Tax-free Shop',
        url: 'https://www.mlit.go.jp/kankocho/tax-free/index.html',
        kind: 'government',
      },
      {
        label: 'Japan Customs: passenger clearance',
        url: 'https://www.customs.go.jp/english/summary/passenger.htm',
        kind: 'government',
      },
      {
        label: 'Visit Japan Web',
        url: 'https://services.digital.go.jp/en/visit-japan-web/',
        kind: 'government',
      },
    ],
  },
  {
    title: 'Багаж и oversized luggage',
    category: 'Поезда',
    checkedAt: CHECKED_AT,
    risk: 'Средний: правила зависят от линии, размера багажа и типа места.',
    whatCanChange: 'Порог размеров, наличие мест с багажной зоной, штраф/сбор и онлайн-доступность таких мест.',
    summary:
      'Для Tokaido-Sanyo-Kyushu Shinkansen багаж с суммой сторон 161-250 см требует места с oversized baggage area. Багаж больше 250 см нельзя брать на борт по этим правилам.',
    links: [
      {
        label: 'JR Central: luggage information',
        url: 'https://global.jr-central.co.jp/en/info/oversized-baggage/index.html',
        kind: 'operator',
      },
      {
        label: 'SmartEX: make reservations',
        url: 'https://smart-ex.jp/en/reservation/reserve_smart/sp/',
        kind: 'operator',
      },
    ],
  },
  {
    title: 'Emergency и safety',
    category: 'Безопасность',
    checkedAt: CHECKED_AT,
    risk: 'Средний: телефоны, приложения и disaster-инструкции могут обновляться перед сезоном тайфунов.',
    whatCanChange: 'Номера горячих линий, ссылки на приложения, рекомендации при землетрясениях/тайфунах и медпомощи.',
    summary:
      'Базовые номера: 110 полиция, 119 пожарная/скорая. Для туристов полезны JNTO emergency page, Japan Safe Travel Information и Safety Tips app; перед поездкой сохранить ссылки офлайн.',
    links: [
      {
        label: 'JNTO: Staying Safe in Japan',
        url: 'https://www.japan.travel/en/plan/emergencies/',
        kind: 'official',
      },
      {
        label: 'JNTO: Japan Safe Travel Information',
        url: 'https://www.japan.travel/en/japan-safe-travel-information/',
        kind: 'official',
      },
      {
        label: 'JNTO: Safety Tips app',
        url: 'https://www.jnto.go.jp/safety-tips/eng/index.html',
        kind: 'official',
      },
    ],
  },
  {
    title: 'Visit Japan Web',
    category: 'Въезд',
    checkedAt: CHECKED_AT,
    risk: 'Высокий: URL, QR-коды, функции въезда/таможни и fake sites/apps меняются.',
    whatCanChange: 'Адрес официального сервиса, набор процедур, tax-free функции, требования аэропорта и предупреждения о фейках.',
    summary:
      'Visit Japan Web используется для immigration, customs и tax-free shopping service. Важно заходить только через официальный домен Digital Agency и не платить на похожих сайтах или в подозрительных приложениях.',
    links: [
      {
        label: 'Digital Agency: Visit Japan Web',
        url: 'https://services.digital.go.jp/en/visit-japan-web/',
        kind: 'government',
      },
      {
        label: 'Visit Japan Web service',
        url: 'https://www.vjw.digital.go.jp/',
        kind: 'government',
      },
      {
        label: 'Japan Customs: fake websites warning',
        url: 'https://www.customs.go.jp/english/news/20260528e.html',
        kind: 'government',
      },
    ],
  },
];
