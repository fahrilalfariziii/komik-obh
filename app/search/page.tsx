import MangaCard from "@/components/MangaCard";
import { mangaTitle, coverUrl } from "@/lib/manga-ui";

async function search(q: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/mangadex/search?q=${encodeURIComponent(q)}`,
    { cache: "no-store" }
  ).catch(() => null);
  if (res && res.ok) return res.json();
  const direct = await fetch(
    `https://api.mangadex.org/manga?title=${encodeURIComponent(q)}&availableTranslatedLanguage[]=id&availableTranslatedLanguage[]=en&includes[]=cover_art&limit=24&contentRating[]=safe&contentRating[]=suggestive`
  );
  return direct.json();
}

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

  let json: { data?: Array<{ id: string; attributes: { title: Record<string, string>; status?: string }; relationships: Array<{ type: string; attributes?: { fileName?: string } }> }> } = { data: [] };
  try {
    json = await search(q);
  } catch {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <p className="text-zinc-100">Gagal memuat. Coba lagi 30 detik.</p>
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
