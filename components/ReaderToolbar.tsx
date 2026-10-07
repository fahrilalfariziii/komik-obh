"use client";

import { useState } from "react";
import Link from "next/link";
import ChapterDrawer from "@/components/ChapterDrawer";
import type { SankaChapterEntry } from "@/lib/sanka";

type NavProps = {
  mangaSlug: string;
  useProxy: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  title: string;
  chapters: SankaChapterEntry[];
  currentSlug: string;
};

function NavButtons({ mangaSlug, useProxy, prevSlug, nextSlug, chapters, currentSlug }: Omit<NavProps, "title">) {
  const proxyQuery = useProxy ? "" : "&proxy=0";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/manga/${mangaSlug}`}
        className="flex min-h-[44px] items-center rounded-md border border-zinc-700 px-4 text-sm text-zinc-200"
      >
        Daftar
      </Link>
      {prevSlug ? (
        <Link
          href={`/chapter/${prevSlug}?manga=${mangaSlug}${proxyQuery}`}
          className="flex min-h-[44px] items-center rounded-md border border-zinc-700 px-4 text-sm text-zinc-200"
        >
          Prev
        </Link>
      ) : null}
      {nextSlug ? (
        <Link
          href={`/chapter/${nextSlug}?manga=${mangaSlug}${proxyQuery}`}
          className="flex min-h-[44px] items-center rounded-md bg-amber-400 px-4 text-sm font-medium text-black"
        >
          Next
        </Link>
      ) : null}
      <ChapterDrawer chapters={chapters} mangaSlug={mangaSlug} currentSlug={currentSlug} />
      <Link
        href={`?manga=${mangaSlug}${useProxy ? "&proxy=0" : ""}`}
        className="flex min-h-[44px] items-center rounded-md border border-zinc-700 px-4 text-sm text-zinc-200"
        aria-pressed={useProxy}
      >
        {useProxy ? "Gambar langsung" : "Gambar via proxy"}
      </Link>
    </div>
  );
}

export default function ReaderToolbar(props: NavProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-2 text-center text-xs text-zinc-400"
        aria-expanded={open}
      >
        {open ? "Sembunyikan toolbar" : props.title}
      </button>
      {open ? (
        <div className="px-4 pb-3">
          <NavButtons {...props} />
        </div>
      ) : null}
    </div>
  );
}

export function ReaderBottomBar(props: Omit<NavProps, "title">) {
  return (
    <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4">
      <NavButtons {...props} />
    </div>
  );
}
