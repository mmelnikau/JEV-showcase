import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Skipped a groove</h1>
      <p className="mt-2 text-foreground/60">We couldn&apos;t find that record.</p>
      <Link href="/" className="mt-6 inline-block underline">
        Back to all records
      </Link>
    </div>
  );
}
