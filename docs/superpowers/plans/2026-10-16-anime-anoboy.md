# Anoboy Tranche Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tambah sumber Anoboy ke subsystem anime dengan fallback otomatis (search paralel + badge, route prefix `/anime/<source>/...`).

**Architecture:** Adaptor per sumber (`lib/anime-anoboy.ts` mirror `lib/anime.ts` yang tak tersentuh) + kontrak ternormalisasi (`lib/anime-sources.ts`: `AnimeResult`, `AnimeDetailView`, `AnimeWatchView`) sehingga page render murni dari view dan jalur Otakudesu lama tidak berubah perilaku.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, Vitest 2, Clerk gate `requireOwner`.

**Spec:** `docs/superpowers/specs/2026-10-16-anime-anoboy-design.md`

## Global Constraints

- `lib/anime.ts` tidak diubah; seluruh alur Otakudesu lama tetap identik.
- Setiap halaman `/anime*` memanggil `await requireOwner()`.
- Tidak ada dependensi baru; tidak ada token warna baru; dark-only.
- Cache: Anoboy detail 3600, search/episode 300 (sama seperti Otakudesu).
- Search tetap submit manual (tanpa live-search); 1 pencarian = 2 request paralel.
- Judul dari Anoboy selalu `.trim()` (upstream mengandung whitespace/newline mentah).
- `npm test` dan `npm run build` harus hijau.

## Review Focus

- Respons Anoboy tanpa envelope `data` (field di root) harus dibaca adaptor dengan benar, bukan `undefined` — diuji di Task 2 (normalisasi search item mentah).
- Judul ber-whitespace/newline harus tampil rapi (trim) — diuji di Task 2.
- Field `episode` Anoboy berupa string ("1180") vs Otakudesu number — view memakai string seragam — diuji di Task 2.
- Slug legacy yang sama dengan id sumber (`anoboy`/`otakudesu`) harus ke `/anime`, bukan ke detail — diuji di Task 2 (`legacySlugTarget`).
- Satu sumber search gagal/timeout harus menyisakan hasil sumber lain + flag partial — diuji di Task 2 (`searchAllAnime`).

---

### Task 1: lib Anoboy + unit test (fondasi)

**Files:**
- Create: `lib/anime-anoboy.ts`
- Create: `tests/anime-anoboy.test.ts`

**Interfaces:**
- Consumes: pola `lib/anime.ts` (`animeFetch` + `friendlyAnimeError` + `next.revalidate`).
- Produces: `ANOBOY_BASE`, `anoboySearchUrl(kw)`, `anoboyDetailUrl(slug)`, `anoboyEpisodeUrl(slug)`, `slugFromAnoboyHref(href)`, `searchAnoboy(q)`, `getAnoboyDetail(slug)`, `getAnoboyEpisode(slug)`, `friendlyAnoboyError(e)`, tipe `AnoboySearchItem`, `AnoboyDetail`, `AnoboyEpisode` — dipakai Task 2.

- [ ] **Step 1: Tulis test gagal untuk builder + helper**

