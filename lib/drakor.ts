export const DRAKOR_BASE = "https://indocast.site/api/drakorid";

export type DrakorItem = {
  id: string;
  url?: string;
  imageUrl: string;
  title: string;
  episode?: string;
  rank?: number;
};

export type DrakorSearchItem = {
  id: string;
  slug: string;
  title: string;
  poster: string;
};

export type DrakorKategori = {
  id: string;
  url?: string;
  title: string;
  count?: number;
};

export type DrakorCast = { name: string; url?: string; role?: string };
export type DrakorEpisodeEntry = { episode: string; number: number };

export type DrakorDetail = {
  id: string;
  slug: string;
  title: string;
  poster: string;
  synopsis?: string;
  details?: Record<string, string>;
  cast?: DrakorCast[];
  episodes?: DrakorEpisodeEntry[];
};

export type DrakorPlay = {
  id: string;
  episode: number;
  quality: number;
  format: string;
  vid_url: string;
  vid_url_proxy: string;
};

export function ongoingUrl(page = 1) {
  return `${DRAKOR_BASE}/ongoing?page=${page}`;
}
export function terbaruUrl(page = 1) {
  return `${DRAKOR_BASE}/terbaru?page=${page}`;
}
export function trendingUrl() {
  return `${DRAKOR_BASE}/trending`;
}
export function cariUrl(q: string, page = 1) {
  return `${DRAKOR_BASE}/cari?q=${encodeURIComponent(q)}&page=${page}`;
}
export function kategoriUrl() {
  return `${DRAKOR_BASE}/kategori`;
}
export function kategoriDetailUrl(slug: string, page = 1) {
  return `${DRAKOR_BASE}/kategori/detail?slug=${encodeURIComponent(slug)}&page=${page}`;
}
export function detailUrl(slug: string) {
  return `${DRAKOR_BASE}/details?slug=${encodeURIComponent(slug)}`;
}
export function playUrl() {
  return `${DRAKOR_BASE}/play`;
}

function apiKey(): string {
  const key = process.env.DRAKOR_API_KEY ?? "";
  if (!key) throw new Error("DRAKOR_API_KEY belum dikonfigurasi di .env.");
  return key;
}

type Envelope<T> = { code: number; message: string; data: T };

async function drakorFetch<T>(
  url: string,
  revalidate: number,
  init?: { method: string; body: string }
): Promise<T> {
  let res;
  try {
    res = await fetch(url, {
      ...(init ? { method: init.method, body: init.body } : {}),
      next: { revalidate },
      headers: {
        "x-api-key": apiKey(),
        ...(init ? { "Content-Type": "application/json" } : {}),
      },
    });
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    throw new Error(`Tidak bisa mencapai indocast.site (${raw}). Periksa koneksi lalu coba lagi.`);
  }
  if (!res.ok) {
    throw new Error(`API drakor error ${res.status}. Coba lagi.`);
  }
  const json = (await res.json()) as Envelope<T>;
  if (json.code !== 0) {
    throw new Error(json.message || "API drakor mengembalikan error.");
  }
  return json.data;
}

export function getOngoing(page = 1) {
  return drakorFetch<{ page: number; total: number; items: DrakorItem[] }>(
    ongoingUrl(page),
    300
  );
}

export function getTerbaru(page = 1) {
  return drakorFetch<{ page: number; total: number; items: DrakorItem[] }>(
    terbaruUrl(page),
    300
  );
}

export function getTrending() {
  return drakorFetch<{ hari_ini: DrakorItem[]; minggu_ini: DrakorItem[]; bulan_ini: DrakorItem[] }>(
    trendingUrl(),
    900
  );
}

export function searchDrakor(q: string, page = 1) {
  return drakorFetch<{
    success: boolean;
    query: string;
    pagination: { currentPage: number; hasNextPage: boolean };
    total: number;
    items: DrakorSearchItem[];
  }>(cariUrl(q, page), 300);
}

export function getKategori() {
  return drakorFetch<{ total: number; items: DrakorKategori[] }>(kategoriUrl(), 3600);
}

export function getKategoriDetail(slug: string, page = 1) {
  return drakorFetch<{ kategori: string; page: number; total: number; items: DrakorItem[] }>(
    kategoriDetailUrl(slug, page),
    300
  );
}

export function getDetail(slug: string) {
  return drakorFetch<DrakorDetail>(detailUrl(slug), 3600).then((d) => {
    if (!d.title) throw new Error("Detail drakor tidak ditemukan.");
    return d;
  });
}

export function playDrakor(id: string, episode: number | string, quality = "720") {
  return drakorFetch<DrakorPlay>(
    playUrl(),
    0,
    { method: "POST", body: JSON.stringify({ id, episode: String(episode), quality }) }
  ).then((d) => {
    if (!d.vid_url && !d.vid_url_proxy) throw new Error("Tidak ada stream untuk episode ini.");
    return d;
  });
}
