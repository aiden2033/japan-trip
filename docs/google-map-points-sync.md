# Google Maps Points Sync

Use this workflow when the user asks to update Google Maps points, Google
points, friends map points, or points from the shared Google Maps list.

```bash
rtk npm run sync:google-points
rtk npm run build
rtk git diff -- src/data/friendsMapPlaces.ts
```

Source list URL:

```text
https://maps.app.goo.gl/6QKnyBj1B4gE56PS8
```

The sync script fetches the shared Google Maps list, parses the internal
`/maps/preview/entitylist/getlist` response, and rewrites:

```text
src/data/friendsMapPlaces.ts
```

Expected behavior:

- All fetched Google Maps entries with coordinates must be preserved.
- Known route-adjacent points are assigned to `osaka`, `kyoto`, or `tokyo`.
- Everything else is assigned to the fourth city, `other` (`Другое`).
- Do not manually edit `friendsMapPlaces.ts` unless the sync script fails or the
  user asks for a specific correction.
- If the Google endpoint shape changes, inspect `scripts/sync-google-map-points.mjs`
  and update the parser before editing generated data.
