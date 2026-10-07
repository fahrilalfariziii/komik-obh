import ReaderView from "@/components/ReaderView";
import ReaderToolbar from "@/components/ReaderToolbar";
import { buildPageUrls } from "@/lib/mangadex";
import { nextChapterSameLang, prevChapterSameLang } from "@/lib/reader";

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapterId: string }>;
  searchParams: Promise<{ manga?: string; lang?: string; saver?: string }>;
}) {
  const { chapterId } = await params;
  const sp = await searchParams;
  const mangaId = sp.manga ?? "";
  const lang = sp.lang === "en" ? "en" : "id";
  const saver = sp.saver === "1";

  const homeRes = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`, {
    next: { revalidate: 1800 },
  });
  if (!homeRes.ok) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-sm">
        <p className="text-zinc-100">Gambar tidak tersedia. Server at-home gagal.</p>
      </main>
    );
  }
  const home = await homeRes.json();
  const pages: string[] = buildPageUrls(home.baseUrl, home.chapter.hash, home.chapter.data, home.chapter.dataSaver, saver);

  let prevId: string | null = null;
  let nextId: string | null = null;
  let title = `Chapter ${chapterId.slice(0, 6)}`;
  if (mangaId) {
    const feedRes = await fetch(
      `https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=${lang}&order[chapter]=asc&limit=500`,
      { next: { revalidate: 600 } }
    );
    if (feedRes.ok) {
      const feed = await feedRes.json();
      const list = (feed.data ?? []).map((c: { id: string }) => ({ id: c.id }));
      prevId = prevChapterSameLang(list, chapterId);
      nextId = nextChapterSameLang(list, chapterId);
      const cur = (feed.data ?? []).find((c: { id: string }) => c.id === chapterId);
      if (cur?.attributes?.chapter) title = `Ch. ${cur.attributes.chapter}`;
    }
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <ReaderToolbar
        mangaId={mangaId}
        lang={lang}
        saver={saver}
        prevId={prevId}
        nextId={nextId}
        title={title}
      />
      <ReaderView pages={pages} />
    </main>
  );
}
