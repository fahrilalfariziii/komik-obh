import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import { getGenre } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  await requireOwner();
  const { slug } = await params;
  const sp = await searchParams;
  const page = normPage(sp.page);

  let list: Array<{
    animeId: string;
    title: string;
    poster: string;
    score?: string;
    status?: string;
  }> = [];
  let pagination: { hasNextPage?: boolean; nextPage?: number | null } | null | undefined;
  try {
    const res = await getGenre(slug, page);
    list = res.data?.animeList ?? [];
    pagination = res.pagination;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat genre"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/anime"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="text-2xl font-bold tracking-tight">
        Genre: <span className="text-[var(--accent)]">{slug}</span>
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Halaman {page} • {list.length} judul
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <AnimeCard
            key={a.animeId}
            id={a.animeId}
            title={a.title}
            cover={a.poster}
            meta={a.score ? `Skor ${a.score}` : a.status}
          />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link
            href={`/anime/genre/${slug}?page=${page - 1}`}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}
        {pagination?.hasNextPage ? (
          <Link
            href={`/anime/genre/${slug}?page=${pagination.nextPage ?? page + 1}`}
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
