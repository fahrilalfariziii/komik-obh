"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

export default function ReaderTopBar({
  mangaTitle,
  chapterTitle,
  mangaSlug,
}: {
  mangaTitle: string;
  chapterTitle: string;
  mangaSlug: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0);
      setHidden(y > 140 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-black/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-1.5">
          <Link
            href={`/manga/${mangaSlug}`}
            aria-label="Kembali ke daftar chapter"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[var(--radius-control)] text-[var(--text)] transition-colors hover:bg-white/10"
          >
            <Icon name="chevronLeft" size={20} />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-semibold text-[var(--text)]">{mangaTitle}</p>
            <p className="truncate text-xs text-[var(--accent)]">{chapterTitle}</p>
          </div>
          <span
            className="flex min-w-[44px] shrink-0 items-center justify-end text-xs font-medium text-[var(--text-muted)] tabular-nums"
            aria-hidden="true"
          >
            {progress}%
          </span>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white/10" aria-hidden="true">
        <div className="h-full bg-[var(--accent)] transition-[width]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
