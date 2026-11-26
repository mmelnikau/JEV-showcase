import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecordCover } from "@/components/RecordCover";
import { getRecord, records } from "@/data/records";

export function generateStaticParams() {
  return records.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata(
  props: PageProps<"/records/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const record = getRecord(slug);
  return { title: record ? `${record.title} · Groove Shelf` : "Not found" };
}

export default async function RecordPage(props: PageProps<"/records/[slug]">) {
  const { slug } = await props.params;
  const record = getRecord(slug);
  if (!record) notFound();

  return (
    <>
      <Link href="/" className="text-sm text-foreground/60 hover:text-foreground">
        ← All records
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="max-w-md">
          <RecordCover record={record} />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-foreground/50">
            {record.genre} · {record.year}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{record.title}</h1>
          <p className="mt-1 text-xl text-foreground/70">{record.artist}</p>
          <p className="mt-6 leading-relaxed">{record.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-mono text-2xl">€{record.price}</span>
            <button
              type="button"
              className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
            >
              Add to cart
            </button>
          </div>

          <h2 className="mt-10 font-semibold">Tracklist</h2>
          <ol className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10">
            {record.tracks.map((track, i) => (
              <li key={track} className="flex gap-4 py-2">
                <span className="w-6 font-mono text-foreground/40">{i + 1}</span>
                {track}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
