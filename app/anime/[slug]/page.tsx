import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getAnimeDetail } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireOwner();
  const { slug } = await params;

  let d;
  try {
    d = await getAnimeDetail(slug);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat detail anime"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali ke anime"
          actionHref="/anime"
        />
      </main>
    );
  }

  const episodes = d.episodeList ?? [];
  const genres = d.genreList ?? [];
  const rec = d.recommendedAnimeList ?? [];
  const paras = d.synopsis?.paragraphs ?? [];
  const synopsis = paras.join("\n\n").trim();
  const chips = [d.type, d.status, d.score ? `Skor ${d.score}` : undefined].filter(
    Boolean
  ) as string[];

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[{ label: "Beranda", href: "/" }, { label: "Anime", href: "/anime" }, { label: d.title }]}
      />

      <section className="mt-4 flex flex-col gap-5 min-[480px]:flex-row">
        <div className="mx-auto w-40 shrink-0 min-[480px]:mx-0 min-[480px]:w-36">
          {d.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={d.poster}
              alt={d.title}
              className="w-full rounded-[var(--radius-card)] border border-[var(--border)] object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0 text-center min-[480px]:text-left">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">{d.title}</h1>

          {chips.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-2 min-[480px]:justify-start">
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-[var(--surface-raised)] px-2.5 py-1 text-xs">
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {[d.studios, d.duration, d.aired].filter(Boolean).join(" • ")}
          </p>

          {episodes[0] ? (
            <div className="mt-5">
              <Link
                href={`/anime/watch/${episodes[0].episodeId}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
              >
                <Icon name="play" size={17} />
                Nonton terbaru
                <span className="text-xs font-normal opacity-70">Ep {episodes[0].eps}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {genres.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Genre">
          {genres.map((g) => (
            <li key={g.genreId}>
              <Link
                href={`/anime/genre/${g.genreId}`}
                className="inline-flex min-h-[36px] items-center rounded-full bg-[var(--surface-raised)] px-3 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <section className="mt-6">
        <h2 className="mb-2 inline-flex items-center gap-2 text-lg font-semibold">
          <Icon name="info" size={18} className="text-[var(--accent)]" />
          Sinopsis
        </h2>
        {synopsis ? (
          <p className="prose-reader text-sm">{synopsis}</p>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Sinopsis belum tersedia dari sumber.</p>
        )}
      </section>

      <section className="mt-8" aria-labelledby="daftar-episode">
        <h2 id="daftar-episode" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
          <Icon name="layers" size={18} className="text-[var(--accent)]" />
          Daftar episode
          <span className="text-sm font-normal text-[var(--text-muted)]">({episodes.length})</span>
        </h2>
        {episodes.length ? (
          <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
            {episodes.map((e) => (
              <li key={e.episodeId}>
                <Link
                  href={`/anime/watch/${e.episodeId}`}
                  className="flex min-h-[48px] items-center gap-3 px-3 py-2.5 hover:bg-[var(--surface-raised)]"
                >
                  <span className="w-10 shrink-0 text-center text-xs font-semibold text-[var(--accent)] tabular-nums">
                    {e.eps ?? "•"}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">{e.title}</span>
                  {e.date ? (
                    <span className="shrink-0 text-xs text-[var(--text-muted)]">{e.date}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Belum ada episode.</p>
        )}
      </section>

      {rec.length ? (
        <section className="mt-8" aria-labelledby="rekomendasi">
          <h2 id="rekomendasi" className="mb-3 text-lg font-semibold">
            Rekomendasi
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {rec.slice(0, 5).map((a) => (
              <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
