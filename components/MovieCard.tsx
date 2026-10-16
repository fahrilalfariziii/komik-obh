import Link from "next/link";
import { kindLabel, tmdbUrl, yearOf, type MovieItem } from "@/lib/movie";

export default function MovieCard({ item, href }: { item: MovieItem; href?: string }) {
  const poster = tmdbUrl(item.posterPath, "w342");
  const year = yearOf(item.releaseDate);
  const rating = item.voteAverage ? item.voteAverage.toFixed(1) : "";

  return (
    <Link
      href={href ?? `/movie/${item.contentType === "tv_series" ? "series" : "film"}/${item.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)] focus-visible:border-[var(--accent)]"
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[2/3] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[2/3] items-center justify-center bg-[var(--surface-raised)] text-xs text-[var(--text-muted)]">
          Tanpa poster
        </div>
      )}
      <div className="border-t border-[var(--border)] p-3">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {item.title}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          <span className="truncate text-[var(--text-muted)]">
            {[year, rating ? `★ ${rating}` : ""].filter(Boolean).join(" • ")}
          </span>
          <span className="shrink-0 rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[0.7rem] text-[var(--text-muted)]">
            {kindLabel(item.contentType)}
          </span>
        </div>
      </div>
    </Link>
  );
}
