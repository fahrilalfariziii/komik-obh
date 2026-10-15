import type { Metadata } from "next";
import { Suspense } from "react";
import MangaCard from "@/components/MangaCard";
import TypeFilters from "@/components/TypeFilters";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { searchComics } from "@/lib/sanka";
import { requireOwner } from "@/lib/gate";
import { isTypeFilter, matchesType, TYPE_OPTIONS } from "@/lib/komik-type";

export const metadata: Metadata = {
  title: "Cari Komik",
  description: "Cari judul manga, manhwa, dan manhua Bahasa Indonesia.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  await requireOwner();
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const activeType = isTypeFilter(sp.type) ? sp.type : "all";

  let items: Array<{ title: string; slug: string; thumbnail: string; type?: string; genre?: string }> = [];
  let loadError = "";
  if (q) {
    try {
      const json = await searchComics(q);
      items = json.data ?? [];
    } catch (e) {
      loadError = e instanceof Error ? e.message : "Gagal memuat.";
    }
  }

  const filtered = items.filter((m) => matchesType(m.type, activeType));

  const subtitle = !q
    ? "Masukkan kata kunci untuk mulai mencari"
    : loadError
      ? "Hasil tidak bisa dimuat"
      : `${filtered.length} hasil${activeType !== "all" ? " pada filter terpilih" : ""}`;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="line-clamp-2 text-2xl font-bold tracking-tight">
        {q ? (
          <span>
            Hasil untuk <span className="text-[var(--accent)]">{q}</span>
          </span>
        ) : (
          "Cari Komik"
        )}
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>

      <form action="/search" method="get" role="search" className="mt-5 flex gap-2">
        {activeType !== "all" ? <input type="hidden" name="type" value={activeType} /> : null}
        <div className="flex h-12 flex-1 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
          <Icon name="search" size={18} className="text-[var(--text-muted)]" />
          <label htmlFor="search-q" className="sr-only">
            Cari komik
          </label>
          <input
            id="search-q"
            name="q"
            defaultValue={q}
            placeholder="Cari judul, misal Solo Leveling"
            autoComplete="off"
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
        >
          Cari
        </button>
      </form>

      {q ? (
        <div className="mt-4">
          <Suspense fallback={<div className="h-9" aria-hidden="true" />}>
            <TypeFilters active={activeType} options={TYPE_OPTIONS} />
          </Suspense>
        </div>
      ) : null}

      <div className="mt-6">
        {!q ? (
          <StatePanel
            icon="search"
            title="Belum ada kata kunci"
            message="Tuliskan judul komik pada kolom pencarian di atas, lalu tekan Cari."
            actionLabel="Jelajahi peringkat"
            actionHref="/peringkat"
          />
        ) : loadError ? (
          <StatePanel
            icon="alert"
            title="Pencarian gagal"
            message={loadError}
            actionLabel="Kembali ke beranda"
            actionHref="/"
          />
        ) : !items.length ? (
          <StatePanel
            icon="search"
            title={`Tidak ada hasil untuk "${q}"`}
            message="Coba ejaan lain, judul yang lebih singkat, atau jelajahi daftar peringkat."
            actionLabel="Lihat peringkat"
            actionHref="/peringkat"
          />
        ) : !filtered.length ? (
          <StatePanel
            icon="info"
            title="Tidak ada hasil pada filter ini"
            message="Nol hasil setelah filter jenis. Pilih Semua untuk melihat seluruh hasil pencarian."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((m) => (
              <MangaCard
                key={m.slug}
                id={m.slug}
                title={m.title}
                cover={m.thumbnail}
                type={m.type}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
