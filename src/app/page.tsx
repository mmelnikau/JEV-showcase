import Link from "next/link";
import { RecordCover } from "@/components/RecordCover";
import { getAlbums } from "@/lib/albums";

export default async function Home() {
  const albums = await getAlbums();

  return (
    <>
      <section className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Fresh off the press</h1>
        <p className="mt-2 text-foreground/60">
          {albums.length} records, from 1950s jazz to this year&apos;s chart
          toppers.
        </p>
      </section>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {albums.map((album, i) => (
          <li key={album.slug}>
            <Link href={`/records/${album.slug}`} className="block">
              <RecordCover
                album={album}
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
                priority={i < 8}
              />
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium">{album.title}</p>
                  <p className="truncate text-sm text-foreground/60">
                    {album.artist} · {album.year}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-sm">€{album.price.toFixed(2)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
