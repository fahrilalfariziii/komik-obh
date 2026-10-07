import ReaderView from "@/components/ReaderView";
import ReaderToolbar from "@/components/ReaderToolbar";
import { getChapter, pickPages } from "@/lib/sanka";

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapterId: string }>;
  searchParams: Promise<{ manga?: string; proxy?: string }>;
}) {
  const { chapterId } = await params;
  const sp = await searchParams;
  const proxyParam = sp.proxy ?? "1";
  const useProxy = proxyParam !== "0";

  let chapter;
  try {
    chapter = await getChapter(chapterId);
  } catch (e) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-sm">
        <p className="text-zinc-100">Gambar tidak tersedia.</p>
        <p className="mt-2 text-zinc-400">
          {e instanceof Error ? e.message : "Coba lagi."}
        </p>
      </main>
    );
  }

  const mangaSlug = sp.manga ?? chapter.navigation.chapterList;
  const pages = pickPages(chapter.images, chapter.imagesproxy, useProxy);

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <ReaderToolbar
        mangaSlug={mangaSlug}
        useProxy={useProxy}
        prevSlug={chapter.navigation.previousChapter}
        nextSlug={chapter.navigation.nextChapter}
        title={`${chapter.manga_title} - ${chapter.chapter_title}`}
      />
      <ReaderView pages={pages} />
    </main>
  );
}
