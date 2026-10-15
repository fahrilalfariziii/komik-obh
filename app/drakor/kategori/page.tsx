import Link from "next/link";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getKategori } from "@/lib/drakor";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Kategori Drakor",
  description: "Jelajahi drama Korea per kategori.",
};

export default async function KategoriPage() {
  await requireOwner();

  let items: Array<{ id: string; title: string; count?: number }> = [];
  try {
    const res = await getKategori();
    items = res.items ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat kategori"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/drakor"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="grid" size={22} className="text-[var(--accent)]" />
        Kategori Drakor
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{items.length} kategori</p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((k) => (
          <Link
            key={k.id}
            href={`/drakor/kategori/${k.id}`}
            className="group flex min-h-[64px] items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-4 transition-colors hover:border-[var(--accent)]"
          >
            <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)]">
              {k.title}
            </span>
            {typeof k.count === "number" ? (
              <span className="shrink-0 rounded-full border border-[var(--border-strong)] px-2.5 py-1 text-xs text-[var(--text-muted)] tabular-nums">
                {k.count} judul
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  );
}
