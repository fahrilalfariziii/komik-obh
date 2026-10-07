export const SANKA_BASE = "https://www.sankavollerei.web.id/comic";

export type SankaSearchItem = {
  title: string;
  slug: string;
  thumbnail: string;
  type?: string;
  genre?: string;
};

export type SankaChapterEntry = {
  chapter: string;
  slug: string;
  date?: string;
};

export type SankaComicDetail = {
  slug: string;
  title: string;
  image: string;
  synopsis: string;
  metadata?: {
    type?: string;
    author?: string;
    status?: string;
  };
  genres?: Array<{ name: string }>;
  chapters: SankaChapterEntry[];
};

export type SankaChapter = {
  manga_title: string;
  chapter_title: string;
  navigation: {
    previousChapter: string | null;
    nextChapter: string | null;
    chapterList: string;
  };
  images: string[];
  imagesproxy: string[];
};

export function searchUrl(q: string) {
  return `${SANKA_BASE}/search?q=${encodeURIComponent(q)}`;
}

export function comicUrl(slug: string) {
  return `${SANKA_BASE}/comic/${encodeURIComponent(slug)}`;
}

export function chapterUrl(slug: string) {
  return `${SANKA_BASE}/chapter/${encodeURIComponent(slug)}`;
}

export function pickPages(images: string[], imagesproxy: string[], useProxy: boolean) {
  return useProxy ? imagesproxy : images;
}

export function slugFromLink(link: string): string {
  const parts = link.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] ?? link;
}

export type SankaHomeItem = {
  title: string;
  link: string;
  image: string;
  chapter?: string;
  time_ago?: string;
};

export function friendlySankaError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  if (/fetch failed|ENOTFOUND|EAI_AGAIN|ECONNRESET|certificate|SSL/i.test(raw)) {
    return `Tidak bisa mencapai sankavollerei.web.id (${raw}). Periksa koneksi lalu coba lagi.`;
  }
  return raw;
}

async function sankaFetch<T>(url: string, revalidate: number): Promise<T> {
  let res;
  try {
    res = await fetch(url, {
      next: { revalidate },
      headers: { "User-Agent": "komik-reader/0.1" },
    });
  } catch (e) {
    throw new Error(friendlySankaError(e));
  }
  if (res.status === 429) {
    throw new Error("Rate limit API 30/menit tercapai. Tunggu sebentar lalu coba lagi.");
  }
  if (!res.ok) {
    throw new Error(`API komik error ${res.status}. Coba lagi.`);
  }
  return res.json() as Promise<T>;
}

export function searchComics(q: string) {
  return sankaFetch<{ data?: SankaSearchItem[] }>(searchUrl(q), 300);
}

export function getComicDetail(slug: string) {
  return sankaFetch<SankaComicDetail>(comicUrl(slug), 3600);
}

export function getChapter(slug: string) {
  return sankaFetch<SankaChapter>(chapterUrl(slug), 600);
}

export function getPopular() {
  return sankaFetch<{ comics?: SankaHomeItem[] }>(`${SANKA_BASE}/populer`, 900);
}

export function getLatest() {
  return sankaFetch<{ comics?: SankaHomeItem[] }>(`${SANKA_BASE}/terbaru`, 300);
}
