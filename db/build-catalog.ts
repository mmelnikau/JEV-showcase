/**
 * One-off: looks up every album in albums.ts on Deezer's public API,
 * downloads its cover into public/covers and writes db/catalog.json.
 * Seeding (seed.ts) only reads catalog.json, so it never needs the network.
 *
 *   npm run catalog
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { albums } from "./albums";

const COVERS_DIR = path.join(process.cwd(), "public", "covers");
const CATALOG_FILE = path.join(process.cwd(), "db", "catalog.json");

type DeezerAlbum = {
  id: number;
  title: string;
  artist: { name: string };
  cover_big: string;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const normalize = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const slugify = (s: string) => normalize(s).replace(/ /g, "-").slice(0, 80);

async function deezer<T>(url: string): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(150); // Deezer allows ~50 requests per 5 seconds.
    const res = await fetch(url);
    const json = await res.json();
    if (json?.error?.code === 4) {
      await sleep(5000); // Quota exceeded, back off.
      continue;
    }
    if (json?.error) throw new Error(`${url}: ${JSON.stringify(json.error)}`);
    return json as T;
  }
  throw new Error(`${url}: rate limited`);
}

function score(found: DeezerAlbum, artist: string, title: string) {
  const ft = normalize(found.title);
  const t = normalize(title);
  let s = ft === t ? 4 : ft.startsWith(t) || t.startsWith(ft) ? 2 : 0;
  if (artist !== "Various Artists" && normalize(found.artist.name) === normalize(artist)) s += 3;
  if (/live|karaoke|tribute|instrumental/.test(ft) && !/live/.test(t)) s -= 3;
  return s;
}

async function findAlbum(artist: string, title: string) {
  const queries = [
    artist === "Various Artists"
      ? `album:"${title}"`
      : `artist:"${artist}" album:"${title}"`,
    `${artist === "Various Artists" ? "" : artist} ${title}`.trim(),
  ];
  for (const q of queries) {
    const { data } = await deezer<{ data: DeezerAlbum[] }>(
      `https://api.deezer.com/search/album?limit=10&q=${encodeURIComponent(q)}`,
    );
    const best = data
      .map((a) => ({ a, s: score(a, artist, title) }))
      .sort((x, y) => y.s - x.s)[0];
    if (best && best.s >= 2) return best.a;
  }
  return undefined;
}

/** Stable pseudo-random price between 19.99 and 34.99. */
function priceFor(slug: string) {
  const n = createHash("md5").update(slug).digest().readUInt16BE(0);
  return 19.99 + (n % 16);
}

async function main() {
  mkdirSync(COVERS_DIR, { recursive: true });
  const catalog = [];
  const missing: string[] = [];

  for (const [i, [artist, title, year, genre, deezerId]] of albums.entries()) {
    const label = `${artist} – ${title}`;
    const slug = slugify(`${artist} ${title}`);
    try {
      const found = deezerId
        ? await deezer<DeezerAlbum>(`https://api.deezer.com/album/${deezerId}`)
        : await findAlbum(artist, title);
      if (!found) {
        missing.push(label);
        console.log(`✗ ${label}`);
        continue;
      }

      const details = await deezer<{
        label: string;
        duration: number;
        tracks: { data: { title: string }[] };
      }>(`https://api.deezer.com/album/${found.id}`);

      const coverFile = path.join(COVERS_DIR, `${slug}.jpg`);
      if (!existsSync(coverFile)) {
        const img = await fetch(found.cover_big);
        writeFileSync(coverFile, Buffer.from(await img.arrayBuffer()));
      }

      catalog.push({
        slug,
        title,
        artist,
        year,
        genre,
        price: priceFor(slug),
        label: details.label,
        duration: details.duration,
        cover: `/covers/${slug}.jpg`,
        tracks: details.tracks.data.map((t) => t.title).slice(0, 30),
        matched: `${found.artist.name} – ${found.title}`,
      });
      console.log(`✓ [${i + 1}/${albums.length}] ${label}  →  ${found.artist.name} – ${found.title}`);
    } catch (err) {
      missing.push(label);
      console.log(`✗ ${label}: ${(err as Error).message}`);
    }
  }

  writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2) + "\n");
  console.log(`\nWrote ${catalog.length} albums to db/catalog.json`);
  if (missing.length) console.log(`Missing (${missing.length}):\n  ${missing.join("\n  ")}`);
}

main();
