import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groove Shelf · Vinyl Records",
  description: "A small vinyl record store showcase.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-foreground/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              ◉ Groove Shelf
            </Link>
            <span className="text-sm text-foreground/60">Vinyl records</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
          {children}
        </main>
        <footer className="border-t border-foreground/10 py-6 text-center text-sm text-foreground/50">
          Groove Shelf — a showcase store. All records are fictional.
        </footer>
      </body>
    </html>
  );
}
