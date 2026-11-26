# Groove Shelf

A dead-simple vinyl record store showcase built with Next.js and MongoDB.

## Getting started

```bash
npm install
npm run db      # start MongoDB in Docker (docker compose up -d)
npm run seed    # load the 200 albums from db/catalog.json
npm run dev     # http://localhost:3000
```

MongoDB must be running for `npm run build` too, because the record pages are prerendered from it.
Set `MONGODB_URI` to use a different database (default: `mongodb://localhost:27017/groove-shelf`).

## Catalog

- `db/albums.ts`: the curated list of albums (artist, title, year, genre).
- `db/catalog.json`: generated from that list and holds the tracklists, labels and prices. Seeding reads only this file.
- `public/covers/`: cover images, one per album.

To change the catalog, edit `db/albums.ts`, then run `npm run catalog` (fetches covers and tracklists
from Deezer's public API) and `npm run seed`.
