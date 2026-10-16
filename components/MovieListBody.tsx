import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import StatePanel from "@/components/StatePanel";
import type { MovieItem } from "@/lib/movie";

export default function MovieListBody({
  list,
  page,
  totalPages,
  basePath,
  query = {},
}: {
  list: MovieItem[];
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string>;
}) {
  const qs = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    for (const [k, v] of Object.entries(query)) {
      if (v) params.set(k, v);
    }
    return `${basePath}?${params.toString()}`;
  };

  if (!list.length) {
    return (
      <div className="mt-6">
        <StatePanel
          icon="info"
          title="Tidak ada judul di halaman ini"
          message="Ubah filter atau kembali ke halaman pertama."
          actionLabel="Halaman 1"
          actionHref={qs(1)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((m) => (
          <MovieCard key={m.id} item={m} />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link
            href={qs(page - 1)}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}
        <span className="text-xs text-[var(--text-muted)]">
          Halaman {page}
          {totalPages ? ` dari ${totalPages}` : ""}
        </span>
        {!totalPages || page < totalPages ? (
          <Link
            href={qs(page + 1)}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            Berikutnya →
          </Link>
        ) : (
          <span className="text-xs text-[var(--text-muted)]">Halaman terakhir</span>
        )}
      </nav>
    </>
  );
}
