export const MOVIE_BASE = "https://indocast.site/api/idlix";

export type MovieKind = "movie" | "series";

/** Item ringkas yang dipakai slider, section, dan daftar (movie/series/network). */
export type MovieItem = {
  id: string;
  contentType: string;
  title: string;
  slug: string;
  overview?: string;
  tagline?: string | null;
  posterPath?: string | null;
  backdropPath?: string | null;
  logoPath?: string | null;
  releaseDate?: string | null;
  runtimeMinutes?: number | null;
  voteAverage?: number | null;
  viewCount?: number | null;
  genres?: Array<{ id?: number; code?: string; name?: string } | string>;
  hasVideo?: boolean;
  numberOfSeasons?: number | null;
  numberOfEpisodes?: number | null;
};

export type MovieSection = {
  sectionId?: string;
  type?: string;
  title: string;
  slug?: string;
  items: MovieItem[];
};

export type MovieHome = {
  sliderItems: MovieItem[];
  sections: MovieSection[];
};

export type MoviePagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type MovieList = {
  items: MovieItem[];
  pagination: MoviePagination;
};

export type MovieNetwork = {
  networkName: string;
  sortBy: string;
  pagination: MoviePagination;
  data: MovieItem[];
};

export type MovieFilterOption = { id?: number; code: string; name: string };

export type MovieFilters = {
  genres: MovieFilterOption[];
  countries: MovieFilterOption[];
  qualities: MovieFilterOption[];
  years: MovieFilterOption[];
  sort: MovieFilterOption[];
};

export type MovieCast = {
  id?: string;
  name: string;
  character?: string;
  profilePath?: string | null;
  order?: number;
};

export type MovieEpisode = {
  id: string;
  episodeNumber: number;
  title?: string | null;
  overview?: string | null;
  runtimeMinutes?: number | null;
  hasVideo?: boolean;
  stillPath?: string | null;
  thumbnail?: string | null;
  airDate?: string | null;
  voteAverage?: number | null;
};

export type MovieSeason = {
  id?: string;
  seasonNumber: number;
  title?: string | null;
  name?: string | null;
  episodeCount?: number | null;
  episodes?: MovieEpisode[];
};

export type MovieDetail = {
  id: string;
  tmdbId?: number;
  imdbId?: string | null;
  contentType: string;
  title: string;
  originalTitle?: string;
  slug: string;
  overview?: string;
  tagline?: string | null;
  posterPath?: string | null;
  backdropPath?: string | null;
  logoPath?: string | null;
  releaseDate?: string | null;
  runtimeMinutes?: number | null;
  voteAverage?: number | null;
  viewCount?: number | null;
  quality?: string | null;
  country?: string | null;
  status?: string | null;
  genres?: Array<{ id?: number; code?: string; name?: string } | string>;
  cast?: MovieCast[];
  seasons?: MovieSeason[];
  hasVideo?: boolean;
  trailerUrl?: string | null;
};

export type MovieSubtitle = {
  lang: string;
  label?: string;
  subUrl?: string;
  suburl_proxy?: string;
};

export type MoviePlay = {
  videoId?: string;
  vidUrl: string;
  vidurl_proxy?: string;
  mode?: string;
  playbackCode?: string;
  subtitles?: MovieSubtitle[];
};

/** Network asli idlix (nilai apa adanya, jangan diubah). */
export const NETWORKS = [
  { slug: "netflix", label: "Netflix" },
  { slug: "hbo", label: "HBO" },
  { slug: "prime-video", label: "Prime Video" },
  { slug: "disney-plus", label: "Disney+" },
  { slug: "apple-tv-plus", label: "Apple TV+" },
] as const;

/**
 * Urutan sortir untuk network. `realese` adalah ejaan asli API (typo) —
 * jangan "dibetulkan", API menolaknya sebagai 400.
 */
export const NETWORK_SORTS = [
  { code: "latest", label: "Terbaru" },
  { code: "populer", label: "Populer" },
  { code: "realese", label: "Rilis" },
  { code: "views", label: "Dilihat" },
  { code: "rating", label: "Rating" },
] as const;

/** Sortir untuk /movie dan /series. */
export const LIST_SORTS = [
  { code: "releaseDate", label: "Tanggal rilis" },
  { code: "rating", label: "Rating" },
  { code: "views", label: "Dilihat" },
  { code: "latest", label: "Terbaru" },
] as const;

export function homeUrl() {
  return `${MOVIE_BASE}/home`;
}

export function networkUrl(network: string, page = 1, sort = "latest", limit = 36) {
  return `${MOVIE_BASE}/home/network?network=${encodeURIComponent(network)}&page=${page}&limit=${limit}&sort=${encodeURIComponent(sort)}`;
}

export function filtersUrl() {
  return `${MOVIE_BASE}/movie/filters`;
}

export function moviesUrl({
  page = 1,
  genre,
  sort = "releaseDate",
  limit = 36,
}: { page?: number; genre?: string; sort?: string; limit?: number } = {}) {
  let url = `${MOVIE_BASE}/movie?page=${page}&limit=${limit}&sort=${encodeURIComponent(sort)}`;
  if (genre) url += `&genre=${encodeURIComponent(genre)}`;
  return url;
}

