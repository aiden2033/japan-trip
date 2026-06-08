# Friends Japan Notes

Источник: заметки друзей, Google Sheet `1A-ksg30IqeyNgP8sGWLX41IXYQ9svHK1qzu24nf0nyg`, короткие Google Maps ссылки и shared food/cafe list.

Дата разбора: 2026-06-08.

## Что добавить в данные

### Сильные кандидаты

Эти пункты выглядят достаточно конкретно, чтобы потом переносить в `src/data/places.ts`, `src/data/trip.ts`, `src/data/preflight.ts` или отдельный слой food/friends recommendations.

| Куда | Что | Почему |
| --- | --- | --- |
| `cities.ts` / маршрут | Осака может быть короче, Киото лучше дать больше времени | Друзья быстро закрыли Осаку, уехали в Нару и сочли решение оставить больше времени на Киото правильным. Исключения для Осаки: Universal Studios, бары/клубы, стритфуд/ночная тусовка. |
| `trip.ts` / `preflight.ts` | Синкансэн: брать сторону D/E ради Фудзи | Практический совет из опыта: они взяли не ту сторону и пожалели. Нужно формулировать как "если едете Tokaido Shinkansen и хотите шанс на Фудзи, при брони смотрите сторону Fuji-facing, обычно D/E, но проверяйте направление/состав". |
| `preflight.ts` / `trip.ts` | Отели: явно бронировать non-smoking room | В Японии курящие номера могут быть очень прокуренными; поменять на ресепшене возможно, но лучше не рассчитывать. |
| `preflight.ts` / `trip.ts` | Багаж: luggage forwarding / takkyubin можно сдавать через конбини, не только отель | Уже есть совет про Yamato hotel-to-hotel, но можно усилить: конбини 7-Eleven/Lawson тоже принимают доставку, багаж могут довезти в другую точку страны за день-два. |
| `trip.ts` / shopping | Оставить место или отдельный чемодан на обратный путь | По опыту друзей покупки быстро забивают багаж: одежда, сувениры, сладости, матча. |
| `trip.ts` / money | Namba Currency Exchange как проверенная точка, но с пометкой "координаты перепроверить" | В скриншоте был конкретный обменник с хорошим курсом, но подруга отметила, что на карте он был расположен не совсем правильно. |
| `places.ts` / food | YakkoSushi Tengo | Бюджетный формат "типа омакасе"; в личной заметке ориентир 3-5 тыс. йен, в note Google-list было 2-3 тыс. йен / около ¥440 за тарелку. Друзья не были из-за ошибки с датами, поэтому ставить как "recommended by friends, not personally visited". |
| `places.ts` / food | IZUMO Unagi | Инстаграмная подача унаги, вкусно, но отзыв с оговоркой: если не любишь угря, вау может не быть. Кириллу очень понравилось, потому что он любит угря. |
| `places.ts` / food | Live Shellfish Center Kyoto Gion Main Store | Проверено: боулы с рыбой рядом с Гионом, острый тунец очень понравился; краб не рекомендовали. Хорошая еда "по пути", когда устанешь от Гиона. |
| `places.ts` / food | Mochi mochi | Моти в Киото: оверпрайс, но "шоу"; по скриншоту рекомендация сильная: "обязательно зайдите", если рядом. |
| `places.ts` / food | Sabanji | Острый китайский рамен, фактически одно блюдо в меню; родители друзей назвали лучшим, что ели в Японии. |
| `places.ts` / food | Katsurai - Kinkaku-ji Temple | Кацу/карри рядом с Золотым павильоном; специально не ехать, но отлично, если обед застал там. |
| `places.ts` / food | Kyoto Yakiniku Restaurant Gyurakutei | Wagyu set от ~6000 йен; друг отдельно говорил, что вагю стоит попробовать хотя бы один раз. |
| `places.ts` / food | Uogashi Nihon-Ichi Shibuya Dogenzaka | Стоячие суши на Сибуе, хорошая цена, особенно топ с гребешком. По видео/скрину готовят прямо перед тобой за стойкой. |
| `places.ts` / cafe | SACYA / The Matcha Tokyo Omotesando | Две матча-точки: SACYA как зумерская матча с розовыми пенками, The Matcha Tokyo Omotesando как стильная точка на маршруте прогулки. |
| `places.ts` / cafe | HATCOFFEE | Маленькая кофейня с 3D latte art / 3D котиками на кофе; проверено, понравилось даже скептикам. |
| `places.ts` / food | Gyukatsu Motomura Ueno | Сетевой gyukatsu: сет с мясом в кляре, рисом/капустой и индивидуальной маленькой плиткой/камнем, где сам дожариваешь мясо. Жирно и вкусно. |
| `places.ts` / hotels? | Daiwa Roynet Hotel Osaka-Kitahama | Жили, понравилось за свои деньги. |
| `places.ts` / hotels? | Onyado Nono Kyotoshichijo | Не жили: очень хотели, но в последний момент зажали денег и потом не пожалели, потому что с плотной программой не успели бы там почилить. Сильная hotel-идея: завтраки с икрой/лососем, онсены, бесплатная соба/мороженое вечером, массажные кресла, манга, традиционный стиль. |

