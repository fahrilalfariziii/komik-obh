"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReaderToolbar({
  mangaSlug,
  useProxy,
  prevSlug,
  nextSlug,
  title,
}: {
  mangaSlug: string;
  useProxy: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  title: string;
}) {
  const [open, setOpen] = useState(true);
  const proxyQuery = useProxy ? "" : "&proxy=0";
  return (
    <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-2 text-center text-xs text-zinc-400"
        aria-expanded={open}
      >
        {open ? "Sembunyikan toolbar" : title}
      </button>
      {open ? (
        <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
          <Link
            href={`/manga/${mangaSlug}`}
            className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
          >
            Daftar
          </Link>
          {prevSlug ? (
            <Link
              href={`/chapter/${prevSlug}?manga=${mangaSlug}${proxyQuery}`}
              className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
            >
              Prev
            </Link>
          ) : null}
          {nextSlug ? (
            <Link
              href={`/chapter/${nextSlug}?manga=${mangaSlug}${proxyQuery}`}
              className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-black"
            >
              Next
            </Link>
          ) : null}
          <Link
            href={`?manga=${mangaSlug}${useProxy ? "&proxy=0" : ""}`}
            className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
            aria-pressed={useProxy}
          >
            {useProxy ? "Gambar langsung" : "Gambar via proxy"}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
