import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
        <Link href="/" className="text-base font-bold tracking-tight text-zinc-50">
          Komik<span className="text-amber-400">Reader</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm sm:flex" aria-label="Utama">
          <Link href="/" className="text-zinc-300 hover:text-zinc-50">
            Beranda
          </Link>
          <Link href="/search" className="text-zinc-300 hover:text-zinc-50">
            Cari Komik
          </Link>
        </nav>
        <form action="/search" method="get" role="search" className="ml-auto flex gap-2">
          <input
            name="q"
            placeholder="Cari judul..."
            aria-label="Cari komik"
            className="h-9 w-36 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none focus:border-amber-400 sm:w-56"
          />
          <button
            type="submit"
            className="h-9 rounded-md bg-amber-400 px-3 text-sm font-medium text-black"
          >
            Cari
          </button>
        </form>
      </div>
    </header>
  );
}
