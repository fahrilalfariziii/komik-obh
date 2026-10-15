import AnimeCard from "@/components/AnimeCard";
import AnimeSearchForm from "@/components/AnimeSearchForm";
import StatePanel from "@/components/StatePanel";
import { partialNotice, searchAllAnime, type AnimeResult } from "@/lib/anime-sources";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Cari Anime",
  description: "Cari judul anime subtitle Indonesia.",
};

export default async function CariPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireOwner();
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();

  if (!q) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Cari Anime</h1>
        <div className="mt-5">
          <AnimeSearchForm />
        </div>
        <div className="mt-6">
          <StatePanel
            icon="search"
            title="Belum ada kata kunci"
            message="Tuliskan judul anime pada kolom di atas, lalu tekan Cari."
            actionLabel="Kembali ke anime"
            actionHref="/anime"
          />
        </div>
      </main>
    );
  }

  let list: AnimeResult[] = [];
  let partial = { otakudesu: false, anoboy: false };
  try {
    const res = await searchAllAnime(q);
    list = res.results;
    partial = res.partial;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="line-clamp-2 text-2xl font-bold tracking-tight">
          Hasil untuk <span className="text-[var(--accent)]">{q}</span>
        </h1>
        <div className="mt-5">
          <AnimeSearchForm defaultValue={q} />
        </div>
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Pencarian gagal"
            message={e instanceof Error ? e.message : "Coba lagi."}
            actionLabel="Kembali ke anime"
            actionHref="/anime"
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
      <p className="mt-1 text-sm text-[var(--text-muted)]">{list.length} hasil</p>
      {(() => {
        const notice = partialNotice(partial, list.length > 0);
        return notice ? (
          <p role="status" className="mt-2 text-xs text-[var(--text-muted)]">
            {notice}
          </p>
        ) : null;
      })()}
      <div className="mt-5">
        <AnimeSearchForm defaultValue={q} />
      </div>
      <div className="mt-6">
        {!list.length ? (
          <StatePanel
            icon="search"
            title={`Tidak ada hasil untuk "${q}" di Otakudesu maupun Anoboy`}
            message="Coba ejaan lain, judul Inggris, atau kata kunci lebih singkat."
            actionLabel="Kembali ke anime"
            actionHref="/anime"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {list.map((a) => (
              <AnimeCard
                key={`${a.source}-${a.id}`}
                id={a.id}
                title={a.title}
                cover={a.cover}
                meta={a.meta}
                badge={a.badge}
                href={a.detailHref}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
