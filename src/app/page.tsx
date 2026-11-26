import Link from "next/link";
import { RecordCover } from "@/components/RecordCover";
import { records } from "@/data/records";

export default function Home() {
  return (
    <>
      <section className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Fresh off the press</h1>
        <p className="mt-2 text-foreground/60">
          Hand-picked vinyl, from late-night jazz to loud metal.
        </p>
      </section>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {records.map((record) => (
          <li key={record.slug}>
            <Link href={`/records/${record.slug}`} className="block">
              <RecordCover record={record} />
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium">{record.title}</p>
                  <p className="truncate text-sm text-foreground/60">
                    {record.artist}
                  </p>
                </div>
                <p className="font-mono text-sm">€{record.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
