import type { Metadata } from "next";
import Image from "next/image";
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
  title: "JEVinyl",
  description: "A small vinyl record store showcase.",
  icons: { icon: "https://canvasreply.com/favicon.ico" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-50 border-b border-foreground/10 bg-surface">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" aria-label="Home">
              <Image
                src="/logo.png"
                alt=""
                width={598}
                height={187}
                priority
                className="h-10 w-auto"
              />
            </Link>
            <span className="text-sm text-foreground/60">JEVinyl - JEV showcase</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
          {children}
        </main>
        <footer className="border-t border-foreground/10 py-6 text-center text-sm text-foreground/50">
          Groove Shelf — a showcase store. Nothing here is for sale.
        </footer>
      </body>
    </html>
  );
}
