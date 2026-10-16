import Link from "next/link";
import DrakorCard from "@/components/DrakorCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getOngoing, type DrakorItem } from "@/lib/drakor";

export const metadata = {
  title: "Drakor Ongoing",
  description: "Daftar drama Korea yang sedang tayang.",
};

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

const clean = (s?: string) => (s ?? "").replace(/\s+/g, " ").trim() || undefined;

export default async function OngoingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = normPage(sp.page);

  let list: DrakorItem[] = [];
  try {
    const res = await getOngoing(page);
    list = res.items ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat ongoing"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/drakor"
        />
      </main>
    );
  }

  if (!list.length) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="info"
          title="Tidak ada lagi di halaman ini"
          message={`Halaman ${page} kosong. Kembali ke halaman sebelumnya.`}
          actionLabel="Kembali"
          actionHref={page > 1 ? `/drakor/ongoing?page=${page - 1}` : "/drakor"}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="film" size={22} className="text-[var(--accent)]" />
        Drakor Ongoing
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Halaman {page}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <DrakorCard key={a.id} id={a.id} title={a.title} cover={a.imageUrl} meta={clean(a.episode)} />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link
            href={`/drakor/ongoing?page=${page - 1}`}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/drakor/ongoing?page=${page + 1}`}
          className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
        >
          Berikutnya →
        </Link>
      </nav>
    </main>
  );
}
