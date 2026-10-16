import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getOngoing } from "@/lib/anime";

export const metadata = {
  title: "Anime Ongoing",
  description: "Daftar anime yang sedang tayang.",
};

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function OngoingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = normPage(sp.page);

  let list: Array<{
    animeId: string;
    title: string;
    poster: string;
    episodes?: number;
    releaseDay?: string;
    latestReleaseDate?: string;
  }> = [];
  let pagination: {
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
  } | null | undefined;
  try {
    const res = await getOngoing(page);
    list = res.data?.animeList ?? [];
    pagination = res.pagination;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat ongoing"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/anime"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="play" size={22} className="text-[var(--accent)]" />
        Anime Ongoing
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Halaman {page}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <AnimeCard
            key={a.animeId}
            id={a.animeId}
            title={a.title}
            cover={a.poster}
            meta={a.episodes ? `Ep ${a.episodes}` : a.latestReleaseDate}
            badge={a.releaseDay}
          />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link
            href={`/anime/ongoing?page=${page - 1}`}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}
        {pagination?.hasNextPage ? (
          <Link
            href={`/anime/ongoing?page=${pagination.nextPage ?? page + 1}`}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            Berikutnya →
          </Link>
        ) : (
          <span className="text-xs text-[var(--text-muted)]">Halaman terakhir</span>
        )}
      </nav>
    </main>
  );
}
