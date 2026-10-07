import ReaderView from "@/components/ReaderView";
import ReaderBottomBar from "@/components/ReaderToolbar";
import ReaderKeys from "@/components/ReaderKeys";
import ReaderTopBar from "@/components/ReaderTopBar";
import BackToTop from "@/components/BackToTop";
import Breadcrumb from "@/components/Breadcrumb";
import { getChapter, getComicDetail, pickPages } from "@/lib/sanka";
import { requireOwner } from "@/lib/gate";

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapterId: string }>;
  searchParams: Promise<{ manga?: string; proxy?: string }>;
}) {
  await requireOwner();
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
  const proxyQuery = useProxy ? "" : "&proxy=0";
  const prevHref = chapter.navigation.previousChapter
    ? `/chapter/${chapter.navigation.previousChapter}?manga=${mangaSlug}${proxyQuery}`
    : null;
  const nextHref = chapter.navigation.nextChapter
    ? `/chapter/${chapter.navigation.nextChapter}?manga=${mangaSlug}${proxyQuery}`
    : null;
  const detail = await getComicDetail(mangaSlug).catch(() => null);
  const chapters = detail?.chapters ?? [];

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <ReaderTopBar mangaTitle={chapter.manga_title} chapterTitle={chapter.chapter_title} />
      <div className="mx-auto max-w-3xl px-4 pt-16">
        <Breadcrumb
          trail={[
            { label: "Beranda", href: "/" },
            { label: chapter.manga_title, href: `/manga/${mangaSlug}` },
            { label: chapter.chapter_title },
          ]}
        />
        <h1 className="mt-2 text-center text-lg font-bold leading-snug">{chapter.manga_title}</h1>
        <p className="text-center text-sm text-amber-300">{chapter.chapter_title}</p>
      </div>
      <ReaderKeys prevHref={prevHref} nextHref={nextHref} />
      <div className="pb-28">
        <ReaderView pages={pages} />
      </div>
      <ReaderBottomBar
        mangaSlug={mangaSlug}
        useProxy={useProxy}
        prevSlug={chapter.navigation.previousChapter}
        nextSlug={chapter.navigation.nextChapter}
        chapters={chapters}
        currentSlug={chapterId}
      />
      <BackToTop />
    </main>
  );
}
