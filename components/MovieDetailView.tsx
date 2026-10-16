import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Icon from "@/components/Icon";
import { genreNames, kindLabel, tmdbUrl, yearOf, type MovieDetail, type MovieKind } from "@/lib/movie";

function runtimeLabel(min?: number | null) {
  if (!min || min <= 0) return "";
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}j ${m}m` : `${h}j`;
}

export default function MovieDetailView({ detail, kind }: { detail: MovieDetail; kind: MovieKind }) {
  const backdrop = tmdbUrl(detail.backdropPath, "w1280");
  const poster = tmdbUrl(detail.posterPath, "w500");
  const genres = genreNames(detail.genres);
  const cast = (detail.cast ?? []).slice(0, 10);
  const seasons = (detail.seasons ?? []).filter((s) => (s.episodes?.length ?? 0) > 0);

  const chips = [
    yearOf(detail.releaseDate),
    runtimeLabel(detail.runtimeMinutes),
    detail.voteAverage ? `★ ${detail.voteAverage.toFixed(1)}` : "",
    detail.quality ?? "",
    detail.country ?? "",
  ].filter(Boolean);

  const firstEpisode = seasons[0]?.episodes?.[0];
  const canWatch = detail.hasVideo !== false;
  const watchHref =
    kind === "movie"
      ? `/movie/watch?slug=${encodeURIComponent(detail.slug)}&id=${encodeURIComponent(detail.id)}&kind=movie`
      : firstEpisode
        ? `/movie/watch?slug=${encodeURIComponent(detail.slug)}&id=${encodeURIComponent(firstEpisode.id)}&kind=series&season=${seasons[0]?.seasonNumber ?? 1}&episode=${firstEpisode.episodeNumber}`
        : "";

  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Movie", href: "/movie" },
          { label: kind === "series" ? "Series" : "Film", href: kind === "series" ? "/movie/series" : "/movie/film" },
          { label: detail.title },
        ]}
      />

      <div className="relative mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
        {backdrop ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={backdrop} alt="" className="aspect-[16/7] w-full object-cover" loading="lazy" />
        ) : (
          <div className="aspect-[16/7] w-full bg-[var(--surface-raised)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <section className="-mt-16 flex flex-col gap-5 px-1 min-[480px]:flex-row">
        <div className="mx-auto w-36 shrink-0 min-[480px]:mx-0 min-[480px]:w-40">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt={detail.title}
              className="w-full rounded-[var(--radius-card)] border border-[var(--border)] shadow-lg"
            />
          ) : null}
        </div>

        <div className="min-w-0 pt-14 text-center min-[480px]:pt-16 min-[480px]:text-left">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">{detail.title}</h1>
          {detail.originalTitle && detail.originalTitle !== detail.title ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{detail.originalTitle}</p>
          ) : null}
          {detail.tagline ? (
            <p className="mt-2 text-sm italic text-[var(--text-muted)]">“{detail.tagline}”</p>
          ) : null}

          {chips.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-2 min-[480px]:justify-start">
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-[var(--surface-raised)] px-2.5 py-1 text-xs">
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap justify-center gap-2 min-[480px]:justify-start">
            {canWatch && watchHref ? (
              <Link
                href={watchHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
              >
                <Icon name="play" size={17} />
                {kind === "series" ? "Tonton episode 1" : "Tonton"}
              </Link>
            ) : (
              <span className="inline-flex min-h-[48px] items-center rounded-[var(--radius-control)] border border-dashed border-[var(--border-strong)] px-5 text-sm text-[var(--text-muted)]">
                Video belum tersedia
              </span>
            )}
            {detail.trailerUrl ? (
              <a
                href={detail.trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-5 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Trailer
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {genres.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Genre">
          {genres.map((g) => (
            <li key={g}>
              <span className="inline-flex min-h-[36px] items-center rounded-full bg-[var(--surface-raised)] px-3 text-xs text-[var(--text-muted)]">
                {g}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {detail.overview ? (
        <section className="mt-6">
          <h2 className="mb-2 inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="info" size={18} className="text-[var(--accent)]" />
            Sinopsis
          </h2>
          <p className="prose-reader text-sm">{detail.overview}</p>
        </section>
      ) : null}

      {cast.length ? (
        <section className="mt-8" aria-labelledby="pemeran">
          <h2 id="pemeran" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="user" size={18} className="text-[var(--accent)]" />
            Pemeran
          </h2>
          <ul className="flex flex-wrap gap-4">
            {cast.map((c) => {
              const photo = tmdbUrl(c.profilePath, "w185");
              return (
                <li key={c.id ?? c.name} className="w-20 text-center">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt=""
                      loading="lazy"
                      className="mx-auto h-20 w-20 rounded-full border border-[var(--border)] object-cover"
                    />
                  ) : (
                    <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-raised)] text-[var(--text-muted)]">
                      <Icon name="user" size={24} />
                    </span>
                  )}
                  <p className="mt-1.5 line-clamp-2 text-xs font-medium">{c.name}</p>
                  {c.character ? (
                    <p className="line-clamp-1 text-[0.7rem] text-[var(--text-muted)]">{c.character}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {kind === "series" ? (
        <section className="mt-8" aria-labelledby="episode">
          <h2 id="episode" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="layers" size={18} className="text-[var(--accent)]" />
            Episode
            <span className="text-sm font-normal text-[var(--text-muted)]">
              ({seasons.length} season)
            </span>
          </h2>
          {seasons.length ? (
            <div className="space-y-3">
              {seasons.map((s, i) => (
                <details
                  key={s.id ?? s.seasonNumber}
                  open={i === 0}
                  className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40"
                >
                  <summary className="flex min-h-[48px] cursor-pointer items-center gap-3 px-4 text-sm font-semibold">
                    <Icon name="caretRightFilled" size={14} className="text-[var(--accent)]" />
                    {s.title || s.name || `Season ${s.seasonNumber}`}
                    <span className="text-xs font-normal text-[var(--text-muted)]">
                      {s.episodes?.length ?? 0} episode
                    </span>
                  </summary>
                  <ol className="divide-y divide-[var(--border)]">
                    {(s.episodes ?? []).map((e) => {
                      const href = `/movie/watch?slug=${encodeURIComponent(detail.slug)}&id=${encodeURIComponent(e.id)}&kind=series&season=${s.seasonNumber}&episode=${e.episodeNumber}`;
                      return (
                        <li key={e.id}>
                          <Link
                            href={href}
                            className="flex min-h-[48px] items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface-raised)]"
                          >
                            <span className="w-10 shrink-0 text-center text-xs font-semibold text-[var(--accent)] tabular-nums">
                              {e.episodeNumber}
                            </span>
                            <span className="min-w-0 flex-1 text-sm">
                              {e.title || `Episode ${e.episodeNumber}`}
                            </span>
                            {e.runtimeMinutes ? (
                              <span className="shrink-0 text-xs text-[var(--text-muted)]">
                                {runtimeLabel(e.runtimeMinutes)}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </details>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">Belum ada episode.</p>
          )}
        </section>
      ) : null}

      <p className="mt-8 text-xs text-[var(--text-muted)]">
        {kindLabel(detail.contentType)} • {detail.status ?? ""}
      </p>
    </main>
  );
}
