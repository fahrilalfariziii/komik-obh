import Link from "next/link";
import MangaCard from "@/components/MangaCard";
import UpdateRow from "@/components/UpdateRow";
import RankRow from "@/components/RankRow";
import TabLeaderboard from "@/components/TabLeaderboard";
import HeroSearch from "@/components/HeroSearch";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getLatest, getPopular, slugFromLink } from "@/lib/sanka";

export default async function Home() {
  const [popularResult, latestResult] = await Promise.allSettled([getPopular(), getLatest()]);
  const popular = popularResult.status === "fulfilled" ? popularResult.value.comics ?? [] : [];
  const latest = latestResult.status === "fulfilled" ? latestResult.value.comics ?? [] : [];
  const failed = popularResult.status === "rejected" && latestResult.status === "rejected";

  const popular10 = popular.slice(0, 10);
  const latest12 = latest.slice(0, 12);
  const weekly = latest.slice(0, 10);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          Baca komik Bahasa Indonesia
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
          Manga, manhwa, dan manhua dengan update chapter terbaru.
        </p>
        <div className="mt-5">
          <HeroSearch />
        </div>
      </section>

      {failed ? (
        <div className="mt-10">
          <StatePanel
            icon="alert"
            title="Gagal memuat daftar komik"
            message="Sumber data komik tidak bisa dihubungi. Periksa koneksi internet lalu muat ulang halaman ini."
            actionLabel="Coba lagi"
            actionHref="/"
          />
        </div>
      ) : (
        <>
          <div className="mt-10">
            <TabLeaderboard popular={popular} latest={weekly} />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <section aria-labelledby="terbaru">
              <div className="flex items-baseline justify-between gap-3">
                <h2 id="terbaru" className="inline-flex items-center gap-2 text-lg font-semibold">
                  <Icon name="clock" size={18} className="text-[var(--accent)]" />
                  Baca Komik Terbaru
                </h2>
                <span className="text-xs text-[var(--text-muted)]">{latest12.length} judul</span>
              </div>
              <div className="-mx-2 mt-2 divide-y divide-[var(--border)]">
                {latest12.map((c) => (
                  <UpdateRow
                    key={c.link}
                    title={c.title}
                    link={c.link}
                    image={c.image}
                    chapter={c.chapter}
                    timeAgo={c.time_ago}
                  />
                ))}
              </div>
            </section>

            <section aria-labelledby="populer">
              <div className="flex items-baseline justify-between gap-3">
                <h2 id="populer" className="inline-flex items-center gap-2 text-lg font-semibold">
                  <Icon name="fire" size={18} className="text-[var(--accent)]" />
                  Populer Minggu Ini
                </h2>
                <Link
                  href="/peringkat"
                  className="text-xs text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
                >
                  Lihat peringkat
                </Link>
              </div>
              <ol className="mt-2 divide-y divide-[var(--border)] rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-1">
                {popular10.map((c, i) => (
                  <li key={c.link}>
                    <RankRow
                      rank={i + 1}
                      href={`/manga/${slugFromLink(c.link)}`}
                      title={c.title}
                      cover={c.image}
                      meta={c.chapter}
                      size="display-2"
                    />
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section aria-labelledby="lainnya" className="mt-12">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="lainnya" className="inline-flex items-center gap-2 text-lg font-semibold">
                <Icon name="grid" size={18} className="text-[var(--accent)]" />
                Jelajahi Judul Populer
              </h2>
              <Link
                href="/search?q=manhwa"
                className="text-xs text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
              >
                Cari judul lain
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {popular10.map((c) => (
                <MangaCard
                  key={c.link}
                  id={slugFromLink(c.link)}
                  title={c.title}
                  cover={c.image}
                  status={c.chapter}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
