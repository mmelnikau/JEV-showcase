import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecordCover } from "@/components/RecordCover";
import { getAlbum, getAlbums } from "@/lib/albums";

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata(
  props: PageProps<"/records/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const album = await getAlbum(slug);
  return {
    title: album ? `${album.title} – ${album.artist} · Groove Shelf` : "Not found",
  };
}

export default async function RecordPage(props: PageProps<"/records/[slug]">) {
  const { slug } = await props.params;
  const album = await getAlbum(slug);
  if (!album) notFound();

  const details = [
    album.genre,
    album.year,
    album.label,
    album.duration ? `${Math.round(album.duration / 60)} min` : null,
  ].filter(Boolean);

  return (
    <>
      <Link href="/" className="text-sm text-foreground/60 hover:text-foreground">
        ← All records
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="max-w-md">
          <RecordCover album={album} sizes="(min-width: 768px) 448px, 100vw" priority />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-foreground/50">
            {details.join(" · ")}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{album.title}</h1>
          <p className="mt-1 text-xl text-foreground/70">{album.artist}</p>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-mono text-2xl">€{album.price.toFixed(2)}</span>
            <button
              type="button"
              className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
            >
              Add to cart
            </button>
          </div>

          {album.tracks.length > 0 && (
            <>
              <h2 className="mt-10 font-semibold">Tracklist</h2>
              <ol className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10">
                {album.tracks.map((track, i) => (
                  <li key={i} className="flex gap-4 py-2">
                    <span className="w-6 shrink-0 font-mono text-foreground/40">{i + 1}</span>
                    {track}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </>
  );
}