### Уже в данных или почти покрыто

- Осака: Dotonbori, Shinsekai, Tsutenkaku, Osaka Castle, Shitenno-ji, Mizuno, Nara как day trip, Universal Studios в `friendsMapPlaces.ts`.
- Киото: Kiyomizu-dera, Sannenzaka/Ninenzaka, Gion, Fushimi Inari, Pontocho, Arashiyama, Kinkaku-ji, Nishiki Market, HARIO Cafe, Manga Museum.
- Токио: Senso-ji, Tokyo Tower, Zojo-ji контекстом через Tokyo Tower, Shibuya Crossing, Shibuya Sky, Harajuku, Omotesando, Shinjuku, Golden Gai, Ginza/Yurakucho, Ueno, Yanaka, Shimokitazawa, Akihabara, teamLab Planets, Kawaguchiko/Hakone/Fuji day trips.
- Общие советы уже есть: кэш/банкоматы 7-Eleven, курение, Yamato luggage forwarding, SmartEX/синкансэн, Фудзи как погодная рулетка.

### Не переносить сразу

- Весь food-list из 62 точек не стоит без фильтра добавлять в основные `places.ts`: там много запасных суши/кафе без явного "must".
- Если реально использовать food-list, можно попросить Анастасию пройтись по нему и пометить, где она лично была и "что как" - это лучший следующий фильтр перед переносом.
- Посты Tutu про Фудзи и модные районы Токио в целом подтверждают уже имеющиеся направления, но новых точных POI почти не дают.
- Цены из друзей/таблицы держать как ориентиры, не как проверенные актуальные данные: перед переносом в пользовательский UI лучше перепроверить.

## Конспект заметок друзей

### Баланс городов

- Осака показалась менее интересной и быстро закончилась по программе.
- Хорошее решение: из Осаки съездить в Нару и оставить больше времени Киото.
- Киото ощущается заметно сильнее, если цель - храмы, исторические районы, старые улочки и "японская" атмосфера.
- Осака больше про стритфуд, Дотонбори, тусовки, бары, клубы, Universal Studios. Если этого не планируется, 4 дня в Осаке могут быть лишними.

### Еда и кафе

- Wagyu стоит попробовать хотя бы один раз, даже не обязательно в конкретном месте.
- Дотонбори-стритфуд: они ели там пару раз; прикольно на пробу, но не ждать "вау".
- Киото у Гиона: рыбные боулы, брать рыбу/острый тунец; краба не брать.
- Киото: моти как шоу, но overpriced.
- Киото у Kinkaku-ji: если к обеду оказались рядом, выбирать Sabanji или Katsurai.
- Токио Shibuya: Uogashi Nihon-Ichi - стоячие суши, хорошая цена, гребешок особенно сильный.
- Токио: SACYA для зумерской матчи, The Matcha Tokyo Omotesando для стильной матчи на прогулке.
- Токио: HATCOFFEE для 3D latte art, на скриншоте именно 3D-котики на стаканах.
- Токио: Gyukatsu Motomura - жирно, вкусно, популярно у местных; сет с мясом, рисом/капустой и индивидуальной плиткой, где сам дожариваешь мясо.

