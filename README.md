# Japan Trip Guide / Гид по Японии 🇯🇵

## What this is

A small, fast, offline-friendly single-page guide for one specific trip across Japan. It groups every place worth visiting by city, shows compact tags, time estimates and "best time to go" hints, marks day-trips and which of them cannot be combined on the same day, and offers a fuzzy search that works in both English and Russian. There are **no runtime API calls** and **no `localStorage` dependency** — all data is bundled at build time, so it loads instantly and works as a static site.

Небольшой быстрый офлайн-гид по конкретной поездке: места сгруппированы по городам, компактные теги, оценки времени, подсказки "когда идти", пометки дейтрипов и нечёткий поиск на русском и английском. Никаких сетевых запросов и зависимости от `localStorage`.

**Route / Маршрут:** `Osaka → Kyoto → Tokyo`

## Run locally / Локальный запуск

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # serve the built dist/ locally to verify the production bundle
```

## Add / edit a place / Добавить или изменить место

Places live in **`src/data/places.ts`** as a single `Place[]` array. Each entry follows the `Place` shape defined in `src/data/types.ts`:

```ts
export interface Place {
  slug: string;                    // unique URL id, e.g. 'fushimi-inari'
  nameEn: string;                  // English name
  nameRu: string;                  // Russian name
  city: 'osaka' | 'kyoto' | 'tokyo';
  tags: Tag[];                     // small chips shown on the card
  timeEstimateHours: [number, number]; // [min, max]; equal values render as "~N ч"
  bestTime?: string;               // optional "best time to go" hint
  description: string;             // short blurb
  mapsQuery: string;               // text used to build the Google Maps link
  photo?: string;                  // optional 'photos/<city>/<file>' (see "Add real photos")
  isDayTrip?: boolean;             // renders the amber day-trip frame + badge
  dayTripGroup?: string;           // groups day-trips into a "pick one per day" block
  incompatibleWith?: string[];     // slugs that cannot be combined on the same day
  combinesWith?: string[];         // slugs that pair well on the same day
  note?: string;                   // optional extra note (kanji, transport, etc.)
  anime?: string[];                // related anime titles, shown in the expanded card
}
```

Minimal example — just append a new object to the `places` array:

```ts
{
  slug: 'teamlab-borderless',
  nameEn: 'teamLab Borderless',
  nameRu: 'тимЛаб Бордерлесс',
  city: 'tokyo',
  tags: ['museum', 'tickets-ahead'],
  timeEstimateHours: [2, 3],
  description: 'Иммерсивный цифровой арт-музей.',
  mapsQuery: 'teamLab Borderless, Tokyo, Japan',
},
```

Field notes:

- **`tags`** — small chips on every card. Allowed values come from the `Tag` union in `src/data/types.ts` (`morning`, `food`, `temple-shrine`, `nature`, `view`, `shopping`, `nightlife`, `museum`, `walk`, `day-trip`, `castle`, `tickets-ahead`, `low-mobility`, `cafe`, `anime`). Their emoji + Russian labels live in `src/lib/tags.ts` (`TAG_LABELS`). To add a brand-new tag, extend the `Tag` type **and** add a label in `TAG_LABELS`. Tags are also a search key, so good tags improve search.
- **`dayTripGroup`** — id of a group declared in `src/data/trip.ts` (`dayTripGroups`). Day-trips that share a group render together inside a dashed amber "pick one per day" block, with the group `label`/`note` shown above the cards.
- **`incompatibleWith`** — list of other slugs that **cannot** be done on the same day. Rendered as a compact red "⚠ нельзя совмещать в один день с: …" line on the card and the detail page.
- **`combinesWith`** — list of slugs that **pair well** on the same day. Rendered as a green "✓ часто совмещают с: …" line. (e.g. `hakone` ↔ `gotemba-premium-outlets`).
- **`anime`** — optional list of anime connected to the place (e.g. `['Евангелион (Neon Genesis Evangelion)']`). Rendered as a "🎬 Аниме, связанные с этим местом" block when a card is expanded; add the `anime` tag too so the place is filterable.

After editing, run `npm run build` to confirm types are still valid.

## Add real photos / Добавить настоящие фото

1. Drop an image into the city subfolder **`public/photos/<city>/`** (`osaka` / `kyoto` / `tokyo`). Any web format works — `.jpg`, `.jpeg`, `.webp`, `.avif`. Name it after the place, e.g. `public/photos/kyoto/fushimi-inari.jpg`.
2. Set the `photo` field on that place in `src/data/places.ts` to the path **relative to `public/`, without a leading slash**, including the real extension:

   ```ts
   photo: 'photos/kyoto/fushimi-inari.jpg',
   ```

   The component prepends `import.meta.env.BASE_URL`, so the path resolves correctly both locally and on a GitHub Pages project subpath — do **not** add a leading `/` or `./`.

Notes:

- Images are **lazy-loaded** (`loading="lazy"`) and rendered at a **fixed 16:9 aspect ratio** (`aspect-video`), so the layout never jumps while images load.
- If `photo` is absent — or the file fails to load — a **colored placeholder renders automatically** (city-accent gradient with the place name). There are never broken images, so adding photos is fully optional and incremental.

## Edit tips / Редактировать советы

- **Per-city tips, intro and "where to stay":** `src/data/cities.ts` — each city object has `intro`, `stay` (`{ area, why }[]`) and `tips` (`string[]`). The `tips` array drives the collapsible "Советы по городу" block on each city page.
- **Global tips, route, dates and departure:** `src/data/trip.ts` — `trip.globalTips` feeds the collapsible "Советы по Японии" on the home page, `trip.departure` feeds "Вылет / последняя ночь", and `trip.route` / `trip.summary` / `trip.dates` drive the home header. `dayTripGroups` defines the day-trip group labels and notes.

## Deploy to GitHub Pages / Деплой

- A push to **`main`** triggers **`.github/workflows/deploy.yml`**, which runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages.
- One-time setup: in the GitHub repo go to **Settings → Pages** and set **Source = GitHub Actions**.
- `vite.config.ts` sets **`base: './'`**, so all asset URLs are relative and the site works under `https://<user>.github.io/<repo-name>/` without extra config.
- Routing uses **`HashRouter`**, so deep links and page refreshes work on Pages with no `404` (the path lives after `#`, e.g. `…/#/tokyo/shibuya-sky`, and is never sent to the server).

## Tech stack

Vite · React · TypeScript · Tailwind CSS v3 · react-router (`HashRouter`) · Fuse.js (fuzzy EN+RU search).