```ts
import { describe, it, expect } from "vitest";
import {
  anoboySearchUrl,
  anoboyDetailUrl,
  anoboyEpisodeUrl,
  slugFromAnoboyHref,
  friendlyAnoboyError,
} from "../lib/anime-anoboy";

describe("anoboy urls", () => {
  it("search memakai path param + page", () => {
    expect(anoboySearchUrl("one piece")).toBe(
      "https://www.sankavollerei.web.id/anime/anoboy/search/one%20piece?page=1"
    );
  });
  it("detail dari slug", () => {
    expect(anoboyDetailUrl("one-piece")).toBe(
      "https://www.sankavollerei.web.id/anime/anoboy/anime/one-piece"
    );
  });
  it("episode dari slug", () => {
    expect(anoboyEpisodeUrl("one-piece-episode-1180-subtitle-indonesia")).toBe(
      "https://www.sankavollerei.web.id/anime/anoboy/episode/one-piece-episode-1180-subtitle-indonesia"
    );
  });
});

describe("slugFromAnoboyHref", () => {
  it("slug polos", () => {
    expect(slugFromAnoboyHref("one-piece")).toBe("one-piece");
  });
  it("url penuh upstream", () => {
    expect(slugFromAnoboyHref("https://anoboy.be/one-piece-episode-1180-subtitle-indonesia/")).toBe(
      "one-piece-episode-1180-subtitle-indonesia"
    );
  });
  it("membuang query dan hash", () => {
    expect(slugFromAnoboyHref("/anime/x-sub-indo?y=1")).toBe("x-sub-indo");
    expect(slugFromAnoboyHref("/anime/x-sub-indo#e")).toBe("x-sub-indo");
  });
});

describe("friendlyAnoboyError", () => {
  it("fetch failed menyebut sumber", () => {
    expect(friendlyAnoboyError(new TypeError("fetch failed"))).toContain("sankavollerei");
  });
  it("429 menyebut 45/menit", () => {
    expect(friendlyAnoboyError(new Error("429"))).toContain("45/menit");
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal (modul belum ada)**

Run: `npx vitest run tests/anime-anoboy.test.ts`
Expected: FAIL `Failed to resolve import ../lib/anime-anoboy`.

- [ ] **Step 3: Implementasi minimal `lib/anime-anoboy.ts`**

```ts
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
```

- [ ] **Step 4: Jalankan test sampai hijau**

Run: `npx vitest run tests/anime-anoboy.test.ts`
Expected: PASS semua (9 test).

- [ ] **Step 5: Commit fondasi**

```bash
git add lib/anime-anoboy.ts tests/anime-anoboy.test.ts
git commit -m "feat(anime): tambah lib Anoboy + unit test"
```

---

### Task 2: Kontrak sumber + normalisasi + search gabungan

**Files:**
- Create: `lib/anime-sources.ts`
- Create: `tests/anime-sources.test.ts`

**Interfaces:**
- Consumes: Task 1 (`searchAnoboy`, `AnoboySearchItem`, `AnoboyDetail`, `AnoboyEpisode`); `lib/anime.ts` (`searchAnime`, `getServerUrl`, `pickStreamUrl`, tipe `AnimeDetail`, `AnimeEpisode` — TAK diubah).
- Produces: `SourceId`, `KNOWN_SOURCES`, `AnimeResult`, `AnimeDetailView`, `AnimeWatchView`, `searchAllAnime(q, timeoutMs?)`, `fromOtakudesuDetail(d)`, `fromAnoboyDetail(d)`, `fromOtakudesuEpisode(e)`, `fromAnoboyEpisode(e)`, `resolveOtakudesuStream(ep, serverId)`, `legacySlugTarget(slug)` — dipakai Task 3/4/5.

- [ ] **Step 1: Tulis test gagal (mapper + gabungan + redirect)**

```ts
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  fromAnoboyDetail,
  fromAnoboyEpisode,
  fromOtakudesuDetail,
  legacySlugTarget,
  searchAllAnime,
  type AnimeResult,
} from "../lib/anime-sources";

afterEach(() => {
  vi.unstubAllGlobals();
});

const anoboyItem = {
  title: "\n  One Piece: Gyojin Tou-hen  ",
  slug: "one-piece-gyojin-tou-hen",
  poster: "https://anoboy.be/x.jpg",
  status: "Completed",
  type: "TV",
};

const anoboyDetail = {
  title: "One Piece",
  poster: "https://anoboy.be/y.jpg",
  synopsis: "  Luffy berlayar.  ",
  info: { status: "Ongoing", studio: "Toei Animation", released: "1999", duration: "24 min.", type: "TV" },
  genres: [{ name: " Action ", slug: "action" }],
  episode_list: [{ slug: "one-piece-episode-1180-subtitle-indonesia", title: "One Piece Episode 1180 Subtitle Indonesia", episode: "1180", release_date: "September 26, 2026" }],
};