### Отели

- Daiwa Roynet Hotel Osaka-Kitahama: жили, за свои деньги хорошо.
- Onyado Nono Kyotoshichijo: не жили; очень хотели, но в последний момент зажали денег и потом не пожалели, потому что с их программой не успели бы там почилить. Потенциально классный отель, если есть время пользоваться онсенами/завтраками/вечерними бонусами.
- Отдельный важный совет: при бронировании отелей выбирать non-smoking room. Курящие номера в Японии могут быть очень прокуренными.

### Логистика

- Синкансэн: если важен вид на Фудзи, бронировать правильную сторону. В их формулировке: "берите сторону D/E".
- Багаж: можно пользоваться доставкой чемоданов через конбини и не таскать их между городами. Доставка работает вплоть до другой точки страны, часто за день.
- На обратный путь лучше иметь пустой чемодан или большой запас места: покупки быстро заполняют багаж.
- Обменники: курс в аэропорту нормальный для небольшого стартового обмена, но в городе можно найти лучше. Был рекомендован Namba Currency Exchange, однако точку на карте нужно перепроверить.

## Google Sheet

Таблица содержит 5 вкладок: `Шанхай`, `Осака`, `Киото`, `Токио`, `Шанхай 2`. Для Japan repo релевантны `Осака`, `Киото`, `Токио`; `Шанхай` не переносил в вывод. По скриншоту это был предварительный план, которого друзья в целом придерживались, только несколько пунктов поменяли местами уже по ходу поездки.

### Осака, 2025-11-03

| Время | План |
| --- | --- |
| 6:40-9:30 | Дорога до аэропорта, регистрация, еда по пути. |
| 9:30-13:00 | Перелет Шанхай -> Осака. |
| 13:00-16:00 | Таможня, дорога до отеля, заселение, перекус. |
| 16:00-17:30 | Умеда: магазины, небоскребы. |
| 17:30-19:00 | Izumo Unagi. |
| 19:00-21:00 | Shinsekai + Tsutenkaku. |
| 21:00-22:30 | Если будут силы: Dotonbori + street food. |
| 22:30-24:00 | Свободное время. |

### Осака, 2025-11-04

| Время | План |
| --- | --- |
| 8:30-9:30 | Подъем, завтрак. |
| 9:30-11:30 | Osaka Castle grounds. |
| 11:30-12:30 | Osaka Museum of History. |
| 12:30-14:00 | Osaka Museum of Housing and Living. |
| 14:00-15:00 | Обед: Sushiro / Gyozaclub / YakkoSushi. |
| 15:00-16:30 | Shitenno-ji. |
| 16:30-17:30 | Shinsekai + Tsutenkaku. |
| 17:30-20:30 | Kuromon + Dotonbori + street-food dinner. |
| 20:30-23:00 | Свободное время и сбор вещей. |

### Киото, 2025-11-05

| Время | План |
| --- | --- |
| 8:00-9:00 | Сборы в Осаке. |
| 9:00-10:00 | Осака -> Киото. |
| 10:00-11:00 | Заселение. |
| 11:00-14:30 | Kiyomizu-dera, Sannenzaka, Ninenzaka. |
| 14:30-15:30 | Обед в Kyoto Takashimaya food area или Nishiki Market. |
| 15:30-16:30 | Быстрый Gion. |
| 16:30-18:30 | Fushimi Inari. |
| 18:30-20:00 | Центр Киото, мини-шопинг, вечерний Gion. |
| 20:00-21:30 | Hitomebore Kyoto. |
| 21:30-23:00 | Свободное время, можно Pontocho. |

### Киото, 2025-11-06

| Время | План |
| --- | --- |
| 8:00-9:00 | Завтрак, сборы. |
| 9:00-12:00 | Arashiyama. |
| 12:00-13:30 | Дорога к Kinkaku-ji + быстрый обед. |
| 13:30-14:30 | Kinkaku-ji. |
| 14:30-16:00 | Дорога в Нару. |
| 16:00-19:00 | Nara: Todai-ji, Nara Park, Naramachi. |
| 19:00-20:00 | Назад в Киото. |
| 20:00-21:30 | Yakiniku / wagyu set. |
| 21:30-23:00 | Свободное время, можно Pontocho. |

