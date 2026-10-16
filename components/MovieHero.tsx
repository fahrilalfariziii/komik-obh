import Link from "next/link";
import { tmdbUrl, kindLabel, yearOf, type MovieItem } from "@/lib/movie";

// Slider CSS-only (scroll-snap, tanpa JS) supaya tetap jalan walau JS gagal.
export default function MovieHero({ items }: { items: MovieItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-label="Sorotan" className="-mx-4 sm:mx-0">
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-0">
        {items.map((m) => {
          const kind = m.contentType === "tv_series" ? "series" : "film";
          const backdrop = tmdbUrl(m.backdropPath, "w1280");
          return (
            <li key={m.id} className="w-[88%] shrink-0 snap-start sm:w-[62%] md:w-[47%]">
              <Link
                href={`/movie/${kind}/${m.slug}`}
                className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]"
              >
                <div className="aspect-video w-full bg-[var(--surface-raised)]">
                  {backdrop ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={backdrop}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                  <p className="text-xs text-white/70">
                    {kindLabel(m.contentType)}
                    {yearOf(m.releaseDate) ? ` • ${yearOf(m.releaseDate)}` : ""}
                  </p>
                  <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-white">{m.title}</h3>
                  {m.overview ? (
                    <p className="mt-1 line-clamp-2 text-xs text-white/80">{m.overview}</p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
