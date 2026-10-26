import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DrakorPlayer from "@/components/DrakorPlayer";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getDetail, playDrakor } from "@/lib/drakor";
import { getWatchResume } from "@/lib/history";
import { formatPosition } from "@/lib/history-state";

function normEpisode(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ episode?: string; t?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  let title = id;
  let total = 0;
  try {
    const d = await getDetail(id);
    title = d.title;
    total = d.episodes?.length ?? 0;
  } catch {
    // Detail gagal bukan fatal: judul pakai id, navigasi episode disembunyikan.
  }

  const numbers =
    total > 0 ? Array.from({ length: total }, (_, i) => i + 1) : [];
  const episode = numbers.length ? Math.min(normEpisode(sp.episode), numbers[numbers.length - 1] as number) : normEpisode(sp.episode);
  const prev = numbers.length && episode > 1 ? episode - 1 : null;
  const next = numbers.length && episode < (numbers[numbers.length - 1] as number) ? episode + 1 : null;

  let sources: string[] = [];
  try {
    const play = await playDrakor(id, episode, "720");
    sources = [play.vid_url_proxy, play.vid_url].filter(Boolean);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat stream"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali ke detail"
          actionHref={`/drakor/${id}`}
        />
      </main>
    );
  }

  // Resume: hanya untuk episode yang sama dan belum selesai (gate di resumeFor).
  const episodeId = String(episode);
  const initialSeek = Number(sp.t ?? 0) || 0;
  let resume: Awaited<ReturnType<typeof getWatchResume>> = null;
  try {
    resume = await getWatchResume({ domain: "drakor", ref: id, episodeId });
  } catch {
    resume = null;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Drakor", href: "/drakor" },
          { label: title },
        ]}
      />
      <h1 className="mt-4 line-clamp-2 text-xl font-bold tracking-tight">
        {title} — Episode {episode}
      </h1>
      <p className="mt-2">
        <Link
          href={`/drakor/${id}`}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
        >
          ← Detail drakor
        </Link>
      </p>
      <div className="mt-4">
        {resume ? (
          <Link
            href={`/drakor/watch/${id}?episode=${episode}&t=${resume.resumeAt}`}
            className="mb-3 inline-flex min-h-[40px] items-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            <Icon name="play" size={14} />
            Lanjut di {formatPosition(resume.resumeAt)}
          </Link>
        ) : null}
        <DrakorPlayer
          sources={sources}
          title={`${title} episode ${episode}`}
          historyRef={{ id, episodeId, episode }}
          initialSeek={initialSeek}
        />
      </div>

      <div className="mt-5 flex gap-2">
        {prev ? (
          <Link
            href={`/drakor/watch/${id}?episode=${prev}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Icon name="chevronLeft" size={16} />
            Ep {prev}
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/drakor/watch/${id}?episode=${next}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            Ep {next}
            <Icon name="chevronRight" size={16} />
          </Link>
        ) : null}
      </div>

      {numbers.length > 1 ? (
        <section className="mt-8" aria-labelledby="pilih-episode">
          <h2 id="pilih-episode" className="mb-3 text-lg font-semibold">
            Episode ({numbers.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {numbers.map((n) => (
              <Link
                key={n}
                href={`/drakor/watch/${id}?episode=${n}`}
                aria-current={n === episode ? "page" : undefined}
                className={
                  n === episode
                    ? "inline-flex min-h-[40px] min-w-[48px] items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent)] px-3 text-xs font-semibold text-[var(--accent-ink)]"
                    : "inline-flex min-h-[40px] min-w-[48px] items-center justify-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }
              >
                {n}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