export function seriesUrl({
  page = 1,
  genre,
  sort = "releaseDate",
  limit = 36,
}: { page?: number; genre?: string; sort?: string; limit?: number } = {}) {
  let url = `${MOVIE_BASE}/series?page=${page}&limit=${limit}&sort=${encodeURIComponent(sort)}`;
  if (genre) url += `&genre=${encodeURIComponent(genre)}`;
  return url;
}

export function detailUrl(slug: string, kind: MovieKind) {
  const type = kind === "series" ? "series" : "movies";
  return `${MOVIE_BASE}/detail?slug=${encodeURIComponent(slug)}&type=${type}`;
}

export function getPlayUrl({
  slug,
  id,
  kind,
}: {
  slug: string;
  id: string;
  kind: MovieKind;
}) {
  const type = kind === "series" ? "series" : "movie";
  return `${MOVIE_BASE}/getplay?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(id)}&type=${type}`;
}

/** Kunci API drakor/idlix dipakai bersama, tetap server-only. */
function apiKey(): string {
  const key = process.env.DRAKOR_API_KEY ?? "";
  if (!key) throw new Error("DRAKOR_API_KEY belum dikonfigurasi di .env.");
  return key;
}

async function getJson<T>(url: string, revalidate: number): Promise<T> {
  let res;
  try {
    res = await fetch(url, {
      next: { revalidate },
      headers: { "x-api-key": apiKey() },
    });
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    throw new Error(`Tidak bisa mencapai indocast.site (${raw}). Periksa koneksi lalu coba lagi.`);
  }
  if (!res.ok) {
    throw new Error(`API movie error ${res.status}. Coba lagi.`);
  }
  return (await res.json()) as T;
}

export function getHome() {
  return getJson<MovieHome>(homeUrl(), 600);
}

export async function getNetwork(network: string, page = 1, sort = "latest") {
  const r = await getJson<MovieNetwork>(networkUrl(network, page, sort), 300);
  return { networkName: r.networkName, sortBy: r.sortBy, pagination: r.pagination, items: r.data ?? [] };
}

export function getFilters() {
  return getJson<{ success: boolean; message: string; data: MovieFilters }>(filtersUrl(), 86400).then(
    (r) => {
      if (!r?.data) throw new Error(r?.message || "Filter tidak tersedia.");
      return r.data;
    }
  );
}

export function getMovies(params: { page?: number; genre?: string; sort?: string } = {}) {
  return getJson<MovieList>(moviesUrl(params), 300);
}

export function getSeries(params: { page?: number; genre?: string; sort?: string } = {}) {
  return getJson<MovieList>(seriesUrl(params), 300);
}

export function getDetail(slug: string, kind: MovieKind) {
  return getJson<MovieDetail>(detailUrl(slug, kind), 3600).then((d) => {
    if (!d?.title) throw new Error("Detail tidak ditemukan.");
    return d;
  });
}

export function getPlay({ slug, id, kind }: { slug: string; id: string; kind: MovieKind }) {
  return getJson<{ success: boolean; message?: string; data: MoviePlay }>(
    getPlayUrl({ slug, id, kind }),
    0
  ).then((r) => {
    if (!r?.success || !r.data?.vidUrl) {
      throw new Error(r?.message || "Stream tidak tersedia untuk judul ini.");
    }
    return r.data;
  });
}

/** Cari URL m3u8 pertama di dalam bentuk config apa pun (defensif). */
function findM3u8(node: unknown): string | null {
  if (typeof node === "string") {
    return /\.m3u8|application\/vnd\.apple\.mpegurl/i.test(node) ? node : null;
  }
  if (Array.isArray(node)) {
    for (const v of node) {
      const found = findM3u8(v);
      if (found) return found;
    }
    return null;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (typeof obj.file === "string") {
      const found = findM3u8(obj.file);
      if (found) return found;
    }
    for (const key of ["sources", "url", "src", "playlist", "hls", "streams"]) {
      if (key in obj) {
        const found = findM3u8(obj[key]);
        if (found) return found;
      }
    }
  }
  return null;
}

/**
 * idlix mengembalikan master m3u8 langsung (walau URL-nya berakhiran .json),
 * tetapi sebagian judul bisa mengembalikan config JSON. Fungsi ini memastikan
 * kita mendapat URL m3u8 yang bisa diputar.
 */
export async function resolvePlayableUrl(url: string): Promise<string> {
  let res;
  try {
    res = await fetch(url, { next: { revalidate: 0 }, headers: { "x-api-key": apiKey() } });
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    throw new Error(`Tidak bisa memuat stream (${raw}).`);
  }
  if (!res.ok) throw new Error(`Stream error ${res.status}. Coba lagi.`);
  const text = await res.text();
  if (text.trimStart().startsWith("#EXTM3U")) return url;

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Stream bukan m3u8 yang bisa diputar.");
  }
  const found = findM3u8(json);
  if (!found) throw new Error("Stream tidak memuat URL m3u8.");
  return found;
}
