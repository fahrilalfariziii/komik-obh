import MangaCard from "@/components/MangaCard";
import { mangaTitle, coverUrl } from "@/lib/manga-ui";
import { searchManga } from "@/lib/mangadex";

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

  let json: { data?: Array<{ id: string; attributes: { title: Record<string, string>; status?: string }; relationships: Array<{ type: string; attributes?: { fileName?: string } }> }>; error?: string } = { data: [] };
  let loadError = "";
  try {
    json = await searchManga(q);
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

  const items = json.data ?? [];
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
            key={m.id}
            id={m.id}
            title={mangaTitle(m.attributes.title)}
            cover={coverUrl(m.id, m.relationships)}
            status={m.attributes.status}
          />
        ))}
      </div>
    </main>
  );
}
