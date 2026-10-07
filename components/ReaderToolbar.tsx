"use client";

import { useState } from "react";
import Link from "next/link";
import ChapterDrawer from "@/components/ChapterDrawer";
import type { SankaChapterEntry } from "@/lib/sanka";

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      <path d={d} />
    </svg>
  );
}

const PATHS = {
  prev: "M15 18l-6-6 6-6",
  next: "M9 18l6-6-6-6",
  list: "M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01",
  book: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  hide: "M6 9l6 6 6-6",
  show: "M18 15l-6-6-6 6",
};

type BarProps = {
  mangaSlug: string;
  useProxy: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  chapters: SankaChapterEntry[];
  currentSlug: string;
};

const ICON_BTN =
  "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-zinc-200 hover:bg-zinc-800";

export default function ReaderBottomBar(props: BarProps) {
  const { mangaSlug, useProxy, prevSlug, nextSlug, chapters, currentSlug } = props;
  const [visible, setVisible] = useState(true);
  const proxyQuery = useProxy ? "" : "&proxy=0";

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        aria-label="Tampilkan toolbar baca"
        title="Tampilkan toolbar"
        className="fixed bottom-6 left-1/2 z-40 flex min-h-[44px] min-w-[44px] -translate-x-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/95 text-zinc-100 shadow-xl backdrop-blur"
      >
        <Icon d={PATHS.show} label="Tampilkan toolbar" />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-1.5">
        <button
          onClick={() => setVisible(false)}
          aria-label="Sembunyikan toolbar baca"
          title="Sembunyikan toolbar"
          className="flex min-h-[32px] min-w-[64px] items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/95 text-zinc-400 shadow-lg backdrop-blur"
        >
          <Icon d={PATHS.hide} label="Sembunyikan toolbar" />
        </button>
        <div
          className="flex w-full items-center justify-between gap-1 rounded-2xl border border-zinc-700 bg-zinc-950/95 px-2 py-2 shadow-2xl backdrop-blur"
          role="toolbar"
          aria-label="Navigasi baca"
        >
          {prevSlug ? (
            <Link
              href={`/chapter/${prevSlug}?manga=${mangaSlug}${proxyQuery}`}
              aria-label="Chapter sebelumnya"
              title="Sebelumnya"
              className="flex min-h-[44px] items-center gap-1 rounded-xl px-3 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              <Icon d={PATHS.prev} label="Sebelumnya" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          ) : (
            <Link
              href={`/manga/${mangaSlug}`}
              aria-label="Kembali ke daftar chapter"
              title="Daftar chapter"
              className={ICON_BTN}
            >
              <Icon d={PATHS.list} label="Daftar chapter" />
            </Link>
          )}
          <div className="flex items-center gap-1">
            <ChapterDrawer chapters={chapters} mangaSlug={mangaSlug} currentSlug={currentSlug} />
            <Link
              href={`?manga=${mangaSlug}${useProxy ? "&proxy=0" : ""}`}
              aria-label={useProxy ? "Pakai gambar langsung" : "Pakai gambar via proxy"}
              title={useProxy ? "Gambar langsung" : "Gambar via proxy"}
              aria-pressed={useProxy}
              className={ICON_BTN}
            >
              <Icon d={PATHS.zap} label="Sumber gambar" />
            </Link>
          </div>
          {nextSlug ? (
            <Link
              href={`/chapter/${nextSlug}?manga=${mangaSlug}${proxyQuery}`}
              aria-label="Chapter berikutnya"
              title="Berikutnya"
              className="flex min-h-[44px] items-center gap-1 rounded-xl bg-amber-400 px-3 text-sm font-semibold text-black"
            >
              <span className="hidden sm:inline">Next</span>
              <Icon d={PATHS.next} label="Berikutnya" />
            </Link>
          ) : (
            <Link
              href={`/manga/${mangaSlug}`}
              aria-label="Kembali ke daftar chapter"
              title="Daftar chapter"
              className={ICON_BTN}
            >
              <Icon d={PATHS.list} label="Daftar chapter" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
