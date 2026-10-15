"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import type { SankaChapterEntry } from "@/lib/sanka";

const num = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

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
    const list = q ? chapters.filter((c) => c.chapter.toLowerCase().includes(q)) : [...chapters];
    return list.sort((a, b) => (asc ? num(a.chapter) - num(b.chapter) : num(b.chapter) - num(a.chapter)));
  }, [chapters, query, asc]);

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

      {filtered.length ? (
        <ol className="max-h-[520px] divide-y divide-[var(--border)] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chapter/${c.slug}?manga=${mangaSlug}`}
                className="flex min-h-[48px] items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[var(--surface-raised)]"
              >
                <span className="min-w-0 flex-1 text-sm text-[var(--text)]">{c.chapter}</span>
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
