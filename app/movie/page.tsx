import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import MovieHero from "@/components/MovieHero";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { NETWORKS, getHome, type MovieHome } from "@/lib/movie";

export const metadata = {
  title: "Nonton Film & Series",
  description: "Nonton film dan series subtitle Indonesia: trending, original network, dan terbaru.",
};

export default async function MovieHome() {
  let data: MovieHome;
  try {
    data = await getHome();
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Nonton Film & Series</h1>
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Gagal memuat katalog film"
            message={e instanceof Error ? e.message : "Coba lagi."}
            actionLabel="Coba lagi"
            actionHref="/movie"
          />
        </div>
      </main>
    );
  }

  const slider = data.sliderItems ?? [];
  const sections = data.sections ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Film & Series</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
          Katalog film dan series dari jaringan populer, dengan subtitle Indonesia.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/movie/film"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            Jelajahi Film
          </Link>
          <Link
            href="/movie/series"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Jelajahi Series
          </Link>
        </nav>
      </section>

      <div className="mt-8">
        <MovieHero items={slider} />
      </div>

      {sections.map((section, i) => (
        <section key={section.sectionId ?? section.slug ?? i} className="mt-10">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
              <Icon name="clapper" size={18} className="text-[var(--accent)]" />
              {section.title}
            </h2>
          </div>
          {section.items?.length ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {section.items.slice(0, 10).map((m) => (
                <MovieCard key={m.id} item={m} />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[var(--text-muted)]">Belum ada judul di bagian ini.</p>
          )}
        </section>
      ))}

      <section className="mt-12">
        <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
          <Icon name="grid" size={18} className="text-[var(--accent)]" />
          Network
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {NETWORKS.map((n) => (
            <Link
              key={n.slug}
              href={`/movie/network/${n.slug}`}
              className="group flex min-h-[64px] items-center justify-center rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-3 text-center text-sm font-medium transition-colors hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
