import Icon from "@/components/Icon";

export default function DrakorSearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/drakor/cari" method="get" role="search" className="flex gap-2">
      <div className="flex h-12 flex-1 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
        <Icon name="search" size={18} className="text-[var(--text-muted)]" />
        <label htmlFor="drakor-search" className="sr-only">
          Cari drakor
        </label>
        <input
          id="drakor-search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Cari drakor, misal Queen of Tears"
          autoComplete="off"
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
