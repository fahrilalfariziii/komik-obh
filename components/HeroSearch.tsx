"use client";

import Icon from "@/components/Icon";

// Formulir pencarian GET ke /search. Tampil di hero beranda dan halaman cari.
export default function HeroSearch({
  defaultValue = "",
  type = "",
  autoFocus = false,
  placeholder = "Cari judul, misal Solo Leveling",
}: {
  defaultValue?: string;
  type?: string;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  return (
    <form action="/search" method="get" role="search" className="flex gap-2">
      {type ? <input type="hidden" name="type" value={type} /> : null}
      <div className="flex h-12 flex-1 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
        <Icon name="search" size={18} className="text-[var(--text-muted)]" />
        <label htmlFor="hero-search" className="sr-only">
          Cari komik
        </label>
        <input
          id="hero-search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="off"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
        />
      </div>
      <button
        type="submit"
        className="h-12 shrink-0 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
      >
        Cari
      </button>
    </form>
  );
}
