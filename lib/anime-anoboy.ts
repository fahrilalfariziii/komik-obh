export const ANOBOY_BASE = "https://www.sankavollerei.web.id/anime/anoboy";

export type AnoboySearchItem = {
  title: string;
  slug: string;
  poster: string;
  status?: string | null;
  type?: string | null;
  url?: string;
};

export type AnoboyGenre = { name: string; slug: string; url?: string };
export type AnoboyEpisodeItem = {
  slug: string;
  title: string;
  episode?: string | number | null;
  release_date?: string;
  url?: string;
};

export type AnoboyDetail = {
  title: string;
  poster: string;
  synopsis?: string | null;
  info?: {
    status?: string;
    studio?: string;
    released?: string;
    duration?: string;
    season?: string;
    type?: string;
  } | null;
  genres?: AnoboyGenre[];
  episode_list?: AnoboyEpisodeItem[];
};

export type AnoboyStream = { name?: string; url: string };
export type AnoboyEpisode = {
  title: string;
  streams?: AnoboyStream[];
  downloads?: Array<{ title?: string; name?: string; url?: string; size?: string }>;
};

export function anoboySearchUrl(kw: string, page = 1) {
  return `${ANOBOY_BASE}/search/${encodeURIComponent(kw)}?page=${page}`;
}
export function anoboyDetailUrl(slug: string) {
  return `${ANOBOY_BASE}/anime/${encodeURIComponent(slug)}`;
}
export function anoboyEpisodeUrl(slug: string) {
  return `${ANOBOY_BASE}/episode/${encodeURIComponent(slug)}`;
}

export function slugFromAnoboyHref(href: string): string {
  const noQuery = href.split("?")[0] ?? href;
  const clean = noQuery.split("#")[0] ?? noQuery;
  return clean.replace(/\/+$/, "").split("/").pop() ?? href;
}

export function friendlyAnoboyError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  if (/45\/menit|429/i.test(raw)) {
    return "Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi.";
  }
  if (/fetch failed|ENOTFOUND|EAI_AGAIN|ECONNRESET|certificate|SSL/i.test(raw)) {
    return `Tidak bisa mencapai sankavollerei.web.id (${raw}). Periksa koneksi lalu coba lagi.`;
  }
  return raw;
}

async function anoboyFetch<T>(url: string, revalidate: number): Promise<T> {
  let res;
  try {
    res = await fetch(url, {
      next: { revalidate },
      headers: { "User-Agent": "komik-reader/0.1" },
    });
  } catch (e) {
    throw new Error(friendlyAnoboyError(e));
  }
  if (res.status === 429) {
    throw new Error("Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi.");
  }
  if (!res.ok) {
    throw new Error(`API anime error ${res.status}. Coba lagi.`);
  }
  return res.json() as Promise<T>;
}

export function searchAnoboy(kw: string, page = 1) {
  return anoboyFetch<{ anime_list?: AnoboySearchItem[] }>(anoboySearchUrl(kw, page), 300);
}

export function getAnoboyDetail(slug: string) {
  return anoboyFetch<{ detail?: AnoboyDetail }>(anoboyDetailUrl(slug), 3600).then((r) => {
    if (!r.detail?.title) throw new Error("Detail anime tidak ditemukan.");
    return r.detail;
  });
}

export function getAnoboyEpisode(slug: string) {
  return anoboyFetch<AnoboyEpisode>(anoboyEpisodeUrl(slug), 300).then((r) => {
    if (!r.title) throw new Error("Episode anime tidak ditemukan.");
    return r;
  });
}
