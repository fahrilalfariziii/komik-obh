export const ANIME_BASE = "https://www.sankavollerei.web.id/anime";

export type AnimeListItem = {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  episodes?: number;
  score?: string;
  releaseDay?: string;
  latestReleaseDate?: string;
  lastReleaseDate?: string;
  status?: string;
};

export type AnimeGenre = { title: string; genreId: string; href: string };
export type AnimeEpisodeItem = {
  title: string;
  eps?: number;
  date?: string;
  episodeId: string;
  href: string;
};
export type AnimeServerEntry = { title: string; serverId: string; href: string };
export type AnimeQuality = { title: string; serverList: AnimeServerEntry[] };
export type AnimeDownloadQuality = {
  title: string;
  size?: string;
  urls: Array<{ title: string; url: string }>;
};
export type AnimeDetail = {
  title: string;
  poster: string;
  japanese?: string;
  score?: string;
  producers?: string;
  type?: string;
  status?: string;
  episodes?: number | null;
  duration?: string;
  aired?: string;
  studios?: string;
  synopsis?: { paragraphs?: string[]; connections?: unknown[] };
  genreList?: AnimeGenre[];
  episodeList?: AnimeEpisodeItem[];
  recommendedAnimeList?: AnimeListItem[];
};
export type AnimeEpisode = {
  title: string;
  animeId: string;
  releaseTime?: string;
  defaultStreamingUrl: string;
  hasPrevEpisode?: boolean;
  prevEpisode?: { episodeId: string } | null;
  hasNextEpisode?: boolean;
  nextEpisode?: { episodeId: string } | null;
  server?: { qualities?: AnimeQuality[] };
  downloadUrl?: { qualities?: AnimeDownloadQuality[] };
  info?: { episodeList?: AnimeEpisodeItem[]; genreList?: AnimeGenre[] };
};
export type AnimeScheduleDay = {
  day: string;
  anime_list: Array<{ title: string; slug: string; url: string; poster: string }>;
};

export function animeHomeUrl() {
  return `${ANIME_BASE}/home`;
}
export function ongoingUrl(page = 1) {
  return `${ANIME_BASE}/ongoing-anime?page=${page}`;
}
export function completeUrl(page = 1) {
  return `${ANIME_BASE}/complete-anime?page=${page}`;
}
export function animeDetailUrl(slug: string) {
  return `${ANIME_BASE}/anime/${encodeURIComponent(slug)}`;
}
export function episodeUrl(slug: string) {
  return `${ANIME_BASE}/episode/${encodeURIComponent(slug)}`;
}
export function serverUrl(id: string) {
  return `${ANIME_BASE}/server/${encodeURIComponent(id)}`;
}
export function animeSearchUrl(kw: string) {
  return `${ANIME_BASE}/search/${encodeURIComponent(kw)}`;
}
export function scheduleUrl() {
  return `${ANIME_BASE}/schedule`;
}
export function genreUrl(slug: string, page = 1) {
  return `${ANIME_BASE}/genre/${encodeURIComponent(slug)}?page=${page}`;
}

export function slugFromAnimeHref(href: string): string {
  return href.replace(/\/+$/, "").split("/").pop() ?? href;
}

export function pickStreamUrl(defaultUrl: string, resolvedUrl: string, serverId: string): string {
  if (serverId && resolvedUrl) return resolvedUrl;
  return defaultUrl;
}

export function friendlyAnimeError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  if (/45\/menit|429/i.test(raw)) {
    return "Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi.";
  }
  if (/fetch failed|ENOTFOUND|EAI_AGAIN|ECONNRESET|certificate|SSL/i.test(raw)) {
    return `Tidak bisa mencapai sankavollerei.web.id (${raw}). Periksa koneksi lalu coba lagi.`;
  }
  return raw;
}

async function animeFetch<T>(url: string, revalidate: number): Promise<T> {
  let res;
  try {
    res = await fetch(url, {
      next: { revalidate },
      headers: { "User-Agent": "komik-reader/0.1" },
    });
  } catch (e) {
    throw new Error(friendlyAnimeError(e));
  }
  if (res.status === 429) {
    throw new Error("Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi.");
  }
  if (!res.ok) {
    throw new Error(`API anime error ${res.status}. Coba lagi.`);
  }
  return res.json() as Promise<T>;
}

export function getAnimeHome() {
  return animeFetch<{
    data?: { ongoing?: { animeList?: AnimeListItem[] }; completed?: { animeList?: AnimeListItem[] } };
  }>(animeHomeUrl(), 300);
}

export function getOngoing(page = 1) {
  return animeFetch<{
    data?: { animeList?: AnimeListItem[] };
    pagination?: {
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
      nextPage?: number | null;
      prevPage?: number | null;
      currentPage?: number;
    } | null;
  }>(ongoingUrl(page), 300);
}

export function getComplete(page = 1) {
  return animeFetch<{
    data?: { animeList?: AnimeListItem[] };
    pagination?: {
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
      nextPage?: number | null;
      prevPage?: number | null;
      currentPage?: number;
    } | null;
  }>(completeUrl(page), 300);
}

export function getAnimeDetail(slug: string) {
  return animeFetch<{ data?: AnimeDetail }>(animeDetailUrl(slug), 3600).then((r) => {
    if (!r.data?.title) throw new Error("Detail anime tidak ditemukan.");
    return r.data;
  });
}

export function getEpisode(slug: string) {
  return animeFetch<{ data?: AnimeEpisode }>(episodeUrl(slug), 300).then((r) => {
    if (!r.data?.defaultStreamingUrl) throw new Error("Episode anime tidak ditemukan.");
    return r.data;
  });
}

export function getServerUrl(id: string) {
  return animeFetch<{ data?: { url?: string } }>(serverUrl(id), 600).then((r) => {
    if (!r.data?.url) throw new Error("Server stream tidak mengembalikan URL.");
    return r.data.url;
  });
}

export function searchAnime(kw: string) {
  return animeFetch<{ data?: { animeList?: AnimeListItem[] } }>(animeSearchUrl(kw), 300);
}

export function getSchedule() {
  return animeFetch<{ data?: AnimeScheduleDay[] }>(scheduleUrl(), 900);
}

export function getGenre(slug: string, page = 1) {
  return animeFetch<{
    data?: { animeList?: AnimeListItem[] };
    pagination?: {
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
      nextPage?: number | null;
      prevPage?: number | null;
      currentPage?: number;
    } | null;
  }>(genreUrl(slug, page), 300);
}
