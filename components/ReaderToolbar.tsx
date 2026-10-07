"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReaderToolbar({
  mangaId,
  lang,
  saver,
  prevId,
  nextId,
  title,
}: {
  mangaId: string;
  lang: string;
  saver: boolean;
  prevId: string | null;
  nextId: string | null;
  title: string;
}) {
  const [open, setOpen] = useState(true);
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
            href={`/manga/${mangaId}?lang=${lang}`}
            className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
          >
            Daftar
          </Link>
          {prevId ? (
            <Link
              href={`/chapter/${prevId}?manga=${mangaId}&lang=${lang}${saver ? "&saver=1" : ""}`}
              className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
            >
              Prev
            </Link>
          ) : null}
          {nextId ? (
            <Link
              href={`/chapter/${nextId}?manga=${mangaId}&lang=${lang}${saver ? "&saver=1" : ""}`}
              className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-black"
            >
              Next
            </Link>
          ) : null}
          <Link
            href={`?manga=${mangaId}&lang=${lang === "en" ? "id" : "en"}${saver ? "&saver=1" : ""}`}
            className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
          >
            {lang === "en" ? "Ke ID" : "Ke EN"}
          </Link>
          <Link
            href={`?manga=${mangaId}&lang=${lang}${saver ? "" : "&saver=1"}`}
            className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
            aria-pressed={saver}
          >
            {saver ? "Kualitas penuh" : "Hemat data"}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
