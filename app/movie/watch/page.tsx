import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import MoviePlayer, { type PlayerSubtitle } from "@/components/MoviePlayer";
import StatePanel from "@/components/StatePanel";
import { getDetail, getPlay, resolvePlayableUrl, type MovieKind } from "@/lib/movie";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Nonton",
  description: "Pemutar film dan series subtitle Indonesia.",
};

export default async function MovieWatchPage({
  searchParams,
}: {
  searchParams: Promise<{
    slug?: string;
    id?: string;
    kind?: string;
    season?: string;
    episode?: string;
  }>;
}) {
  await requireOwner();
  const sp = await searchParams;
  const slug = (sp.slug ?? "").trim();
  const id = (sp.id ?? "").trim();
  const kind: MovieKind = sp.kind === "series" ? "series" : "movie";
  const season = (sp.season ?? "").trim();
  const episode = (sp.episode ?? "").trim();

  if (!slug || !id) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Tautan tontonan tidak lengkap"
          message="Buka halaman detail lalu tekan tombol tonton."
          actionLabel="Kembali ke movie"
          actionHref="/movie"
        />
      </main>
    );
  }

  const detailHref = `/movie/${kind === "series" ? "series" : "film"}/${encodeURIComponent(slug)}`;

  let play;
  try {
    play = await getPlay({ slug, id, kind });
  } catch (e) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat stream"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali ke detail"
          actionHref={detailHref}
        />
      </main>
    );
  }

  const title = await getDetail(slug, kind)
    .then((d) => d.title)
    .catch(() => slug);

  const candidates = [play.vidurl_proxy, play.vidUrl].filter(Boolean) as string[];
  const sources: string[] = [];
  for (const c of candidates) {
    const resolved = await resolvePlayableUrl(c).catch(() => c);
    if (!sources.includes(resolved)) sources.push(resolved);
  }

  const subtitles: PlayerSubtitle[] = (play.subtitles ?? [])
    .map((s) => ({
      lang: s.lang,
      label: s.label || s.lang.toUpperCase(),
      url: s.suburl_proxy || s.subUrl || "",
    }))
    .filter((s) => s.url)
    .sort((a, b) => (a.lang === "id" ? -1 : b.lang === "id" ? 1 : 0));

  const subLabel = kind === "series" && season && episode ? `S${season} E${episode}` : "";

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Movie", href: "/movie" },
          { label: title, href: detailHref },
          { label: subLabel || "Nonton" },
        ]}
      />
      <h1 className="mt-4 line-clamp-2 text-xl font-bold tracking-tight">
        {title}
        {subLabel ? ` — ${subLabel}` : ""}
      </h1>
      <p className="mt-2">
        <Link
          href={detailHref}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
        >
          ← Detail judul
        </Link>
      </p>

      <div className="mt-4">
        <MoviePlayer
          sources={sources}
          subtitles={subtitles}
          title={subLabel ? `${title} ${subLabel}` : title}
        />
      </div>

      {play.playbackCode && play.playbackCode !== "ok" ? (
        <p className="mt-3 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 py-2 text-xs text-[var(--text-muted)]">
          Catatan sumber: {play.playbackCode}
        </p>
      ) : null}
    </main>
  );
}
