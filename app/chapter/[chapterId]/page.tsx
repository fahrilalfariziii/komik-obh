import Link from "next/link";
import ReaderView from "@/components/ReaderView";
import ReaderBottomBar from "@/components/ReaderToolbar";
import ReaderKeys from "@/components/ReaderKeys";
import ReaderTopBar from "@/components/ReaderTopBar";
import BackToTop from "@/components/BackToTop";
import Breadcrumb from "@/components/Breadcrumb";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
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
  const useProxy = (sp.proxy ?? "1") !== "0";

  let chapter;
  try {
    chapter = await getChapter(chapterId);
  } catch (e) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-10 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gambar tidak tersedia"
          message={e instanceof Error ? e.message : "Coba buka chapter ini lagi."}
          actionLabel="Kembali ke beranda"
          actionHref="/"
        />
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
    <main className="min-h-screen pb-32">
      <ReaderTopBar
        mangaTitle={chapter.manga_title}
        chapterTitle={chapter.chapter_title}
        mangaSlug={mangaSlug}
      />

      <div className="mx-auto max-w-3xl px-4 pt-16">
        <Breadcrumb
          trail={[
            { label: "Beranda", href: "/" },
            { label: chapter.manga_title, href: `/manga/${mangaSlug}` },
            { label: chapter.chapter_title },
          ]}
        />
        <h1 className="mt-3 text-xl font-bold leading-snug text-[var(--text)]">
          {chapter.manga_title}
        </h1>
        <p className="mt-0.5 text-sm text-[var(--accent)]">{chapter.chapter_title}</p>

        <div className="mt-5">
          <ReaderView pages={pages} />
        </div>
      </div>

      <ReaderKeys prevHref={prevHref} nextHref={nextHref} />
      <BackToTop />

      <div className="mx-auto mt-8 max-w-3xl px-4">
        <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-3 sm:flex-row sm:items-center sm:justify-between">
          {prevHref ? (
            <Link
              href={prevHref}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Icon name="caretLeftFilled" size={16} />
              Chapter sebelumnya
            </Link>
          ) : (
            <span className="hidden text-sm text-[var(--text-muted)] sm:block">
              Ini chapter paling awal.
            </span>
          )}
          {nextHref ? (
            <Link
              href={nextHref}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Chapter berikutnya
              <Icon name="caretRightFilled" size={16} />
            </Link>
          ) : (
            <span className="text-xs text-[var(--text-muted)] sm:text-sm">
              Ini chapter terbaru.
            </span>
          )}
        </div>
      </div>

      <ReaderBottomBar
        mangaSlug={mangaSlug}
        useProxy={useProxy}
        prevSlug={chapter.navigation.previousChapter}
        nextSlug={chapter.navigation.nextChapter}
        chapters={chapters}
        currentSlug={chapterId}
      />
    </main>
  );
}
