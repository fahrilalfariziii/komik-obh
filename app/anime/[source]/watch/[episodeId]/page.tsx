import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import AnimePlayer from "@/components/AnimePlayer";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import {
  fromAnoboyEpisode,
  fromOtakudesuEpisode,
  getAnoboyEpisode,
  getOtakudesuEpisode,
  isSourceId,
  resolveOtakudesuStream,
  type AnimeWatchView,
} from "@/lib/anime-sources";

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ source: string; episodeId: string }>;
  searchParams: Promise<{ server?: string; quality?: string }>;
}) {
  const { source, episodeId } = await params;
  const sp = await searchParams;

  if (!isSourceId(source)) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Sumber anime tidak dikenal"
          message={`Sumber "${source}" tidak tersedia. Pilih Otakudesu atau Anoboy.`}
          actionLabel="Kembali ke anime"
          actionHref="/anime"
        />
      </main>
    );
  }

  let view: AnimeWatchView;
  let serverNotice = "";
  try {
    if (source === "otakudesu") {
      const ep = await getOtakudesuEpisode(episodeId);
      view = fromOtakudesuEpisode(ep);
      const wanted = (sp.server ?? "").trim();
      const resolved = await resolveOtakudesuStream(ep, wanted);
      view = { ...view, defaultStream: resolved.url };
      serverNotice = resolved.notice ?? "";
    } else {
      view = fromAnoboyEpisode(await getAnoboyEpisode(episodeId));
    }
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat episode"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali ke anime"
          actionHref="/anime"
        />
      </main>
    );
  }

  if (!view.defaultStream) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Tidak ada stream untuk episode ini"
          message="Sumber tidak mengembalikan link nonton. Coba episode atau sumber lain."
          actionLabel="Kembali ke anime"
          actionHref="/anime"
        />
      </main>
    );
  }

  const wanted = (sp.server ?? "").trim();
  const watchHref = (id: string) => `/anime/${source}/watch/${id}`;
  const qualities = view.serverGroups;
  const eps = view.episodes;
  const downloads = view.downloads;

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[{ label: "Beranda", href: "/" }, { label: "Anime", href: "/anime" }, { label: view.title }]}
      />
      <h1 className="mt-4 line-clamp-2 text-xl font-bold tracking-tight">{view.title}</h1>
      {view.detailHref ? (
        <p className="mt-2">
          <Link
            href={view.detailHref}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            ← Detail anime
          </Link>
        </p>
      ) : null}
      <div className="mt-4">
        <AnimePlayer streamUrl={view.defaultStream} title={view.title} />
      </div>
      {serverNotice ? (
        <p role="status" className="mt-2 text-xs text-[var(--text-muted)]">
          {serverNotice}
        </p>
      ) : null}

      {qualities.length ? (
        <section className="mt-5" aria-label="Pilih server">
          {qualities.map((q) => (
            <div key={q.quality} className="mt-3">
              <p className="text-xs font-semibold text-[var(--text-muted)]">{q.quality}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {q.servers.map((s) => {
                  const active = wanted === s.id;
                  return (
                    <Link
                      key={s.id}
                      href={`${watchHref(episodeId)}?server=${encodeURIComponent(s.id)}&quality=${encodeURIComponent(q.quality)}`}
                      aria-current={active ? "true" : undefined}
                      className={
                        active
                          ? "inline-flex min-h-[40px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-3 text-xs font-semibold text-[var(--accent-ink)]"
                          : "inline-flex min-h-[40px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      }
                    >
                      {s.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <div className="mt-5 flex gap-2">
        {view.prevId ? (
          <Link
            href={watchHref(view.prevId)}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Icon name="chevronLeft" size={16} />
            Prev
          </Link>
        ) : null}
        {view.nextId ? (
          <Link
            href={watchHref(view.nextId)}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            Next
            <Icon name="chevronRight" size={16} />
          </Link>
        ) : null}
      </div>

      {downloads.length ? (
        <section className="mt-8" aria-labelledby="download">
          <h2 id="download" className="mb-3 text-lg font-semibold">
            Download
          </h2>
          <div className="space-y-3">
            {downloads.map((d) => (
              <div
                key={d.title}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-3"
              >
                <p className="text-sm font-semibold">
                  {d.title}
                  {d.size ? (
                    <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">{d.size}</span>
                  ) : null}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {d.links.map((u) => (
                    <a
                      key={`${d.title}-${u.title}`}
                      href={u.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-[36px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {u.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {eps.length ? (
        <section className="mt-8" aria-labelledby="episode-lain">
          <h2 id="episode-lain" className="mb-3 text-lg font-semibold">
            Episode lain ({eps.length})
          </h2>
          <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
            {eps.map((e) => (
              <li key={e.id}>
                <Link
                  href={watchHref(e.id)}
                  aria-current={e.id === episodeId ? "page" : undefined}
                  className={`flex min-h-[48px] items-center gap-3 px-3 py-2.5 hover:bg-[var(--surface-raised)] ${
                    e.id === episodeId ? "text-[var(--accent)]" : ""
                  }`}
                >
                  <span className="w-10 shrink-0 text-center text-xs font-semibold tabular-nums">
                    {e.eps}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">{e.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </main>
  );
}