### Токио, 2025-11-07

| Время | План |
| --- | --- |
| 08:00-09:00 | Завтрак, выезд из Киото. |
| 09:00-13:00 | Shinkansen -> Tokyo + метро до Morishita, сдать вещи. |
| 13:00-14:00 | Asakusa Monja + Asakusa Menchi. |
| 14:00-16:00 | Senso-ji + Nakamise-dori. |
| 16:00-17:00 | Sumida river, вид на Skytree + HATCOFFEE. |
| 17:00-19:00 | Zojo-ji + Tokyo Tower на закате. |
| 19:00-23:00 | Sushi in Ginza + Ginza walk + Starbucks Reserve. |

### Токио: Fuji day

| Время | План |
| --- | --- |
| 07:30-08:30 | Завтрак, выезд на Shinjuku Station. |
| 08:30-10:30 | Express до Kawaguchiko. |
| 10:30-15:30 | Lake Kawaguchiko: панорамы, Oishi Park, мост, кафе с видом. |
| 15:30-17:30 | Обратно в Токио. |
| 18:00-22:00 | Свободное окно / шопинг / Akihabara / Ginza. |

### Токио: запасной день, если Фудзи не получится

| Время | План |
| --- | --- |
| 08:00-09:00 | Завтрак, сборы. |
| 09:00-11:30 | Rikugien Garden. |
| 11:30-13:00 | Переезд к Gotokuji. |
| 13:00-14:00 | Sushi no Midori. |
| 14:00-15:30 | Gotokuji. |
| 15:30-17:00 | Setagaya Park или Shimokitazawa. |
| 17:00-18:00 | Путь в центр. |
| 18:00-22:00 | Свободное окно / Akihabara / Ginza. |

### Токио: еще один день из таблицы

| Время | План |
| --- | --- |
| 08:00-09:00 | Завтрак, сборы. |
| 09:00-12:00 | MOMAT или Miraikan. |
| 12:00-13:30 | Odaiba: Statue of Liberty, Rainbow Bridge. |
| 13:30-14:30 | Обед в фудкорте на Odaiba. |
| 14:30-16:00 | teamLab Planets. |
| 16:30-17:30 | Отдых, кофе с видом на воду. |
| 17:30-21:30 | Ginza shopping + Tsujita Ginza или Sushiro. |
| 21:30-23:00 | Свободное время. |

### Токио: день 3

| Время | План |
| --- | --- |
| 08:00-09:00 | Завтрак, сборы. |
| 09:00-11:30 | Tokyo Rinkai Disaster Prevention Park. |
| 11:30-12:00 | Переезд в центр. |
| 12:00-14:00 | Imperial Palace и East Gardens. |
| 14:00-15:00 | Sushiro или Tsujita Ginza. |
| 15:00-18:00 | Tokyo National Museum. |
| 18:00-19:00 | Ueno Park + Yanaka Ginza. |
| 19:00-20:30 | Gyukatsu Motomura Ueno. |
| 20:30-23:00 | Свободное время. |

### Токио, 2025-11-11

| Время | План |
| --- | --- |
| 08:00-09:00 | Завтрак, сборы. |
| 09:00-13:00 | Meiji Jingu. |
| 13:00-15:30 | Harajuku: Takeshita St., Omotesando, Tokyu Plaza. |
| 14:00-15:00 | Shibuya Beer Hall. |
| 15:00-16:00 | Прогулка до Shibuya. |
| 16:00-18:00 | Shibuya Crossing, Shibuya Sky, 3D figure. |
| 18:00-20:00 | Shinjuku, cat screen, Golden Gai, bars. |
| 20:00-21:30 | Udon Shin. |
| 21:30-23:00 | Сбор вещей. |

## Google Maps food/cafe list

Короткая ссылка: `https://maps.app.goo.gl/mHBUYAA1Fqv5J71v8?g_st=it`.

