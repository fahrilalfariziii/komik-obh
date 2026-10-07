"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SankaChapterEntry } from "@/lib/sanka";

export default function ChapterDrawer({
  chapters,
  mangaSlug,
  currentSlug,
}: {
  chapters: SankaChapterEntry[];
  mangaSlug: string;
  currentSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  const q = query.trim().toLowerCase();
  const list = q
    ? chapters.filter((c) => c.chapter.toLowerCase().includes(q))
    : chapters;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka daftar isi"
        title="Daftar isi"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-zinc-200 hover:bg-zinc-800"
      >
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
          aria-label="Daftar isi"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="flex max-h-[80vh] w-full max-w-md flex-col rounded-t-xl border border-zinc-700 bg-zinc-950 p-4 sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Daftar isi chapter"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Daftar Isi</p>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200"
                aria-label="Tutup daftar isi"
              >
                Tutup
              </button>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari chapter..."
              aria-label="Cari chapter"
              className="mb-2 h-10 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none focus:border-amber-400"
            />
            <ol className="divide-y divide-zinc-800 overflow-y-auto rounded-lg border border-zinc-800">
              {list.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/chapter/${c.slug}?manga=${mangaSlug}`}
                    onClick={() => setOpen(false)}
                    aria-current={c.slug === currentSlug ? "page" : undefined}
                    className={`block px-4 py-2.5 text-sm hover:bg-zinc-800 ${
                      c.slug === currentSlug ? "bg-zinc-800 text-amber-300" : "text-zinc-100"
                    }`}
                  >
                    {c.chapter}
                  </Link>
                </li>
              ))}
            </ol>
            {!list.length ? (
              <p className="p-4 text-sm text-zinc-400">Tidak ada yang cocok.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
