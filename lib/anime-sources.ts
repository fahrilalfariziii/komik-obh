import {
  getServerUrl,
  pickStreamUrl,
  searchAnime,
  type AnimeDetail,
  type AnimeEpisode,
} from "./anime";
import {
  getAnoboyDetail,
  getAnoboyEpisode,
  searchAnoboy,
  type AnoboyDetail,
  type AnoboyEpisode,
} from "./anime-anoboy";

export type SourceId = "otakudesu" | "anoboy";
export const KNOWN_SOURCES: SourceId[] = ["otakudesu", "anoboy"];

export function isSourceId(v: string): v is SourceId {
  return (KNOWN_SOURCES as string[]).includes(v);
}

export type AnimeResult = {
  source: SourceId;
  id: string;
  title: string;
  cover: string;
  meta?: string;
  badge?: string;
  detailHref: string;
};

export type AnimeDetailView = {
  source: SourceId;
  title: string;
  poster: string;
  chips: string[];
  metaLine: string;
  genres: Array<{ id: string; title: string }>;
  synopsis: string;
  episodes: Array<{ id: string; title: string; eps: string; date?: string }>;
  recommendations: AnimeResult[];
  watchHref: (episodeId: string) => string;
};

export type AnimeWatchView = {
  source: SourceId;
  title: string;
  animeId: string;
  detailHref: string | null;
  defaultStream: string;
  serverGroups: Array<{ quality: string; servers: Array<{ id: string; title: string }> }>;
  prevId: string | null;
  nextId: string | null;
  downloads: Array<{ title: string; size?: string; links: Array<{ title: string; url: string }> }>;
  episodes: Array<{ id: string; title: string; eps: string }>;
};

const trim = (s: unknown) => (typeof s === "string" ? s.trim() : "");
const eps = (v: unknown) => (v === null || v === undefined || v === "" ? "•" : String(v));

export function fromOtakudesuDetail(d: AnimeDetail): AnimeDetailView {
  return {
    source: "otakudesu",
    title: d.title,
    poster: d.poster,
    chips: [d.type, d.status, d.score ? `Skor ${d.score}` : undefined].filter(Boolean) as string[],
    metaLine: [d.studios, d.duration, d.aired].filter(Boolean).join(" • "),
    genres: (d.genreList ?? []).map((g) => ({ id: g.genreId, title: trim(g.title) })),
    synopsis: (d.synopsis?.paragraphs ?? []).join("\n\n").trim(),
    episodes: (d.episodeList ?? []).map((e) => ({
      id: e.episodeId,
      title: e.title,
      eps: eps(e.eps),
      date: e.date,
    })),
    recommendations: (d.recommendedAnimeList ?? []).map((a) => ({
      source: "otakudesu" as SourceId,
      id: a.animeId,
      title: a.title,
      cover: a.poster,
      detailHref: `/anime/otakudesu/${a.animeId}`,
    })),
    watchHref: (episodeId: string) => `/anime/otakudesu/watch/${episodeId}`,
  };
}

export function fromAnoboyDetail(d: AnoboyDetail): AnimeDetailView {
  const info = d.info ?? {};
  return {
    source: "anoboy",
    title: trim(d.title),
    poster: d.poster,
    chips: [info.type, info.status].filter(Boolean) as string[],
    metaLine: [info.studio, info.duration, info.released].filter(Boolean).join(" • "),
    genres: (d.genres ?? []).map((g) => ({ id: g.slug, title: trim(g.name) })),
    synopsis: trim(d.synopsis),
    episodes: (d.episode_list ?? []).map((e) => ({
      id: e.slug,
      title: e.title,
      eps: eps(e.episode),
      date: e.release_date,
    })),
    recommendations: [],
    watchHref: (episodeId: string) => `/anime/anoboy/watch/${episodeId}`,
  };
}

export function fromOtakudesuEpisode(e: AnimeEpisode): AnimeWatchView {
  return {
    source: "otakudesu",
    title: e.title,
    animeId: e.animeId,
    detailHref: `/anime/otakudesu/${e.animeId}`,
    defaultStream: e.defaultStreamingUrl,
    serverGroups: (e.server?.qualities ?? []).map((q) => ({
      quality: q.title,
      servers: q.serverList.map((s) => ({ id: s.serverId, title: s.title })),
    })),
    prevId: e.hasPrevEpisode && e.prevEpisode ? e.prevEpisode.episodeId : null,
    nextId: e.hasNextEpisode && e.nextEpisode ? e.nextEpisode.episodeId : null,
    downloads: (e.downloadUrl?.qualities ?? []).map((x) => ({
      title: x.title,
      size: x.size,
      links: x.urls.map((u) => ({ title: u.title, url: u.url })),
    })),
    episodes: (e.info?.episodeList ?? []).map((x) => ({
      id: x.episodeId,
      title: x.title,
      eps: eps(x.eps),
    })),
  };
}