Название списка на скриншоте: `Еды Япония · Anastasiia Shchukina`, 62 places. Ниже сырье для будущего слоя рекомендаций; `note` взят из Google Maps list, если он был.

| # | Город/район | Название | Координаты | Note |
| --- | --- | --- | --- | --- |
| 1 | Kyoto | Live Shellfish Center Kyoto Gion Main Store | 35.001606, 135.772586 | Проверено друзьями: брать fish bowls, spicy tuna очень хорош, crab не брать. |
| 2 | Kyoto | Mochi mochi | 34.996573, 135.780209 | Моти как шоу; overpriced, но стоит зайти, если рядом. |
| 3 | Tokyo | Micasadeco & Cafe Jingumae | 35.666555, 139.705427 |  |
| 4 | Tokyo | The Matcha Tokyo Miyashita Park | 35.660870, 139.701716 |  |
| 5 | Tokyo | SACYA Shibuya Scramble Square B2F Matcha Cafe Stand | 35.658725, 139.702299 | Матча со сладкими/розовыми пенками. |
| 6 | Tokyo | Uogashi Nihon-Ichi Shibuya Dogenzaka | 35.658938, 139.698190 | Проверено друзьями: стоячие суши, хорошая цена, scallop особенно сильный; по видео готовят прямо перед гостем за стойкой. |
| 7 | Tokyo | Unosato | 35.661643, 139.696840 |  |
| 8 | Tokyo | Ramen Watanabe | 35.712027, 139.797469 |  |
| 9 | Nara | 酒菜 うおとも | 34.681059, 135.827795 |  |
| 10 | Tokyo | SHISHIKURA | 35.647036, 139.716081 |  |
| 11 | Tokyo | Asakusa Monja Zenya | 35.711944, 139.795248 | Из Tokyo sheet: обед перед Senso-ji. |
| 12 | Tokyo | Asakusa Menchi | 35.712900, 139.796055 | Какой-то прикольный стритфуд. |
| 13 | Osaka | YakkoSushi Tengo (Tenjinbashi 5-Chome) | 34.708437, 135.511869 | Бюджетный "типа омакасе"; note списка: 2-3к йен / около ¥440 за тарелку, личный текст: 3-5к йен. Друзья не были, но рекомендовали по отзывам. |
| 14 | Osaka | Sushi dokoro Tsukiji | 34.676875, 135.498355 | Хороший суши рестик. |
| 15 | Tokyo | Shibuya Sakuragaoka Beer Hall | 35.656290, 139.702693 | Фудкорт типа "Депо"; попробовать мясной сэндвич от Stabler. |
| 16 | Tokyo | Kaitenzushi Nemuro Hanamaru Ginza | 35.672245, 139.762413 | Конвейер с рыбой прямо из портов. |
| 17 | Osaka | Gyozaclub Rocklee | 34.707110, 135.512743 |  |
| 18 | Tokyo | Ginza Happo | 35.667212, 139.761820 |  |
| 19 | Osaka | IZUMO Unagi | 34.696356, 135.486708 | Инстаграмная подача унаги; автор не была в восторге, потому что не очень любит угря, зато Кириллу очень понравилось. |
| 20 | Nara/other | dan dan cafe | 34.785123, 135.881777 |  |
| 21 | Tokyo | Kyushu Jangara Akihabara | 35.700802, 139.770672 |  |
| 22 | Kyoto | Sushi Ishimatsu | 35.022192, 135.793496 | Ресторан с милой семейной парой. |
| 23 | Osaka | Sakae Sushi | 34.699029, 135.504448 |  |
| 24 | Tokyo | Sushi Sen Shibuya | 35.659652, 139.704200 | Хорошие суши из-под ножа; сет 2-4к йен. |
| 25 | Tokyo | Manten Sushi Marunouchi | 35.678785, 139.762770 | Омакасе за 8800 йен. |
| 26 | Kyoto | Kyoto Yakiniku Restaurant Gyurakutei | 35.003828, 135.756820 | Wagyu sets от 6000 йен. |
| 27 | Tokyo | Sweet Check | 35.664896, 139.713624 | Крутые омлеты. |
| 28 | Tokyo | HATCOFFEE | 35.707289, 139.793303 | 3D latte art: на скриншоте котики на стаканах. |
| 29 | Osaka | Sushi to Shabu Shabu No.8 Umeda | 34.702996, 135.503417 | All you can eat ~$50. |
| 30 | Tokyo | Nihonbashi Kaisen Donburi Tsujihan Nihonbashi | 35.680717, 139.771577 |  |
| 31 | Osaka | Okonomiyaki Mizuno | 34.668355, 135.503223 | Уже есть в `places.ts`. |
| 32 | Tokyo | Udon Shin | 35.686490, 139.696998 | Есть в Tokyo sheet как ужин в последний вечер. |
| 33 | Tokyo | Sushi no Midori Umegaoka | 35.655623, 139.654113 |  |
| 34 | Tokyo | Sushi no Midori Nihonbashi | 35.681314, 139.773930 |  |
| 35 | Tokyo | Midori Sushi Akasaka | 35.672911, 139.735870 |  |
| 36 | Tokyo | Ginza Onodera | 35.669153, 139.764551 | Омакасе. |
| 37 | Other | Sushi Ishimatsu | 36.230897, 138.476862 | Суши делает пожилая пара, очень мило и вкусно. Похоже на дальнюю точку вне базового маршрута. |
| 38 | Kyoto | Nishiki Market | 35.005026, 135.764723 | Уже есть в `places.ts`; рынок. |
| 39 | Tokyo | Yakiniku Tamakiya | 35.670677, 139.746620 | Wagyu, очень дорого. |
| 40 | Osaka | Rikuro's Namba Main Branch | 34.666127, 135.501566 | Fluffy cheesecake / пироги. |
| 41 | Osaka | Osaka Higashishinsaibashi address, B1F | 34.673679, 135.504728 | Рис со всякими штуками из курицы; нужно уточнить имя места перед переносом. |
| 42 | Osaka | grenier Umeda branch | 34.703542, 135.499191 |  |
| 43 | Osaka | Hozenji Yamakazu | 34.668143, 135.502417 | Коробки с угрем / унаги. |
| 44 | Osaka | Kadoya Shokudo | 34.676050, 135.483834 |  |
| 45 | Kyoto | Kyoto Takashimaya Shopping Center | 35.003100, 135.768496 | "Рынок, на котором едят местные"; есть в Kyoto sheet как обедный вариант. |
| 46 | Osaka | Harukoma Main Store | 34.707734, 135.511601 |  |
| 47 | Osaka | Harukoma Branch Shop | 34.706831, 135.511467 | Говорят, очень вкусные суши. |
| 48 | Osaka | Sushi Takuma | 34.682287, 135.502763 | Омакасе, кажется дорого. |
| 49 | Osaka | Sushi Sawamura | 34.702509, 135.491478 | Омакасе: lunch ~3500, dinner ~9000. |
| 50 | Kyoto | Hitomebore Kyoto | 35.003617, 135.770752 | Недорогой бар с едой; есть в Kyoto sheet. |
| 51 | Tokyo/other | Shunya-chan | 35.641399, 139.285833 | Красивый ночной ресторанчик; далеко от центра. |
| 52 | Osaka | Wagyu IDATEN | 34.667760, 135.501055 | Wagyu lunch ~1000-3500 йен. |
| 53 | Nara | Mizuya Chaya | 34.683471, 135.846803 |  |
| 54 | Tokyo | Starbucks Reserve Store Ginza Marronnier-dori Street | 35.672265, 139.767564 | Есть в Tokyo sheet как вечерний заход в Ginza. |
| 55 | Tokyo | Tsujita Ginza | 35.671433, 139.767381 | Есть в Tokyo sheet как ужин. |
| 56 | Tokyo | Gyukatsu Motomura Ueno | 35.710446, 139.774453 | Проверено/рекомендовано друзьями; сет с мясом, рисом/капустой и индивидуальной плиткой для дожаривания. |
| 57 | Osaka | Kyushu Ramen Kio Dotonbori | 34.668615, 135.499443 |  |
| 58 | Tokyo | Sushiro Yurakucho | 35.675413, 139.762850 | Есть в Tokyo sheet как запасной ужин. |
| 59 | Tokyo | cafe capyba | 35.719993, 139.814377 |  |
| 60 | Tokyo | Ginza Hachigou | 35.670548, 139.770150 | Уже есть в `places.ts` и `bookings.ts`. |
| 61 | Tokyo | Itamae Sushi Shimbashi | 35.665437, 139.756230 |  |
| 62 | Tokyo | Nanaya Aoyama Store | 35.660339, 139.707559 |  |

