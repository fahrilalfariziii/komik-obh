# Anime Watch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menambah subsystem nonton anime Otakudesu di bawah `/anime` tanpa mengubah perilaku komik.

**Architecture:** Mirror pola komik: `lib/anime.ts` seperti `lib/sanka.ts`, Server Component per route, player resolve server-side via `?server=`, link-based server picker tanpa client fetch.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, Vitest 2, Clerk gate `requireOwner`.

**Spec:** `docs/superpowers/specs/2026-10-15-anime-watch-design.md`

## Global Constraints

- Jangan ubah perilaku komik: route `/`, `/manga/*`, `/chapter/*`, `/search`, `/peringkat` tetap sama.
- Setiap halaman `/anime*` memanggil `await requireOwner()` seperti halaman komik.
- Tidak ada dependensi baru; tidak ada token warna baru; dark-only mengikuti `app/globals.css`.
- Ikon baru mengikuti stroke 1.75 seperti `components/Icon.tsx`.
- Cache fetch: home 300, ongoing/tamat 300, detail 3600, episode 300, server 600, schedule 900, search 300, genre 300.
- Rate limit 45/menit: hanya resolve 1 server yang dipilih, tidak prefetch semua server.
- Iframe memakai `title`, `allowFullScreen`, `aspect-video`; link download memakai `target="_blank" rel="noopener"`.
- `npm test` dan `npm run build` harus hijau.

## Review Focus

- Synopsis kosong (`paragraphs: []`) harus tampil fallback, bukan blank/ crash — diuji di Task 5.
- `serverId` query yang tidak ada di daftar (usil/manual) harus fallback ke default + notice — diuji di Task 6.
- `pagination: null` dari API harus sembunyikan pager tanpa crash — diuji di Task 4.
- Slug ber-encoding (`bang-dream-yume%e2%88%9emita-sub-indo`) harus lolos `encodeURIComponent` sekali, tidak double-encode — diuji di Task 1.
- Keyword search dengan spasi/simbol (`one piece`, `/Re:Zero`) harus di-encode via `encodeURIComponent` — diuji di Task 1.

---

### Task 1: lib anime + unit test (fondasi)

**Files:**
- Create: `lib/anime.ts`
- Create: `tests/anime.test.ts`

**Interfaces:**
- Consumes: pola `lib/sanka.ts:80-97` (`sankaFetch` + `friendlySankaError` + `next.revalidate`).
- Produces: `ANIME_BASE`, `animeHomeUrl()`, `ongoingUrl(page)`, `completeUrl(page)`, `animeDetailUrl(slug)`, `episodeUrl(slug)`, `serverUrl(id)`, `animeSearchUrl(kw)`, `scheduleUrl()`, `genreUrl(slug,page)`, `getAnimeHome()`, `getOngoing(page)`, `getComplete(page)`, `getAnimeDetail(slug)`, `getEpisode(slug)`, `getServerUrl(id)`, `searchAnime(kw)`, `getSchedule()`, `getGenre(slug,page)`, `slugFromAnimeHref(href)`, `pickStreamUrl(defaultUrl,resolvedUrl,serverId)`, `friendlyAnimeError(e)` — dipakai Task 4/5/6.

- [ ] **Step 1: Tulis test gagal untuk builder + helper**

