"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { toRoman } from "@/lib/roman";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const catalogNumber = useMemo(() => {
    const map = new Map<string, number>();
    chapters.forEach((c, i) => map.set(c.slug, i + 1));
    return map;
  }, [chapters]);

  // Modal: tutup dengan Escape, kunci gulir latar, kembalikan fokus ke pemicu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const q = query.trim().toLowerCase();
  const list = q ? chapters.filter((c) => c.chapter.toLowerCase().includes(q)) : chapters;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka daftar isi"
        title="Daftar isi"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-control)] text-[var(--text)] transition-colors hover:bg-[var(--surface-raised)]"
      >
        <Icon name="layers" size={20} />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center"
          onClick={close}
          role="presentation"
        >
          <div
            className="flex max-h-[85vh] w-full max-w-md flex-col rounded-t-2xl border border-[var(--border-strong)] bg-[var(--app-bg)] p-4 sm:rounded-[var(--radius-card)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Daftar isi chapter"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[var(--text)]">
                Daftar Isi
                <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">
                  {chapters.length} chapter
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Tutup daftar isi"
                className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-[var(--radius-control)] border border-[var(--border-strong)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="mb-2 flex h-10 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
              <Icon name="search" size={15} className="text-[var(--text-muted)]" />
              <label htmlFor="drawer-search" className="sr-only">
                Cari chapter
              </label>
              <input
                id="drawer-search"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari chapter"
                autoComplete="off"
                className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>
            <ol className="divide-y divide-[var(--border)] overflow-y-auto rounded-[var(--radius-control)] border border-[var(--border)]">
              {list.map((c) => {
                const current = c.slug === currentSlug;
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/chapter/${c.slug}?manga=${mangaSlug}`}
                      onClick={close}
                      aria-current={current ? "page" : undefined}
                      className={`flex min-h-[48px] items-center gap-3 px-3 transition-colors hover:bg-[var(--surface-raised)] ${
                        current ? "bg-[var(--surface-raised)] text-[var(--accent)]" : "text-[var(--text)]"
                      }`}
                    >
                      <span className="w-9 shrink-0 text-center text-xs font-semibold tabular-nums">
                        {current ? (
                          <Icon name="check" size={14} className="mx-auto" />
                        ) : (
                          <span className="text-[var(--accent)]">
                            {toRoman(catalogNumber.get(c.slug) ?? 0)}
                          </span>
                        )}
                      </span>
                      {c.chapter}
                    </Link>
                  </li>
                );
              })}
            </ol>
            {!list.length ? (
              <p className="p-4 text-center text-sm text-[var(--text-muted)]">
                Tidak ada chapter yang cocok.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
