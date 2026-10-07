import MangaCard from "@/components/MangaCard";
import { searchComics } from "@/lib/sanka";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  if (!q.trim()) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-sm text-zinc-400">
        Masukkan kata kunci pencarian.
      </main>
    );
  }

  let items: Array<{ title: string; slug: string; thumbnail: string; type?: string }> = [];
  let loadError = "";
  try {
    const json = await searchComics(q);
    items = json.data ?? [];
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Gagal memuat.";
  }
  if (loadError) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <p className="text-zinc-100">Gagal memuat.</p>
        <p className="mt-2 text-zinc-400">{loadError}</p>
      </main>
    );
  }
  if (!items.length) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-sm text-zinc-400">
        Tidak ada hasil untuk {q}.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-lg font-semibold">Hasil untuk {q}</h1>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {items.map((m) => (
          <MangaCard
            key={m.slug}
            id={m.slug}
            title={m.title}
            cover={m.thumbnail}
            status={m.type}
          />
        ))}
      </div>
    </main>
  );
}