```ts
import { describe, it, expect } from "vitest";
import {
  animeHomeUrl,
  ongoingUrl,
  completeUrl,
  animeDetailUrl,
  episodeUrl,
  serverUrl,
  animeSearchUrl,
  scheduleUrl,
  genreUrl,
  slugFromAnimeHref,
  pickStreamUrl,
  friendlyAnimeError,
} from "../lib/anime";

describe("anime urls", () => {
  it("home mengarah ke /anime/home", () => {
    expect(animeHomeUrl()).toBe("https://www.sankavollerei.web.id/anime/home");
  });
  it("ongoing membawa page", () => {
    expect(ongoingUrl(2)).toBe("https://www.sankavollerei.web.id/anime/ongoing-anime?page=2");
  });
  it("complete membawa page", () => {
    expect(completeUrl(1)).toBe("https://www.sankavollerei.web.id/anime/complete-anime?page=1");
  });
  it("detail encode sekali untuk slug ber-encoding", () => {
    expect(animeDetailUrl("bang-dream-yume∞mita-sub-indo")).toBe(
      "https://www.sankavollerei.web.id/anime/anime/bang-dream-yume%E2%88%9Emita-sub-indo"
    );
  });
  it("episode dari slug", () => {
    expect(episodeUrl("tskd-s2-episode-3-sub-indo")).toBe(
      "https://www.sankavollerei.web.id/anime/episode/tskd-s2-episode-3-sub-indo"
    );
  });
  it("server dari id", () => {
    expect(serverUrl("75BB8C-5-8B5u")).toBe(
      "https://www.sankavollerei.web.id/anime/server/75BB8C-5-8B5u"
    );
  });
  it("search encode spasi dan simbol", () => {
    expect(animeSearchUrl("Re:Zero one")).toBe(
      "https://www.sankavollerei.web.id/anime/search/Re%3AZero%20one"
    );
  });
  it("schedule tanpa param", () => {
    expect(scheduleUrl()).toBe("https://www.sankavollerei.web.id/anime/schedule");
  });
  it("genre membawa slug dan page", () => {
    expect(genreUrl("action", 2)).toBe(
      "https://www.sankavollerei.web.id/anime/genre/action?page=2"
    );
  });
});

describe("slugFromAnimeHref", () => {
  it("path relatif upstream", () => {
    expect(slugFromAnimeHref("/anime/anime/tensei-deshita-s2-sub-indo")).toBe(
      "tensei-deshita-s2-sub-indo"
    );
  });
  it("url penuh dengan trailing slash", () => {
    expect(
      slugFromAnimeHref("https://otakudesu.blog/anime/sasaki-pii-chan-s2-sub-indo/")
    ).toBe("sasaki-pii-chan-s2-sub-indo");
  });
  it("slug jadwal polos", () => {
    expect(slugFromAnimeHref("doumo-suki-majo-sub-indo")).toBe("doumo-suki-majo-sub-indo");
  });
});

describe("pickStreamUrl", () => {
  it("pakai resolved bila serverId cocok dan resolved ada", () => {
    expect(pickStreamUrl("def", "https://x/embed/1", "A")).toBe("https://x/embed/1");
  });
  it("fallback default bila serverId kosong", () => {
    expect(pickStreamUrl("def", "https://x/embed/1", "")).toBe("def");
  });
  it("fallback default bila resolved kosong", () => {
    expect(pickStreamUrl("def", "", "A")).toBe("def");
  });
});

describe("friendlyAnimeError", () => {
  it("fetch failed menyebut sumber", () => {
    expect(friendlyAnimeError(new TypeError("fetch failed"))).toContain("sankavollerei");
  });
  it("429 menyebut 45/menit", () => {
    expect(friendlyAnimeError(new Error("Rate limit API 45/menit tercapai"))).toContain("45/menit");
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal (modul belum ada)**

Run: `npx vitest run tests/anime.test.ts`
Expected: FAIL `Failed to resolve import ../lib/anime`.

- [ ] **Step 3: Implementasi minimal `lib/anime.ts`**

```ts
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

export function animeHomeUrl() { return `${ANIME_BASE}/home`; }
export function ongoingUrl(page = 1) { return `${ANIME_BASE}/ongoing-anime?page=${page}`; }
export function completeUrl(page = 1) { return `${ANIME_BASE}/complete-anime?page=${page}`; }
export function animeDetailUrl(slug: string) { return `${ANIME_BASE}/anime/${encodeURIComponent(slug)}`; }
export function episodeUrl(slug: string) { return `${ANIME_BASE}/episode/${encodeURIComponent(slug)}`; }
export function serverUrl(id: string) { return `${ANIME_BASE}/server/${encodeURIComponent(id)}`; }
export function animeSearchUrl(kw: string) { return `${ANIME_BASE}/search/${encodeURIComponent(kw)}`; }
export function scheduleUrl() { return `${ANIME_BASE}/schedule`; }
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
  if (/45\/menit|429/i.test(raw)) return "Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi.";
  if (/fetch failed|ENOTFOUND|EAI_AGAIN|ECONNRESET|certificate|SSL/i.test(raw)) {
    return `Tidak bisa mencapai sankavollerei.web.id (${raw}). Periksa koneksi lalu coba lagi.`;
  }
  return raw;
}

async function animeFetch<T>(url: string, revalidate: number): Promise<T> {
  let res;
  try {
    res = await fetch(url, { next: { revalidate }, headers: { "User-Agent": "komik-reader/0.1" } });
  } catch (e) {
    throw new Error(friendlyAnimeError(e));
  }
  if (res.status === 429) throw new Error("Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi.");
  if (!res.ok) throw new Error(`API anime error ${res.status}. Coba lagi.`);
  return res.json() as Promise<T>;
}

