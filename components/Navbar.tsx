"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/chapter")) return null;
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4">
        <Link
          href="/"
          className="flex min-h-[44px] shrink-0 items-center text-base font-bold tracking-tight text-zinc-50"
        >
          Komik<span className="text-amber-400">Reader</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm sm:flex" aria-label="Utama">
          <Link
            href="/"
            className="flex min-h-[44px] items-center rounded-md px-3 text-zinc-300 hover:text-zinc-50"
          >
            Beranda
          </Link>
          <Link
            href="/search"
            className="flex min-h-[44px] items-center rounded-md px-3 text-zinc-300 hover:text-zinc-50"
          >
            Cari Komik
          </Link>
        </nav>
        <form action="/search" method="get" role="search" className="ml-auto flex gap-2">
          <input
            name="q"
            placeholder="Cari judul..."
            aria-label="Cari komik"
            className="h-11 w-32 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none focus:border-amber-400 sm:w-56"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-md bg-amber-400 px-4 text-sm font-medium text-black"
          >
            Cari
          </button>
        </form>
      </div>
    </header>
  );
}