## Individual Google Maps links resolved

| Short link | Resolved place | Preview snapshot from screenshots |
| --- | --- | --- |
| `fd7UxJ496FnjegZz6` | Kyoto Yakiniku Restaurant Gyurakutei | 4.7★ (1107), yakiniku restaurant, `37-1 Tsukibokocho, Shimogyo Ward, Kyoto, 600-8492, Japan`. |
| `tfpEAKZXxnZmFyW19` | Mochi mochi | Link preview rating not visible in supplied screenshot. |
| `2pHTRjyuDVpkpW7K8` | Live Shellfish Center Kyoto Gion Main Store | 4.5★ (168), Japanese restaurant, `Japan, 〒605-0805 Kyoto, Higashiyama Ward, Hakatacho, 72-1 博多町ビル 1F`. |
| `3YsCNqvDtL4noGGK7` | Sabanji | 4.9★ (1211), ramen restaurant, `45-3 Kinugasa Babacho, Kita Ward, Kyoto, 603-8362, Japan`. |
| `LRkUkc6JKcfE9onZA` | Katsurai - Kinkaku-ji Temple | Link preview rating not visible in supplied screenshot. |
| `GpthqtvmoEuVnFcSA` | Uogashi Nihon-Ichi Shibuya Dogenzaka | 4.5★ (1043), restaurant, `2 Chome-9-1 Dogenzaka, Shibuya, Tokyo 150-0043, Japan`. |
| `vNBBUKuK8G1mFsvB8` | The Matcha Tokyo Omotesando | Link preview rating not visible in supplied screenshot. |
| `qcv1gGEo4mVHEDDg9` | HATCOFFEE | Link preview rating not visible in supplied screenshot; screenshot photo shows 3D latte-art cats. |
| `MMrraffPRciuhPZq6` | Gyukatsu Motomura Ueno Branch | Link preview rating not visible in supplied screenshot; screenshot photo shows katsu set and tabletop grill. |