export function getAnimeHome() {
  return animeFetch<{ data?: { ongoing?: { animeList?: AnimeListItem[] }; completed?: { animeList?: AnimeListItem[] } } }>(animeHomeUrl(), 300);
}
export function getOngoing(page = 1) {
  return animeFetch<{ data?: { animeList?: AnimeListItem[] }; pagination?: { hasNextPage?: boolean; hasPrevPage?: boolean; nextPage?: number | null; prevPage?: number | null; currentPage?: number } | null }>(ongoingUrl(page), 300);
}
export function getComplete(page = 1) {
  return animeFetch<{ data?: { animeList?: AnimeListItem[] }; pagination?: { hasNextPage?: boolean; hasPrevPage?: boolean; nextPage?: number | null; prevPage?: number | null; currentPage?: number } | null }>(completeUrl(page), 300);
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
  return animeFetch<{ data?: { animeList?: AnimeListItem[] }; pagination?: { hasNextPage?: boolean; hasPrevPage?: boolean; nextPage?: number | null; prevPage?: number | null; currentPage?: number } | null }>(genreUrl(slug, page), 300);
}
```

- [ ] **Step 4: Jalankan test sampai hijau**

Run: `npx vitest run tests/anime.test.ts`
Expected: PASS semua.

- [ ] **Step 5: Commit fondasi**

```bash
git add lib/anime.ts tests/anime.test.ts
git commit -m "feat(anime): tambah lib Otakudesu + unit test"
```

---

### Task 2: Komponen UI anime + ikon play

**Files:**
- Create: `components/AnimeCard.tsx`
- Create: `components/AnimeSearchForm.tsx`
- Create: `components/AnimePlayer.tsx`
- Modify: `components/Icon.tsx` (tambah `play`)

**Interfaces:**
- Consumes: `MangaCard` styling (`components/MangaCard.tsx:19-56`), `HeroSearch` form (`components/HeroSearch.tsx:18-42`), Task 1 `AnimeQuality`.
- Produces: `AnimeCard({id,title,cover,meta,badge})`, `AnimeSearchForm({defaultValue})`, `AnimePlayer({streamUrl,title})`, ikon `play` — dipakai Task 4/5/6 dan navigasi.

- [ ] **Step 1: Tambah ikon `play` ke `Icon.tsx`**

Di `PATHS`, setelah `book`, tambah:
```ts
play: "M8 5.5v13l11-6.5Z",
```
Tidak masuk `FILLED` (tetap stroke 1.75 seperti ikon lain).

- [ ] **Step 2: Buat `components/AnimeCard.tsx`**

```tsx
import Link from "next/link";

