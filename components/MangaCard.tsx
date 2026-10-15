import Link from "next/link";

export default function MangaCard({
  id,
  title,
  cover,
  status,
  type,
}: {
  id: string;
  title: string;
  cover: string;
  status?: string;
  type?: string;
}) {
  const hasMeta = Boolean(status || type);

  return (
    <Link
      href={`/manga/${id}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)] focus-visible:border-[var(--accent)]"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[3/4] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center bg-[var(--surface-raised)] text-xs text-[var(--text-muted)]">
          Tanpa cover
        </div>
      )}
      <div className="border-t border-[var(--border)] p-3">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {title}
        </p>
        {hasMeta ? (
          <div className="mt-2 flex items-center justify-between gap-2 text-xs">
            {status ? (
              <span className="truncate text-[var(--text-muted)]">{status}</span>
            ) : (
              <span />
            )}
            {type ? (
              <span className="shrink-0 rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[0.7rem] text-[var(--text-muted)]">
                {type}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