Ratings above are screenshot snapshots only, not current verified Google Maps ratings. Recheck before moving them into user-facing runtime data.

## Hotel notes

| Город | Отель | Статус | Notes |
| --- | --- | --- | --- |
| Osaka | Daiwa Roynet Hotel Osaka-Kitahama | Проверено друзьями | Экономили на отелях, но этот понравился; "за свои деньги кайф". |
| Kyoto | Onyado Nono Kyotoshichijo | Не проверено друзьями лично | Очень хотели, но в последний момент сэкономили и не пожалели: с плотной программой не успели бы там почилить. Потенциально топ, если есть время пользоваться инфраструктурой: завтраки с икрой и лососем безлимитно, онсены, бесплатная soba и мороженое вечером, массажные кресла, комнаты с мангой, традиционный стиль. |

## Проверки перед переносом в runtime data

- Для каждого food/cafe места проверить часы, закрытия, бронь и свежие отзывы.
- Перед импортом food-list попросить автора списка отметить лично проверенные места и короткий verdict по ним.
- Для мест с ценами не хранить цену как факт без даты проверки.
- Для Sabanji / Katsurai / Mochi mochi сохранить связь "какая короткая ссылка к какому текстовому отзыву", потому что в сообщении ссылки шли плотным блоком.
- Для Namba Currency Exchange найти точные координаты вручную: ссылка из скриншота не распарсилась, а подруга предупреждала, что Google Maps мог показывать не туда.
- Если переносить 62 food точки в карту, лучше делать отдельный тип/слой "friendsFoodPlaces", чтобы не раздувать основную витрину достопримечательностей.
