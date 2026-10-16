import Link from "next/link";
import DrakorCard from "@/components/DrakorCard";
import DrakorSearchForm from "@/components/DrakorSearchForm";
import StatePanel from "@/components/StatePanel";
import { searchDrakor, type DrakorSearchItem } from "@/lib/drakor";

export const metadata = {
  title: "Cari Drakor",
  description: "Cari judul drama Korea subtitle Indonesia.",
};

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function CariPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const page = normPage(sp.page);

  if (!q) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Cari Drakor</h1>
        <div className="mt-5">
          <DrakorSearchForm />
        </div>
        <div className="mt-6">
          <StatePanel
            icon="search"
            title="Belum ada kata kunci"
            message="Tuliskan judul drakor pada kolom di atas, lalu tekan Cari."
            actionLabel="Kembali ke drakor"
            actionHref="/drakor"
          />
        </div>
      </main>
    );
  }

  let list: DrakorSearchItem[] = [];
  let hasNext = false;
  let total = 0;
  try {
    const res = await searchDrakor(q, page);
    list = res.items ?? [];
    hasNext = res.pagination?.hasNextPage ?? false;
    total = res.total ?? 0;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="line-clamp-2 text-2xl font-bold tracking-tight">
          Hasil untuk <span className="text-[var(--accent)]">{q}</span>
        </h1>
        <div className="mt-5">
          <DrakorSearchForm defaultValue={q} />
        </div>
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Pencarian gagal"
            message={e instanceof Error ? e.message : "Coba lagi."}
            actionLabel="Kembali ke drakor"
            actionHref="/drakor"
          />
        </div>
      </main>
    );
  }

  if (!list.length) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="line-clamp-2 text-2xl font-bold tracking-tight">
          Hasil untuk <span className="text-[var(--accent)]">{q}</span>
        </h1>
        <div className="mt-5">
          <DrakorSearchForm defaultValue={q} />
        </div>
        <div className="mt-6">
          <StatePanel
            icon="search"
            title={`Tidak ada hasil untuk "${q}"`}
            message="Coba ejaan lain atau judul yang lebih singkat."
            actionLabel="Kembali ke drakor"
            actionHref="/drakor"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="line-clamp-2 text-2xl font-bold tracking-tight">
        Hasil untuk <span className="text-[var(--accent)]">{q}</span>
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        {total ? `${total} hasil • ` : ""}Halaman {page}
      </p>
      <div className="mt-5">
        <DrakorSearchForm defaultValue={q} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {list.map((a) => (
          <DrakorCard key={a.id} id={a.slug || a.id} title={a.title} cover={a.poster} />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link
            href={`/drakor/cari?q=${encodeURIComponent(q)}&page=${page - 1}`}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}
        {hasNext ? (
          <Link
            href={`/drakor/cari?q=${encodeURIComponent(q)}&page=${page + 1}`}
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
