import Link from "next/link";

export default function DrakorCard({
  id,
  title,
  cover,
  meta,
  badge,
  href,
}: {
  id: string;
  title: string;
  cover: string;
  meta?: string;
  badge?: string;
  href?: string;
}) {
  return (
    <Link
      href={href ?? `/drakor/${id}`}
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
        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          {meta ? <span className="truncate text-[var(--text-muted)]">{meta}</span> : <span />}
          {badge ? (
            <span className="shrink-0 rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[0.7rem] text-[var(--text-muted)]">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
