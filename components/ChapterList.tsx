"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { getComicReadState } from "@/lib/history";
import { inRanges, parseNum, type Range } from "@/lib/history-state";
import type { SankaChapterEntry } from "@/lib/sanka";

const num = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

type ReadState = {
  lastChapter: { slug: string; number: number } | null;
  readSet: Range[];
};

export default function ChapterList({
  chapters,
  mangaSlug,
}: {
  chapters: SankaChapterEntry[];
  mangaSlug: string;
}) {
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(false);
  const [read, setRead] = useState<ReadState>({ lastChapter: null, readSet: [] });

  // Read-state dari server (action); gagal = tampil normal tanpa penanda.
  useEffect(() => {
    let alive = true;
    getComicReadState(mangaSlug)
      .then((s) => {
        if (alive) setRead(s);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [mangaSlug]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? chapters.filter((c) => c.chapter.toLowerCase().includes(q)) : [...chapters];
    return list.sort((a, b) => (asc ? num(a.chapter) - num(b.chapter) : num(b.chapter) - num(a.chapter)));
  }, [chapters, query, asc]);

  const isRead = (c: SankaChapterEntry) => {
    const n = parseNum(c.chapter);
    return n !== null && inRanges(read.readSet, n);
  };

  if (!chapters.length) {
    return (
      <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/50 p-6 text-sm">
        <p className="font-medium text-[var(--text)]">Belum ada chapter.</p>
        <p className="mt-1 text-[var(--text-muted)]">Coba cari judul lain lewat halaman pencarian.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
          <Icon name="search" size={16} className="text-[var(--text-muted)]" />
          <label htmlFor="chapter-search" className="sr-only">
            Cari chapter
          </label>
          <input
            id="chapter-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari chapter, misal 45"
            autoComplete="off"
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <button
          type="button"
          onClick={() => setAsc((v) => !v)}
          aria-pressed={asc}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
        >
          <Icon name={asc ? "trending" : "clock"} size={15} />
          {asc ? "Terlama" : "Terbaru"}
        </button>
      </div>

      {read.lastChapter ? (
        <div className="mb-3">
          <Link
            href={`/chapter/${read.lastChapter.slug}?manga=${mangaSlug}`}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            <Icon name="book" size={15} />
            Lanjut: Ch. {read.lastChapter.number}
          </Link>
        </div>
      ) : null}

      {filtered.length ? (
        <ol className="max-h-[520px] divide-y divide-[var(--border)] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chapter/${c.slug}?manga=${mangaSlug}`}
                className="flex min-h-[48px] items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[var(--surface-raised)]"
              >
                <span
                  className={`min-w-0 flex-1 text-sm ${
                    isRead(c) ? "text-[var(--text-muted)]" : "text-[var(--text)]"
                  }`}
                >
                  {c.chapter}
                </span>
                {c.date ? (
                  <span className="shrink-0 text-xs text-[var(--text-muted)]">{c.date}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-4 text-sm text-[var(--text-muted)]">
          Tidak ada chapter yang cocok dengan pencarian itu.
        </p>
      )}
    </div>
  );
}
