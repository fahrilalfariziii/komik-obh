import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DrakorCard from "@/components/DrakorCard";
import StatePanel from "@/components/StatePanel";
import { getKategoriDetail, type DrakorItem } from "@/lib/drakor";

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function KategoriDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = normPage(sp.page);

  let title = slug;
  let list: DrakorItem[] = [];
  try {
    const res = await getKategoriDetail(slug, page);
    title = res.kategori || slug;
    list = res.items ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat kategori"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/drakor/kategori"
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
          actionHref={page > 1 ? `/drakor/kategori/${slug}?page=${page - 1}` : "/drakor/kategori"}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Drakor", href: "/drakor" },
          { label: "Kategori", href: "/drakor/kategori" },
          { label: title },
        ]}
      />
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Kategori: <span className="text-[var(--accent)]">{title}</span>
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Halaman {page}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <DrakorCard key={a.id} id={a.id} title={a.title} cover={a.imageUrl} />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link
            href={`/drakor/kategori/${slug}?page=${page - 1}`}
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/drakor/kategori/${slug}?page=${page + 1}`}
          className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
        >
          Berikutnya →
        </Link>
      </nav>
    </main>
  );
}
