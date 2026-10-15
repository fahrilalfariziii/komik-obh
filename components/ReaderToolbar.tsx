"use client";

import { useState } from "react";
import Link from "next/link";
import ChapterDrawer from "@/components/ChapterDrawer";
import Icon from "@/components/Icon";
import type { SankaChapterEntry } from "@/lib/sanka";

type BarProps = {
  mangaSlug: string;
  useProxy: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  chapters: SankaChapterEntry[];
  currentSlug: string;
};

const ICON_BTN =
  "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-control)] text-[var(--text)] transition-colors hover:bg-[var(--surface-raised)]";

export default function ReaderBottomBar(props: BarProps) {
  const { mangaSlug, useProxy, prevSlug, nextSlug, chapters, currentSlug } = props;
  const [visible, setVisible] = useState(true);
  const proxyQuery = useProxy ? "" : "&proxy=0";

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        aria-label="Tampilkan kontrol baca"
        className="fixed bottom-6 left-1/2 z-40 flex min-h-[44px] min-w-[44px] -translate-x-1/2 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--app-bg)]/95 text-[var(--text)] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur"
      >
        <Icon name="caretRightFilled" size={18} className="rotate-90" />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Sembunyikan kontrol baca"
          className="flex min-h-[32px] min-w-[64px] items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--app-bg)]/95 text-[var(--text-muted)] backdrop-blur"
        >
          <Icon name="eyeOff" size={16} />
        </button>
        <div
          className="flex w-full items-center justify-between gap-1 rounded-[var(--radius-card)] border border-[var(--border-strong)] bg-[var(--app-bg)]/95 px-2 py-1.5 backdrop-blur"
          role="toolbar"
          aria-label="Navigasi baca"
        >
          {prevSlug ? (
            <Link
              href={`/chapter/${prevSlug}?manga=${mangaSlug}${proxyQuery}`}
              aria-label="Chapter sebelumnya"
              title="Sebelumnya"
              className="flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-control)] px-2.5 text-sm text-[var(--text)] transition-colors hover:bg-[var(--surface-raised)] sm:px-3"
            >
              <Icon name="caretLeftFilled" size={16} />
              <span className="hidden sm:inline">Sebelumnya</span>
            </Link>
          ) : (
            <Link
              href={`/manga/${mangaSlug}`}
              aria-label="Kembali ke daftar chapter"
              title="Daftar chapter"
              className={ICON_BTN}
            >
              <Icon name="layers" size={19} />
            </Link>
          )}

          <div className="flex items-center gap-0.5">
            <ChapterDrawer chapters={chapters} mangaSlug={mangaSlug} currentSlug={currentSlug} />
            <Link
              href={`?manga=${mangaSlug}${useProxy ? "&proxy=0" : ""}`}
              aria-label={useProxy ? "Ganti ke gambar langsung" : "Ganti ke gambar via proxy"}
              title={useProxy ? "Sumber: proxy" : "Sumber: langsung"}
              aria-pressed={useProxy}
              className={`${ICON_BTN} ${useProxy ? "text-[var(--accent)]" : ""}`}
            >
              <Icon name={useProxy ? "shieldOn" : "refresh"} size={19} />
            </Link>
          </div>

          {nextSlug ? (
            <Link
              href={`/chapter/${nextSlug}?manga=${mangaSlug}${proxyQuery}`}
              aria-label="Chapter berikutnya"
              title="Berikutnya"
              className="flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-control)] bg-[var(--accent)] px-2.5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)] sm:px-3"
            >
              <span className="hidden sm:inline">Berikutnya</span>
              <Icon name="caretRightFilled" size={16} />
            </Link>
          ) : (
            <Link
              href={`/manga/${mangaSlug}`}
              aria-label="Kembali ke daftar chapter"
              title="Daftar chapter"
              className={ICON_BTN}
            >
              <Icon name="layers" size={19} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