const anoboyEpisode = {
  title: "One Piece Episode 1180 Subtitle Indonesia",
  streams: [{ name: "Stream Utama", url: "https://stream/x" }],
  downloads: [],
};

const otakudesuDetail = {
  title: "Tensei S2",
  poster: "https://otakudesu.blog/z.jpg",
  type: "TV",
  status: "Ongoing",
  score: "7.51",
  studios: "C2C",
  duration: "24 Menit",
  aired: "Okt 01, 2026",
  synopsis: { paragraphs: ["Paragraf satu.", "Paragraf dua."], connections: [] },
  genreList: [{ title: "Action", genreId: "action", href: "/anime/genre/action", otakudesuUrl: "" }],
  episodeList: [{ title: "Eps 3", eps: 3, date: "15 Oktober,2026", episodeId: "tskd-s2-episode-3-sub-indo", href: "", otakudesuUrl: "" }],
  recommendedAnimeList: [{ title: "R", poster: "p", animeId: "r-id", href: "", otakudesuUrl: "" }],
};

function stubFetch(handler: (url: string) => unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => ({
      ok: true,
      status: 200,
      json: async () => handler(url),
    }))
  );
}

describe("normalisasi Anoboy", () => {
  it("item search mentah jadi AnimeResult benar", async () => {
    stubFetch(() => ({ anime_list: [anoboyItem] }));
    const { results } = await searchAllAnime("one piece", 50);
    const ano = results.find((r: AnimeResult) => r.source === "anoboy");
    expect(ano?.title).toBe("One Piece: Gyojin Tou-hen");
    expect(ano?.detailHref).toBe("/anime/anoboy/one-piece-gyojin-tou-hen");
    expect(ano?.meta).toContain("TV");
  });
  it("detail Anoboy jadi view benar", () => {
    const v = fromAnoboyDetail(anoboyDetail);
    expect(v.title).toBe("One Piece");
    expect(v.synopsis).toBe("Luffy berlayar.");
    expect(v.serverGroups ?? []).toEqual([]);
    expect(v.episodes[0]).toMatchObject({ id: "one-piece-episode-1180-subtitle-indonesia", eps: "1180" });
    expect(v.genres[0]).toEqual({ id: "action", title: "Action" });
  });
  it("episode Anoboy jadi view benar", () => {
    const v = fromAnoboyEpisode(anoboyEpisode);
    expect(v.defaultStream).toBe("https://stream/x");
    expect(v.serverGroups).toEqual([]);
    expect(v.detailHref).toBeNull();
  });
});

describe("normalisasi Otakudesu", () => {
  it("detail jadi view dengan chips dan episode", () => {
    const v = fromOtakudesuDetail(otakudesuDetail);
    expect(v.chips).toContain("Skor 7.51");
    expect(v.synopsis).toContain("Paragraf satu.");
    expect(v.episodes[0].id).toBe("tskd-s2-episode-3-sub-indo");
    expect(v.recommendations[0].detailHref).toBe("/anime/otakudesu/r-id");
  });
});

describe("searchAllAnime", () => {
  it("satu sumber gagal, hasil lain utuh + flag partial", async () => {
    stubFetch((url: string) => {
      if (url.includes("/anoboy/")) throw new Error("500");
      return { data: { animeList: [{ title: "T", poster: "p", animeId: "t-id", href: "" }] } };
    });
    const { results, partial } = await searchAllAnime("x", 50);
    expect(results.length).toBe(1);
    expect(results[0].source).toBe("otakudesu");
    expect(partial).toEqual({ otakudesu: false, anoboy: true });
  });
  it("timeout diperlakukan gagal", async () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
    const { results, partial } = await searchAllAnime("x", 20);
    expect(results).toEqual([]);
    expect(partial).toEqual({ otakudesu: true, anoboy: true });
  });
  it("keduanya kosong jadi list kosong", async () => {
    stubFetch((url: string) =>
      url.includes("/anoboy/") ? { anime_list: [] } : { data: { animeList: [] } }
    );
    const { results } = await searchAllAnime("zzz", 50);
    expect(results).toEqual([]);
  });
});

