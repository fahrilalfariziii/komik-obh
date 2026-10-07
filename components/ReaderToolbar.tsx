"use client";

import { useState } from "react";
import Link from "next/link";
import ChapterDrawer from "@/components/ChapterDrawer";
import type { SankaChapterEntry } from "@/lib/sanka";

type PillProps = {
  mangaSlug: string;
  useProxy: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  chapters: SankaChapterEntry[];
  currentSlug: string;
};

export default function ReaderBottomPill(props: PillProps) {
  const { mangaSlug, useProxy, prevSlug, nextSlug, chapters, currentSlug } = props;
  const [visible, setVisible] = useState(true);
  const proxyQuery = useProxy ? "" : "&proxy=0";

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        aria-label="Tampilkan toolbar baca"
        className="fixed bottom-6 left-1/2 z-40 flex min-h-[44px] -translate-x-1/2 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/95 px-5 text-sm text-zinc-100 shadow-xl backdrop-blur"
      >
        <span aria-hidden="true">▲</span> Navigasi
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-fit flex-col items-center gap-1.5">
        <button
          onClick={() => setVisible(false)}
          aria-label="Sembunyikan toolbar baca"
          className="flex min-h-[32px] min-w-[64px] items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/95 text-xs text-zinc-400 shadow-lg backdrop-blur"
        >
          <span aria-hidden="true">▼</span>
        </button>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950/95 px-3 py-2.5 shadow-2xl backdrop-blur">
          {prevSlug ? (
            <Link
              href={`/chapter/${prevSlug}?manga=${mangaSlug}${proxyQuery}`}
              className="flex min-h-[44px] items-center rounded-xl px-4 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              Prev
            </Link>
          ) : (
            <Link
              href={`/manga/${mangaSlug}`}
              className="flex min-h-[44px] items-center rounded-xl px-4 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              Daftar
            </Link>
          )}
          <ChapterDrawer chapters={chapters} mangaSlug={mangaSlug} currentSlug={currentSlug} />
          <Link
            href={`?manga=${mangaSlug}${useProxy ? "&proxy=0" : ""}`}
            aria-pressed={useProxy}
            title={useProxy ? "Pakai gambar langsung" : "Pakai gambar via proxy"}
            className="flex min-h-[44px] items-center rounded-xl px-3 text-xs text-zinc-400 hover:bg-zinc-800"
          >
            {useProxy ? "Langsung" : "Proxy"}
          </Link>
          {nextSlug ? (
            <Link
              href={`/chapter/${nextSlug}?manga=${mangaSlug}${proxyQuery}`}
              className="flex min-h-[44px] items-center rounded-xl bg-amber-400 px-5 text-sm font-semibold text-black"
            >
              Next
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