export default function AnimeCard({
  id,
  title,
  cover,
  meta,
  badge,
}: {
  id: string;
  title: string;
  cover: string;
  meta?: string;
  badge?: string;
}) {
  return (
    <Link
      href={`/anime/${id}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)] focus-visible:border-[var(--accent)]"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover" />
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center bg-[var(--surface-raised)] text-xs text-[var(--text-muted)]">
          Tanpa cover
        </div>
      )}
      <div className="border-t border-[var(--border)] p-3">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {title}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          {meta ? <span className="truncate text-[var(--text-muted)]">{meta}</span> : <span />}
          {badge ? (
            <span className="shrink-0 rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[0.7rem] text-[var(--text-muted)]">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Buat `components/AnimeSearchForm.tsx` (GET ke `/anime/cari`)**

```tsx
import Icon from "@/components/Icon";

export default function AnimeSearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/anime/cari" method="get" role="search" className="flex gap-2">
      <div className="flex h-12 flex-1 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
        <Icon name="search" size={18} className="text-[var(--text-muted)]" />
        <label htmlFor="anime-search" className="sr-only">Cari anime</label>
        <input
          id="anime-search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Cari anime, misal Naruto"
          autoComplete="off"
          className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
        />
      </div>
      <button type="submit" className="h-12 shrink-0 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]">
        Cari
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Buat `components/AnimePlayer.tsx`**

```tsx
export default function AnimePlayer({ streamUrl, title }: { streamUrl: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-black">
      <iframe
        key={streamUrl}
        src={streamUrl}
        title={`Nonton ${title}`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="aspect-video w-full"
      />
    </div>
  );
}
```

- [ ] **Step 5: Verifikasi cepat + commit**

Run: `npx tsc --noEmit`
Expected: PASS (tidak ada error tipe).

```bash
git add components/AnimeCard.tsx components/AnimeSearchForm.tsx components/AnimePlayer.tsx components/Icon.tsx
git commit -m "feat(anime): tambah AnimeCard, SearchForm, Player, ikon play"
```

---

### Task 3: Navigasi Komik + Anime

**Files:**
- Modify: `components/Navbar.tsx:8-11` (tambah tab Anime)
- Modify: `components/BottomNav.tsx:7-11` (`grid-cols-3` → `grid-cols-4`, tambah tab)

**Interfaces:**
- Consumes: ikon `play` Task 2.
- Produces: tab `/anime` aktif via `pathname.startsWith("/anime")` — dipakai semua halaman Task 4/5/6.

- [ ] **Step 1: Tambah tab di `Navbar.tsx`**

Ubah `NAV` menjadi:
```ts
const NAV = [
  { href: "/", label: "Beranda", icon: "home" as const },
  { href: "/anime", label: "Anime", icon: "play" as const },
  { href: "/peringkat", label: "Peringkat", icon: "trophy" as const },
];
```
Tidak ubah logika `isActive` / sembunyi di `/chapter`.

- [ ] **Step 2: Tambah tab di `BottomNav.tsx`**

```ts
const ITEMS = [
  { href: "/", label: "Beranda", icon: "home" as const },
  { href: "/anime", label: "Anime", icon: "play" as const },
  { href: "/peringkat", label: "Peringkat", icon: "trophy" as const },
  { href: "/search", label: "Cari", icon: "search" as const },
];
```
Ubah `grid grid-cols-3` → `grid grid-cols-4`.

- [ ] **Step 3: Verifikasi visual + commit**

Run: `npm run dev`, buka `/` dan `/anime` (akan 404 sebelum Task 4 — wajar), pastikan tab Anime muncul dan `aria-current` benar.
```bash
git add components/Navbar.tsx components/BottomNav.tsx
git commit -m "feat(anime): tambah tab Anime di navbar atas dan bawah"
```

---

### Task 4: Home + list ongoing/tamat (dengan pagination null-safe)

**Files:**
- Create: `app/anime/page.tsx`
- Create: `app/anime/ongoing/page.tsx`
- Create: `app/anime/tamat/page.tsx`

**Interfaces:**
- Consumes: Task 1 (`getAnimeHome`, `getOngoing`, `getComplete`), Task 2 (`AnimeCard`, `AnimeSearchForm`).
- Produces: route `/anime`, `/anime/ongoing`, `/anime/tamat`.

- [ ] **Step 1: Buat `app/anime/page.tsx`**

Pola `app/page.tsx:12-18` (`allSettled`, `requireOwner`, `StatePanel` bila gagal total):
```tsx
import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import AnimeSearchForm from "@/components/AnimeSearchForm";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getAnimeHome, getSchedule } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export const metadata = { title: "Nonton Anime", description: "Nonton anime subtitle Indonesia: ongoing, tamat, dan jadwal rilis." };

export default async function AnimeHome() {
  await requireOwner();
  const [home, schedule] = await Promise.allSettled([getAnimeHome(), getSchedule()]);
  const ongoing = home.status === "fulfilled" ? home.value.data?.ongoing?.animeList ?? [] : [];
  const completed = home.status === "fulfilled" ? home.value.data?.completed?.animeList ?? [] : [];
  if (home.status === "rejected" || (!ongoing.length && !completed.length)) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Nonton Anime</h1>
        <div className="mt-6">
          <StatePanel icon="alert" title="Gagal memuat daftar anime" message={home.status === "rejected" ? String(home.reason instanceof Error ? home.reason.message : home.reason) : "Sumber anime tidak bisa dihubungi."} actionLabel="Coba lagi" actionHref="/anime" />
        </div>
      </main>
    );
  }
  const todayName = new Intl.DateTimeFormat("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" }).format(new Date());
  const todaySchedule = schedule.status === "fulfilled"
    ? (schedule.value.data ?? []).find((d) => d.day.toLowerCase() === todayName.toLowerCase())?.anime_list.slice(0, 6) ?? []
    : [];
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Nonton anime subtitle Indonesia</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">Ongoing, tamat, dan jadwal rilis harian.</p>
        <div className="mt-5"><AnimeSearchForm /></div>
      </section>
      <section className="mt-10" aria-labelledby="ongoing">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="ongoing" className="inline-flex items-center gap-2 text-lg font-semibold"><Icon name="play" size={18} className="text-[var(--accent)]" />Ongoing terbaru</h2>
          <Link href="/anime/ongoing" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline">Lihat semua</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {ongoing.slice(0, 10).map((a) => (
            <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} meta={a.episodes ? `Ep ${a.episodes}` : a.latestReleaseDate} badge={a.releaseDay} />
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="tamat">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="tamat" className="inline-flex items-center gap-2 text-lg font-semibold"><Icon name="check" size={18} className="text-[var(--accent)]" />Tamat</h2>
          <Link href="/anime/tamat" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline">Lihat semua</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {completed.slice(0, 10).map((a) => (
            <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} meta={a.score ? `Skor ${a.score}` : undefined} badge={a.episodes ? `${a.episodes} eps` : undefined} />
          ))}
        </div>
      </section>
      {todaySchedule.length ? (
        <section className="mt-12" aria-labelledby="jadwal-hari-ini">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="jadwal-hari-ini" className="inline-flex items-center gap-2 text-lg font-semibold"><Icon name="clock" size={18} className="text-[var(--accent)]" />Tayang hari ini ({todayName})</h2>
            <Link href="/anime/jadwal" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline">Jadwal seminggu</Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {todaySchedule.map((a) => (
              <AnimeCard key={a.slug} id={a.slug} title={a.title} cover={a.poster} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 2: Buat list generik `app/anime/ongoing/page.tsx` (null-safe pager)**

```tsx
import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getOngoing } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export const metadata = { title: "Anime Ongoing", description: "Daftar anime yang sedang tayang." };

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function OngoingPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireOwner();
  const sp = await searchParams;
  const page = normPage(sp.page);
  let list: Array<{ animeId: string; title: string; poster: string; episodes?: number; releaseDay?: string; latestReleaseDate?: string }> = [];
  let pagination: { hasNextPage?: boolean; hasPrevPage?: boolean; nextPage?: number | null; prevPage?: number | null } | null | undefined;
  try {
    const res = await getOngoing(page);
    list = res.data?.animeList ?? [];
    pagination = res.pagination;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel icon="alert" title="Gagal memuat ongoing" message={e instanceof Error ? e.message : "Coba lagi."} actionLabel="Kembali" actionHref="/anime" />
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight"><Icon name="play" size={22} className="text-[var(--accent)]" />Anime Ongoing</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Halaman {page}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} meta={a.episodes ? `Ep ${a.episodes}` : a.latestReleaseDate} badge={a.releaseDay} />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link href={`/anime/ongoing?page=${page - 1}`} className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]">← Sebelumnya</Link>
        ) : <span />}
        {pagination?.hasNextPage ? (
          <Link href={`/anime/ongoing?page=${pagination.nextPage ?? page + 1}`} className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]">Berikutnya →</Link>
        ) : <span className="text-xs text-[var(--text-muted)]">Halaman terakhir</span>}
      </nav>
    </main>
  );
}
```

- [ ] **Step 3: Duplikasi pola untuk `app/anime/tamat/page.tsx`** (ganti `getOngoing`→`getComplete`, judul "Anime Tamat", href `/anime/tamat?page=`). Isi kode penuh seperti Step 2, jangan referensi silang.

- [ ] **Step 4: Verifikasi + commit**

Run: `npm run dev` → buka `/anime`, `/anime/ongoing`, `/anime/ongoing?page=2`, `/anime/tamat`. Pastikan pager hilang di halaman terakhir (API `pagination: null` → teks "Halaman terakhir").
```bash
git add app/anime/page.tsx app/anime/ongoing/page.tsx app/anime/tamat/page.tsx
git commit -m "feat(anime): tambah home, ongoing, tamat + pagination"
```

---

### Task 5: Detail anime + genre (synopsis kosong-safe)

**Files:**
- Create: `app/anime/[slug]/page.tsx`
- Create: `app/anime/genre/[slug]/page.tsx`

**Interfaces:**
- Consumes: Task 1 (`getAnimeDetail`, `getGenre`), Task 2 (`AnimeCard`).
- Produces: route `/anime/:slug`, `/anime/genre/:slug`.

- [ ] **Step 1: Buat `app/anime/[slug]/page.tsx`**

```tsx
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getAnimeDetail } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireOwner();
  const { slug } = await params;
  let d;
  try {
    d = await getAnimeDetail(slug);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel icon="alert" title="Gagal memuat detail anime" message={e instanceof Error ? e.message : "Coba lagi."} actionLabel="Kembali ke anime" actionHref="/anime" />
      </main>
    );
  }
  const episodes = d.episodeList ?? [];
  const genres = d.genreList ?? [];
  const rec = d.recommendedAnimeList ?? [];
  const paras = d.synopsis?.paragraphs ?? [];
  const synopsis = paras.join("\n\n").trim();
  const chips = [d.type, d.status, d.score ? `Skor ${d.score}` : undefined].filter(Boolean) as string[];
  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb trail={[{ label: "Beranda", href: "/" }, { label: "Anime", href: "/anime" }, { label: d.title }]} />
      <section className="mt-4 flex flex-col gap-5 min-[480px]:flex-row">
        <div className="mx-auto w-40 shrink-0 min-[480px]:mx-0 min-[480px]:w-36">
          {d.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.poster} alt={d.title} className="w-full rounded-[var(--radius-card)] border border-[var(--border)] object-cover" />
          ) : null}
        </div>
        <div className="min-w-0 text-center min-[480px]:text-left">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">{d.title}</h1>
          {chips.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-2 min-[480px]:justify-start">
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-[var(--surface-raised)] px-2.5 py-1 text-xs">{c}</span>
              ))}
            </div>
          ) : null}
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {[d.studios, d.duration, d.aired].filter(Boolean).join(" • ")}
          </p>
          {episodes[0] ? (
            <div className="mt-5">
              <Link href={`/anime/watch/${episodes[0].episodeId}`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]">
                <Icon name="play" size={17} />Nonton terbaru<span className="text-xs font-normal opacity-70">Ep {episodes[0].eps}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>
      {genres.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Genre">
          {genres.map((g) => (
            <li key={g.genreId}>
              <Link href={`/anime/genre/${g.genreId}`} className="inline-flex min-h-[36px] items-center rounded-full bg-[var(--surface-raised)] px-3 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]">{g.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
      <section className="mt-6">
        <h2 className="mb-2 inline-flex items-center gap-2 text-lg font-semibold"><Icon name="info" size={18} className="text-[var(--accent)]" />Sinopsis</h2>
        {synopsis ? (
          <p className="prose-reader text-sm">{synopsis}</p>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Sinopsis belum tersedia dari sumber.</p>
        )}
      </section>
      <section className="mt-8" aria-labelledby="daftar-episode">
        <h2 id="daftar-episode" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold"><Icon name="layers" size={18} className="text-[var(--accent)]" />Daftar episode<span className="text-sm font-normal text-[var(--text-muted)]">({episodes.length})</span></h2>
        {episodes.length ? (
          <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
            {episodes.map((e) => (
              <li key={e.episodeId}>
                <Link href={`/anime/watch/${e.episodeId}`} className="flex min-h-[48px] items-center gap-3 px-3 py-2.5 hover:bg-[var(--surface-raised)]">
                  <span className="w-10 shrink-0 text-center text-xs font-semibold text-[var(--accent)] tabular-nums">{e.eps ?? "•"}</span>
                  <span className="min-w-0 flex-1 text-sm">{e.title}</span>
                  {e.date ? <span className="shrink-0 text-xs text-[var(--text-muted)]">{e.date}</span> : null}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Belum ada episode.</p>
        )}
      </section>
      {rec.length ? (
        <section className="mt-8" aria-labelledby="rekomendasi">
          <h2 id="rekomendasi" className="mb-3 text-lg font-semibold">Rekomendasi</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {rec.slice(0, 5).map((a) => (
              <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 2: Buat `app/anime/genre/[slug]/page.tsx`**

```tsx
import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import { getGenre } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  await requireOwner();
  const { slug } = await params;
  const sp = await searchParams;
  const page = normPage(sp.page);
  let list: Array<{ animeId: string; title: string; poster: string; score?: string; status?: string }> = [];
  let pagination: { hasNextPage?: boolean; nextPage?: number | null } | null | undefined;
  try {
    const res = await getGenre(slug, page);
    list = res.data?.animeList ?? [];
    pagination = res.pagination;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel icon="alert" title="Gagal memuat genre" message={e instanceof Error ? e.message : "Coba lagi."} actionLabel="Kembali" actionHref="/anime" />
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="text-2xl font-bold tracking-tight">Genre: <span className="text-[var(--accent)]">{slug}</span></h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Halaman {page} • {list.length} judul</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} meta={a.score ? `Skor ${a.score}` : a.status} />
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2">
        {page > 1 ? (
          <Link href={`/anime/genre/${slug}?page=${page - 1}`} className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]">← Sebelumnya</Link>
        ) : <span />}
        {pagination?.hasNextPage ? (
          <Link href={`/anime/genre/${slug}?page=${pagination.nextPage ?? page + 1}`} className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]">Berikutnya →</Link>
        ) : <span className="text-xs text-[var(--text-muted)]">Halaman terakhir</span>}
      </nav>
    </main>
  );
}
```

- [ ] **Step 3: Verifikasi synopsis kosong + commit**

Run: `npm run dev` → buka `/anime/tensei-deshita-s2-sub-indo` (diketahui `paragraphs: []`) → pastikan tampil "Sinopsis belum tersedia dari sumber."
```bash
git add "app/anime/[slug]/page.tsx" "app/anime/genre/[slug]/page.tsx"
git commit -m "feat(anime): tambah detail anime + genre"
```

---

### Task 6: Watch + jadwal + cari (server fallback-safe)

**Files:**
- Create: `app/anime/watch/[episodeId]/page.tsx`
- Create: `app/anime/jadwal/page.tsx`
- Create: `app/anime/cari/page.tsx`

**Interfaces:**
- Consumes: Task 1 (`getEpisode`, `getServerUrl`, `pickStreamUrl`, `getSchedule`, `searchAnime`), Task 2 (`AnimePlayer`, `AnimeCard`, `AnimeSearchForm`).
- Produces: route `/anime/watch/:episodeId`, `/anime/jadwal`, `/anime/cari`.

- [ ] **Step 1: Buat `app/anime/watch/[episodeId]/page.tsx`**

```tsx
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import AnimePlayer from "@/components/AnimePlayer";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getEpisode, getServerUrl, pickStreamUrl } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ episodeId: string }>;
  searchParams: Promise<{ server?: string; quality?: string }>;
}) {
  await requireOwner();
  const { episodeId } = await params;
  const sp = await searchParams;
  let ep;
  try {
    ep = await getEpisode(episodeId);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel icon="alert" title="Gagal memuat episode" message={e instanceof Error ? e.message : "Coba lagi."} actionLabel="Kembali ke anime" actionHref="/anime" />
      </main>
    );
  }
  const qualities = ep.server?.qualities ?? [];
  const validIds = new Set(qualities.flatMap((q) => q.serverList.map((s) => s.serverId)));
  const wanted = (sp.server ?? "").trim();
  let streamUrl = ep.defaultStreamingUrl;
  let serverNotice = "";
  if (wanted && validIds.has(wanted)) {
    try {
      const resolved = await getServerUrl(wanted);
      streamUrl = pickStreamUrl(ep.defaultStreamingUrl, resolved, wanted);
    } catch {
      serverNotice = "Server pilihan gagal dimuat (mungkin rate-limit), memakai stream default.";
    }
  } else if (wanted) {
    serverNotice = "Server pilihan tidak dikenal, memakai stream default.";
  }
  const eps = ep.info?.episodeList ?? [];
  const downloads = ep.downloadUrl?.qualities ?? [];
  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb trail={[{ label: "Beranda", href: "/" }, { label: "Anime", href: "/anime" }, { label: ep.title }]} />
      <h1 className="mt-4 line-clamp-2 text-xl font-bold tracking-tight">{ep.title}</h1>
      <div className="mt-4"><AnimePlayer streamUrl={streamUrl} title={ep.title} /></div>
      {serverNotice ? <p role="status" className="mt-2 text-xs text-[var(--text-muted)]">{serverNotice}</p> : null}
      {qualities.length ? (
        <section className="mt-5" aria-label="Pilih server">
          {qualities.map((q) => (
            <div key={q.title} className="mt-3">
              <p className="text-xs font-semibold text-[var(--text-muted)]">{q.title}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {q.serverList.map((s) => {
                  const active = wanted === s.serverId || (!wanted && q.title === qualities[0]?.title && s === q.serverList[0]);
                  return (
                    <Link
                      key={s.serverId}
                      href={`/anime/watch/${episodeId}?server=${encodeURIComponent(s.serverId)}&quality=${encodeURIComponent(q.title)}`}
                      aria-current={active && wanted ? "true" : undefined}
                      className={active && wanted ? "inline-flex min-h-[40px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-3 text-xs font-semibold text-[var(--accent-ink)]" : "inline-flex min-h-[40px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"}
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
        {ep.hasPrevEpisode && ep.prevEpisode ? (
          <Link href={`/anime/watch/${ep.prevEpisode.episodeId}`} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"><Icon name="chevronLeft" size={16} />Prev</Link>
        ) : null}
        {ep.hasNextEpisode && ep.nextEpisode ? (
          <Link href={`/anime/watch/${ep.nextEpisode.episodeId}`} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]">Next<Icon name="chevronRight" size={16} /></Link>
        ) : null}
      </div>
      {downloads.length ? (
        <section className="mt-8" aria-labelledby="download">
          <h2 id="download" className="mb-3 text-lg font-semibold">Download</h2>
          <div className="space-y-3">
            {downloads.map((d) => (
              <div key={d.title} className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-3">
                <p className="text-sm font-semibold">{d.title}{d.size ? <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">{d.size}</span> : null}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {d.urls.map((u) => (
                    <a key={`${d.title}-${u.title}`} href={u.url} target="_blank" rel="noopener" className="inline-flex min-h-[36px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]">{u.title}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {eps.length ? (
        <section className="mt-8" aria-labelledby="episode-lain">
          <h2 id="episode-lain" className="mb-3 text-lg font-semibold">Episode lain ({eps.length})</h2>
          <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
            {eps.map((e) => (
              <li key={e.episodeId}>
                <Link href={`/anime/watch/${e.episodeId}`} aria-current={e.episodeId === episodeId ? "page" : undefined} className={`flex min-h-[48px] items-center gap-3 px-3 py-2.5 hover:bg-[var(--surface-raised)] ${e.episodeId === episodeId ? "text-[var(--accent)]" : ""}`}>
                  <span className="w-10 shrink-0 text-center text-xs font-semibold tabular-nums">{e.eps ?? "•"}</span>
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
```

- [ ] **Step 2: Buat `app/anime/jadwal/page.tsx`**

```tsx
import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getSchedule } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export const metadata = { title: "Jadwal Rilis Anime", description: "Jadwal rilis anime per hari." };

export default async function JadwalPage() {
  await requireOwner();
  let days: Array<{ day: string; anime_list: Array<{ title: string; slug: string; poster: string }> }> = [];
  try {
    const res = await getSchedule();
    days = res.data ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel icon="alert" title="Gagal memuat jadwal" message={e instanceof Error ? e.message : "Coba lagi."} actionLabel="Kembali" actionHref="/anime" />
      </main>
    );
  }
  const todayName = new Intl.DateTimeFormat("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" }).format(new Date());
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight"><Icon name="clock" size={22} className="text-[var(--accent)]" />Jadwal Rilis</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Waktu acuan WIB (Asia/Jakarta).</p>
      <div className="mt-6 space-y-10">
        {days.map((d) => {
          const isToday = d.day.toLowerCase() === todayName.toLowerCase();
          return (
            <section key={d.day} aria-labelledby={`hari-${d.day}`}>
              <div className="flex items-center gap-2">
                <h2 id={`hari-${d.day}`} className="text-lg font-semibold">{d.day}</h2>
                {isToday ? (
                  <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-ink)]">Hari ini</span>
                ) : null}
                <span className="text-xs text-[var(--text-muted)]">{d.anime_list.length} judul</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {d.anime_list.map((a) => (
                  <AnimeCard key={a.slug} id={a.slug} title={a.title} cover={a.poster} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Buat `app/anime/cari/page.tsx`**

```tsx
import AnimeCard from "@/components/AnimeCard";
import AnimeSearchForm from "@/components/AnimeSearchForm";
import StatePanel from "@/components/StatePanel";
import { searchAnime } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export const metadata = { title: "Cari Anime", description: "Cari judul anime subtitle Indonesia." };

export default async function CariPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireOwner();
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  if (!q) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Cari Anime</h1>
        <div className="mt-5"><AnimeSearchForm /></div>
        <div className="mt-6">
          <StatePanel icon="search" title="Belum ada kata kunci" message="Tuliskan judul anime pada kolom di atas, lalu tekan Cari." actionLabel="Kembali ke anime" actionHref="/anime" />
        </div>
      </main>
    );
  }
  let list: Array<{ animeId: string; title: string; poster: string; status?: string; score?: string }> = [];
  try {
    const res = await searchAnime(q);
    list = res.data?.animeList ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Hasil untuk <span className="text-[var(--accent)]">{q}</span></h1>
        <div className="mt-5"><AnimeSearchForm defaultValue={q} /></div>
        <div className="mt-6">
          <StatePanel icon="alert" title="Pencarian gagal" message={e instanceof Error ? e.message : "Coba lagi."} actionLabel="Kembali ke anime" actionHref="/anime" />
        </div>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="line-clamp-2 text-2xl font-bold tracking-tight">Hasil untuk <span className="text-[var(--accent)]">{q}</span></h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{list.length} hasil</p>
      <div className="mt-5"><AnimeSearchForm defaultValue={q} /></div>
      <div className="mt-6">
        {!list.length ? (
          <StatePanel icon="search" title={`Tidak ada hasil untuk "${q}"`} message="Coba ejaan lain atau judul yang lebih singkat." actionLabel="Kembali ke anime" actionHref="/anime" />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {list.map((a) => (
              <AnimeCard key={a.animeId} id={a.animeId} title={a.title} cover={a.poster} meta={a.score ? `Skor ${a.score}` : a.status} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verifikasi fallback server + commit**

Run: `npm run dev` → buka episode asli, lalu `?server=ID-ASAL` → pastikan notice + default dipakai, iframe tetap tampil.
```bash
git add "app/anime/watch/[episodeId]/page.tsx" app/anime/jadwal/page.tsx app/anime/cari/page.tsx
git commit -m "feat(anime): tambah watch, jadwal, cari"
```

---

### Task 7: Verifikasi akhir

**Files:** tidak ada (cek saja).

- [ ] **Step 1: Test + build hijau**

Run: `npm test`
Expected: PASS.

Run: `npm run build`
Expected: PASS tanpa error tipe.

- [ ] **Step 2: Cek regresi komik**

Buka `/`, `/manga/<id>`, `/search?q=naruto`, `/peringkat` — pastikan tidak berubah.

- [ ] **Step 3: Cek alur anime end-to-end**

`/anime` → 1 detail → 1 watch → ganti server 360p→720p → `/anime/jadwal` → `/anime/cari?q=naruto` → `/anime/ongoing?page=2` → `/anime/genre/action`.
