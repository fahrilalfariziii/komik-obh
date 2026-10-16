import type { MovieFilterOption } from "@/lib/movie";

const selectClass =
  "h-11 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none focus-visible:border-[var(--accent)]";

export default function MovieFilterBar({
  action,
  genres = [],
  sorts = [],
  genre,
  sort,
}: {
  action: string;
  genres?: MovieFilterOption[];
  sorts?: { code: string; label: string }[];
  genre?: string;
  sort?: string;
}) {
  return (
    <form action={action} method="get" className="flex flex-wrap items-end gap-3">
      {genres.length ? (
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Genre
          <select name="genre" defaultValue={genre ?? ""} className={selectClass}>
            <option value="">Semua genre</option>
            {genres.map((g) => (
              <option key={g.code} value={g.code}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {sorts.length ? (
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Urutkan
          <select name="sort" defaultValue={sort ?? sorts[0]?.code} className={selectClass}>
            {sorts.map((s) => (
              <option key={s.code} value={s.code}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <button
        type="submit"
        className="h-11 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
      >
        Terapkan
      </button>
    </form>
  );
}
