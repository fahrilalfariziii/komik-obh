import Link from "next/link";
import MangaCard from "@/components/MangaCard";
import { getLatest, getPopular, slugFromLink } from "@/lib/sanka";

export default async function Home() {
  const [popular, latest] = await Promise.all([
    getPopular().catch(() => ({ comics: [] })),
    getLatest().catch(() => ({ comics: [] })),
  ]);
  const popularComics = (popular.comics ?? []).slice(0, 10);
  const latestComics = (latest.comics ?? []).slice(0, 12);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">
        Baca Komik Bahasa Indonesia
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Manga, manhwa, dan manhua dengan update chapter terbaru.
      </p>
      <form
        action="/search"
        method="get"
        className="mt-6 flex gap-2"
        role="search"
      >
        <input
          name="q"
          placeholder="Cari judul, misal Solo Leveling"
          aria-label="Cari komik"
          className="h-11 flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="h-11 rounded-md bg-amber-400 px-4 text-sm font-medium text-black"
        >
          Cari
        </button>
      </form>

      {popularComics.length ? (
        <section aria-labelledby="populer" className="mt-10">
          <h2 id="populer" className="text-lg font-semibold">
            Komik Populer
          </h2>
          <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {popularComics.map((c, i) => (
              <li key={c.link} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute left-2 top-2 z-10 rounded bg-black/70 px-2 py-0.5 text-xs font-bold text-amber-400"
                >
                  #{i + 1}
                </span>
                <MangaCard
                  id={slugFromLink(c.link)}
                  title={c.title}
                  cover={c.image}
                  status={c.chapter}
                />
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {latestComics.length ? (
        <section aria-labelledby="terbaru" className="mt-10">
          <h2 id="terbaru" className="text-lg font-semibold">
            Komik Terbaru
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {latestComics.map((c) => (
              <div key={c.link}>
                <MangaCard
                  id={slugFromLink(c.link)}
                  title={c.title}
                  cover={c.image}
                  status={c.chapter}
                />
                {c.time_ago ? (
                  <p className="mt-1 text-xs text-zinc-500">{c.time_ago}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {!popularComics.length && !latestComics.length ? (
        <div className="mt-8 text-sm text-zinc-400">
          <p>Gagal memuat daftar komik. Coba lagi nanti.</p>
          <p className="mt-2">
            Atau buka{" "}
            <Link href="/search?q=solo%20leveling" className="text-amber-300 underline">
              contoh pencarian
            </Link>
            .
          </p>
        </div>
      ) : null}
    </main>
  );
}