export function fromAnoboyEpisode(e: AnoboyEpisode): AnimeWatchView {
  const first = (e.streams ?? []).find((s) => typeof s.url === "string" && s.url);
  const dl = Array.isArray(e.downloads) ? e.downloads : [];
  return {
    source: "anoboy",
    title: e.title,
    animeId: "",
    detailHref: null,
    defaultStream: first?.url ?? "",
    serverGroups: [],
    prevId: null,
    nextId: null,
    downloads: dl
      .filter((x) => x && typeof x.url === "string" && x.url)
      .map((x) => ({
        title: trim(x.title || x.name) || "Download",
        size: typeof x.size === "string" ? x.size : undefined,
        links: [{ title: trim(x.name || x.title) || "Link", url: x.url as string }],
      })),
    episodes: [],
  };
}

export async function resolveOtakudesuStream(
  ep: AnimeEpisode,
  serverId: string
): Promise<{ url: string; notice: string | null }> {
  const valid = new Set(
    (ep.server?.qualities ?? []).flatMap((q) => q.serverList.map((s) => s.serverId))
  );
  if (!serverId) return { url: ep.defaultStreamingUrl, notice: null };
  if (!valid.has(serverId)) {
    return {
      url: ep.defaultStreamingUrl,
      notice: "Server pilihan tidak dikenal, memakai stream default.",
    };
  }
  try {
    const resolved = await getServerUrl(serverId);
    return { url: pickStreamUrl(ep.defaultStreamingUrl, resolved, serverId), notice: null };
  } catch {
    return {
      url: ep.defaultStreamingUrl,
      notice: "Server pilihan gagal dimuat (mungkin rate-limit), memakai stream default.",
    };
  }
}

export function legacySlugTarget(slug: string): string {
  if (isSourceId(slug)) return "/anime";
  return `/anime/otakudesu/${slug}`;
}

async function settle<T>(p: Promise<T>, ms: number): Promise<{ ok: true; v: T } | { ok: false }> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, rej) => {
    timer = setTimeout(() => rej(new Error("timeout")), ms);
  });
  try {
    const v = await Promise.race([p, timeout]);
    return { ok: true, v };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer!);
  }
}

export async function searchAllAnime(
  q: string,
  timeoutMs = 8000
): Promise<{ results: AnimeResult[]; partial: Record<SourceId, boolean> }> {
  const [otu, ano] = await Promise.all([
    settle(
      searchAnime(q).then((r) => r.data?.animeList ?? []),
      timeoutMs
    ),
    settle(
      searchAnoboy(q).then((r) => r.anime_list ?? []),
      timeoutMs
    ),
  ]);
  const results: AnimeResult[] = [];
  if (otu.ok) {
    for (const a of otu.v.slice(0, 12)) {
      results.push({
        source: "otakudesu",
        id: a.animeId,
        title: trim(a.title) || a.title,
        cover: a.poster,
        meta:
          [a.status, a.score ? `Skor ${a.score}` : undefined].filter(Boolean).join(" • ") ||
          undefined,
        detailHref: `/anime/otakudesu/${a.animeId}`,
      });
    }
  }
  if (ano.ok) {
    for (const a of ano.v.slice(0, 12)) {
      results.push({
        source: "anoboy",
        id: a.slug,
        title: trim(a.title),
        cover: a.poster,
        meta: [a.type, a.status].filter(Boolean).join(" • ") || undefined,
        badge: "Anoboy",
        detailHref: `/anime/anoboy/${a.slug}`,
      });
    }
  }
  return { results, partial: { otakudesu: !otu.ok, anoboy: !ano.ok } };
}

// Re-export agar page cukup import dari satu modul sumber.
export { getAnoboyDetail, getAnoboyEpisode };
export { getAnimeDetail as getOtakudesuDetail, getEpisode as getOtakudesuEpisode } from "./anime";