describe("legacySlugTarget", () => {
  it("slug id sumber ke /anime", () => {
    expect(legacySlugTarget("anoboy")).toBe("/anime");
    expect(legacySlugTarget("otakudesu")).toBe("/anime");
  });
  it("slug biasa ke prefix otakudesu", () => {
    expect(legacySlugTarget("tensei-deshita-s2-sub-indo")).toBe(
      "/anime/otakudesu/tensei-deshita-s2-sub-indo"
    );
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npx vitest run tests/anime-sources.test.ts`
Expected: FAIL `Failed to resolve import ../lib/anime-sources`.

- [ ] **Step 3: Implementasi minimal `lib/anime-sources.ts`**

```ts
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
    return { url: ep.defaultStreamingUrl, notice: "Server pilihan tidak dikenal, memakai stream default." };
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
    settle(searchAnime(q).then((r) => r.data?.animeList ?? []), timeoutMs),
    settle(searchAnoboy(q).then((r) => r.anime_list ?? []), timeoutMs),
  ]);
  const results: AnimeResult[] = [];
  if (otu.ok) {
    for (const a of otu.v.slice(0, 12)) {
      results.push({
        source: "otakudesu",
        id: a.animeId,
        title: trim(a.title) || a.title,
        cover: a.poster,
        meta: [a.status, a.score ? `Skor ${a.score}` : undefined].filter(Boolean).join(" • ") || undefined,
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
```

- [ ] **Step 4: Jalankan test sampai hijau**

Run: `npx vitest run tests/anime-sources.test.ts`
Expected: PASS semua (10 test).

- [ ] **Step 5: Commit kontrak**

```bash
git add lib/anime-sources.ts tests/anime-sources.test.ts
git commit -m "feat(anime): kontrak multi-sumber + normalisasi Anoboy + search gabungan"
```

---

### Task 3: Detail pindah ke prefix + redirect legacy

**Files:**
- Create: `app/anime/[source]/[slug]/page.tsx` (render murni dari `AnimeDetailView`; salin struktur visual dari `app/anime/[slug]/page.tsx` saat ini)
- Modify (overwrite): `app/anime/[slug]/page.tsx` → redirect via `legacySlugTarget`
- Modify: `components/AnimeCard.tsx` — tambah prop opsional `href?: string` (default `/anime/${id}`)

**Interfaces:**
- Consumes: Task 2 (`isSourceId`, `fromOtakudesuDetail`, `fromAnoboyDetail`, `getOtakudesuDetail`, `getAnoboyDetail`, `legacySlugTarget`).
- Produces: route `/anime/:source/:slug`, redirect legacy — dipakai Task 5 (cari mengarah ke `detailHref`).

- [ ] **Step 1: Tambah prop `href` di `AnimeCard.tsx`**

Ubah signature + `Link href`:

```tsx
export default function AnimeCard({
  id,
  title,
  cover,
  meta,
  badge,
  href,
}: {
  id: string;
  title: string;
  cover: string;
  meta?: string;
  badge?: string;
  href?: string;
}) {
  return (
    <Link
      href={href ?? `/anime/${id}`}
```

Sisanya identik. Verifikasi: `npx tsc --noEmit` → bersih (semua pemanggil lama tanpa `href` tetap kompilasi).

- [ ] **Step 2: Buat `app/anime/[source]/[slug]/page.tsx`**

Struktur visual disalin persis dari `app/anime/[slug]/page.tsx` yang ada, dengan penggantian:
- `params: Promise<{ source: string; slug: string }>`; `if (!isSourceId(source))` → `StatePanel` "Sumber tidak dikenal".
- `source === "otakudesu"` → `fromOtakudesuDetail(await getOtakudesuDetail(slug))`; else → `fromAnoboyDetail(await getAnoboyDetail(slug))`.
- Semua akses `detail.*` diganti `view.*`: `chips` (siap pakai), `metaLine` (satu `<p>` bila ada), `genres` (`{id,title}`; link hanya bila `source === "otakudesu"` → `/anime/genre/${id}`, else render `span` statis dengan gaya sama), `synopsis` (string; kosong → fallback "Sinopsis belum tersedia dari sumber."), `episodes` (`{id,title,eps,date}` → link `view.watchHref(e.id)`), rekomendasi (`AnimeCard` + `href={r.detailHref}`), tombol nonton terbaru → `view.watchHref(episodes[0].id)` label `Ep {episodes[0].eps}`.
- Breadcrumb: `[{ Beranda: / }, { Anime: /anime }, { view.title }]`.

- [ ] **Step 3: Overwrite `app/anime/[slug]/page.tsx` jadi redirect**

```tsx
import { redirect } from "next/navigation";
import { legacySlugTarget } from "@/lib/anime-sources";

export default async function LegacyAnimeRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(legacySlugTarget(slug));
}
```

- [ ] **Step 4: Verifikasi + commit**

Run: `npx tsc --noEmit` → bersih. Run: `npm test` → hijau.

```bash
git add "app/anime/[source]/[slug]/page.tsx" "app/anime/[slug]/page.tsx" components/AnimeCard.tsx
git commit -m "feat(anime): detail pindah ke prefix sumber + redirect legacy"
```

---

### Task 4: Watch pindah ke prefix + redirect legacy

**Files:**
- Create: `app/anime/[source]/watch/[episodeId]/page.tsx`
- Modify (overwrite): `app/anime/watch/[episodeId]/page.tsx` → redirect (pertahankan query `server`/`quality`)

**Interfaces:**
- Consumes: Task 2 (`isSourceId`, `fromOtakudesuEpisode`, `fromAnoboyEpisode`, `getOtakudesuEpisode`, `getAnoboyEpisode`, `resolveOtakudesuStream`).
- Produces: route `/anime/:source/watch/:episodeId` — dipakai Task 5 (link dari cari/detail).

- [ ] **Step 1: Buat `app/anime/[source]/watch/[episodeId]/page.tsx`**

Struktur visual disalin persis dari `app/anime/watch/[episodeId]/page.tsx` yang ada, dengan penggantian:
- `params: Promise<{ source: string; episodeId: string }>`; source tak dikenal → `StatePanel`.
- `otakudesu`: `ep = await getOtakudesuEpisode(episodeId)`; `view = fromOtakudesuEpisode(ep)`; stream via `resolveOtakudesuStream(ep, wanted)` (wanted = `sp.server ?? ""`); server picker dari `view.serverGroups` (`quality` grup, link `?server=<id>&quality=<q>`); prev/next dari `view.prevId/view.nextId` (`/anime/otakudesu/watch/<id>`); download dari `view.downloads`; episode lain dari `view.episodes`.
- `anoboy`: `view = fromAnoboyEpisode(await getAnoboyEpisode(episodeId))`; `defaultStream` kosong → `StatePanel` "Tidak ada stream untuk episode ini"; server picker disembunyikan (`serverGroups` kosong); prev/next disembunyikan (null); download/episode-lain mengikuti view (disembunyikan bila kosong).
- Iframe + notice + tombol + link "← Detail anime" hanya bila `view.detailHref` non-null (Anoboy: disembunyikan).
- Breadcrumb: `[Beranda /, Anime /anime, view.title]`.

- [ ] **Step 2: Overwrite legacy watch jadi redirect (pertahankan query)**

```tsx
import { redirect } from "next/navigation";

export default async function LegacyWatchRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ episodeId: string }>;
  searchParams: Promise<{ server?: string; quality?: string }>;
}) {
  const { episodeId } = await params;
  const sp = await searchParams;
  const qs = new URLSearchParams({
    ...(sp.server ? { server: sp.server } : {}),
    ...(sp.quality ? { quality: sp.quality } : {}),
  }).toString();
  redirect(`/anime/otakudesu/watch/${episodeId}${qs ? `?${qs}` : ""}`);
}
```

- [ ] **Step 3: Verifikasi + commit**

Run: `npx tsc --noEmit` → bersih. Run: `npm test` → hijau.

```bash
git add "app/anime/[source]/watch/[episodeId]/page.tsx" "app/anime/watch/[episodeId]/page.tsx"
git commit -m "feat(anime): watch pindah ke prefix sumber + redirect legacy"
```

---

### Task 5: Cari gabungan + badge

**Files:**
- Modify: `app/anime/cari/page.tsx` (ganti `searchAnime` → `searchAllAnime`, render `detailHref` + `badge`)

**Interfaces:**
- Consumes: Task 2 (`searchAllAnime`); Task 3 (`AnimeCard` prop `href`).
- Produces: `/anime/cari` gabungan — tidak ada konsumen hilir.

- [ ] **Step 1: Tulis ulang pencarian memakai `searchAllAnime`**

Ganti blok fetch:

```tsx
import { searchAllAnime } from "@/lib/anime-sources";

let list: AnimeResult[] = [];
let partial = { otakudesu: false, anoboy: false };
try {
  const res = await searchAllAnime(q);
  list = res.results;
  partial = res.partial;
} catch {
  return ( ...StatePanel "Pencarian gagal"... );
}
```

Header jumlah: `{list.length} hasil`. Bila `partial.otakudesu || partial.anoboy` tampilkan notice:
```tsx
<p role="status" className="mt-2 text-xs text-[var(--text-muted)]">
  {(partial.otakudesu ? "Otakudesu" : "Anoboy") + " tidak merespons, menampilkan hasil yang tersedia."}
</p>
```

Grid memakai `AnimeCard` penuh:

```tsx
{list.map((a) => (
  <AnimeCard key={`${a.source}-${a.id}`} id={a.id} title={a.title} cover={a.cover} meta={a.meta} badge={a.badge} href={a.detailHref} />
))}
```

State kosong: judul `StatePanel` menjadi `Tidak ada hasil untuk "${q}" di Otakudesu maupun Anoboy`, pesan "Coba ejaan lain, judul Inggris, atau kata kunci lebih singkat."

- [ ] **Step 2: Verifikasi + commit**

Run: `npx tsc --noEmit` → bersih. Run: `npm test` → hijau.

```bash
git add app/anime/cari/page.tsx
git commit -m "feat(anime): cari gabungan Otakudesu + Anoboy + badge sumber"
```

---

### Task 6: Verifikasi akhir

**Files:** tidak ada (cek saja).

- [ ] **Step 1: Test + build hijau**

Run: `npm test`
Expected: PASS (sebelumnya 30, kini +9 +10 = 49).

Run: `npm run build`
Expected: PASS; route `/anime/[source]/[slug]`, `/anime/[source]/watch/[episodeId]` terdaftar; route legacy tetap ada.

- [ ] **Step 2: Cek regresi Otakudesu + alur Anoboy end-to-end**

`/anime` → detail Otakudesu lama (bandingkan tampilan sebelum/sesudah: identik) → watch + ganti server → URL lama `/anime/<slug>` redirect ke `/anime/otakudesu/<slug>` → cari "one piece" → badge Anoboy → `/anime/anoboy/one-piece` → watch tanpa pilih server → `/anime/jadwal`, `/anime/genre/action` tetap Otakudesu.
