"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SankaChapterEntry } from "@/lib/sanka";

export default function ChapterList({
  chapters,
  mangaSlug,
}: {
  chapters: SankaChapterEntry[];
  mangaSlug: string;
}) {
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? chapters.filter((c) => c.chapter.toLowerCase().includes(q))
      : [...chapters];
    list.sort((a, b) => {
      const na = parseFloat(a.chapter.replace(/[^0-9.]/g, "")) || 0;
      const nb = parseFloat(b.chapter.replace(/[^0-9.]/g, "")) || 0;
      return asc ? na - nb : nb - na;
    });
    return list;
  }, [chapters, query, asc]);

  if (!chapters.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-sm">
        <p className="font-medium text-zinc-100">Belum ada chapter.</p>
        <p className="mt-1 text-zinc-400">Coba cari judul lain.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari chapter, misal 45"
          aria-label="Cari chapter"
          className="h-10 flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none focus:border-amber-400"
        />
        <button
          onClick={() => setAsc((v) => !v)}
          aria-pressed={asc}
          className="h-10 shrink-0 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200"
        >
          {asc ? "Terlama" : "Terbaru"}
        </button>
      </div>
      {filtered.length ? (
        <ol className="max-h-[480px] divide-y divide-zinc-800 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chapter/${c.slug}?manga=${mangaSlug}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-zinc-800"
              >
                <span className="text-sm text-zinc-100">{c.chapter}</span>
                {c.date ? (
                  <span className="shrink-0 text-xs text-zinc-400">{c.date}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
          Tidak ada chapter yang cocok.
        </p>
      )}
    </div>
  );
}
