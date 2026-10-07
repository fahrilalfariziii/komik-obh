import ChapterList from "@/components/ChapterList";
import LangToggle from "@/components/LangToggle";
import { mangaTitle, coverUrl } from "@/lib/manga-ui";

export default async function MangaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang = "id" } = await searchParams;
  const activeLang = lang === "en" ? "en" : "id";

  const [mangaRes, feedRes] = await Promise.all([
    fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author`, {
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=${activeLang}&translatedLanguage[]=${activeLang === "id" ? "en" : "id"}&order[chapter]=asc&limit=500`,
      { next: { revalidate: 600 } }
    ),
  ]);

  if (!mangaRes.ok) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 text-sm">
        <p className="text-zinc-100">Gagal memuat detail. Coba lagi 30 detik.</p>
      </main>
    );
  }

  const manga = await mangaRes.json();
  const feed = feedRes.ok ? await feedRes.json() : { data: [] };
  const title = mangaTitle(manga.data.attributes.title);
  const cover = coverUrl(id, manga.data.relationships);
  const desc: string = manga.data.attributes.description?.id ?? manga.data.attributes.description?.en ?? "";

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex gap-4">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={title} className="w-28 rounded-md border border-zinc-800 object-cover" />
        ) : null}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="mt-1 text-xs uppercase text-zinc-400">{manga.data.attributes.status}</p>
          <div className="mt-3">
            <LangToggle lang={activeLang} base={`/manga/${id}`} />
          </div>
        </div>
      </div>
      {desc ? <p className="mt-4 line-clamp-6 text-sm text-zinc-300">{desc}</p> : null}
      <h2 className="mt-6 mb-2 text-sm font-medium text-zinc-200">Daftar chapter ({activeLang.toUpperCase()})</h2>
      <ChapterList chapters={feed.data ?? []} mangaId={id} lang={activeLang} />
    </main>
  );
}
