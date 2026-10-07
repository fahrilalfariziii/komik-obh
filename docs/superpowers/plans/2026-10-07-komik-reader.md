# Komik Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Web app reader komik dengan isi chapter dan gambar Bahasa Indonesia (toggle ID/EN) memakai MangaDex.

**Architecture:** Next.js App Router dengan Route Handler sebagai proxy ke MangaDex untuk cache, retry 429, dan URL at-home yang expire. UI dark OLED content-first, mobile-first.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, MangaDex API, AniList GraphQL opsional untuk trending.

**Spec:** `docs/superpowers/specs/2026-10-07-komik-reader-design.md`

## Global Constraints

- Bahasa default `id`, toggle manual `id | en`, simpan di URL `?lang=`.
- `contentRating=safe+suggestive` saja.
- Area baca `#000`, app `zinc-950`, tanpa gradient biru-ungu, tanpa glass di semua permukaan, tanpa glow.
- Kontras teks normal minimal 4.5:1, teks besar 3:1.
- Setiap view data wajib punya empty, loading, error state.
- Tidak ada tombol mati, tidak ada link navbar ke halaman yang tidak ada.
- Tanpa em dash di teks UI.
- Tanpa klaim angka, testimoni, atau statistik palsu.

## Review Focus

- Feed chapter ID kosong tapi EN ada: reader harus tawarkan switch bahasa, bukan blank.
- At-home `baseUrl` expire atau 404: refetch sekali, fallback `forcePort443=true`.
- Rate limit 429 dari MangaDex: retry backoff sekali lalu pesan coba lagi 30 detik.
- Gambar chapter gagal sebagian: placeholder per halaman dengan retry, bukan gagal seluruh chapter.
- Toggle terang/gelap dua-duanya harus rapi, tidak merusak layout.

---

### Task 1: Scaffold Next.js + Tailwind + dark tokens

**Files:**
- Create: `package.json`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Test: `tests/tokens.test.ts`

**Interfaces:**
- Consumes: tidak ada
- Produces: App shell dark dengan `LangToggle` dan theme toggle yang berfungsi.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { themeTokens } from "../lib/theme";

describe("themeTokens", () => {
  it("memakai dasar gelap OLED tanpa gradient", () => {
    expect(themeTokens.appBg).toBe("#09090b");
    expect(themeTokens.readerBg).toBe("#000000");
    expect(themeTokens.accent).toBe("#fbbf24");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tokens.test.ts`
Expected: FAIL with "themeTokens not defined"

- [ ] **Step 3: Write minimal implementation**

```ts
export const themeTokens = {
  appBg: "#09090b",
  readerBg: "#000000",
  accent: "#fbbf24",
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tokens.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold reader dengan token dark OLED"
```

### Task 2: MangaDex proxy Route Handlers

**Files:**
- Create: `lib/mangadex.ts`
- Create: `app/api/mangadex/search/route.ts`
- Create: `app/api/mangadex/manga/[id]/route.ts`
- Create: `app/api/mangadex/feed/[id]/route.ts`
- Create: `app/api/mangadex/at-home/[chapterId]/route.ts`
- Test: `tests/mangadex-url.test.ts`

**Interfaces:**
- Consumes: `themeTokens` tidak relevan, memakai `fetch` server.
- Produces: `searchManga(q)`, `getManga(id)`, `getFeed(id, lang)`, `getAtHome(chapterId)`, `buildPageUrls(baseUrl, hash, files)`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { buildPageUrls } from "../lib/mangadex";

describe("buildPageUrls", () => {
  it("merakit URL dataSaver dengan benar", () => {
    const urls = buildPageUrls("https://cdn.test", "abc123", ["p1.jpg"], ["p1.jpg"], true);
    expect(urls).toEqual(["https://cdn.test/data-saver/abc123/p1.jpg"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/mangadex-url.test.ts`
Expected: FAIL with "buildPageUrls not defined"

- [ ] **Step 3: Write minimal implementation**

```ts
export function buildPageUrls(baseUrl: string, hash: string, data: string[], dataSaver: string[], saver: boolean) {
  const files = saver ? dataSaver : data;
  const folder = saver ? "data-saver" : "data";
  return files.map((f) => `${baseUrl}/${folder}/${hash}/${f}`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/mangadex-url.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: tambah proxy MangaDex dengan retry dan cache"
```

### Task 3: Search + Detail + ChapterList ID/EN

**Files:**
- Create: `app/search/page.tsx`
- Create: `app/manga/[id]/page.tsx`
- Create: `components/MangaCard.tsx`
- Create: `components/ChapterList.tsx`
- Create: `components/LangToggle.tsx`

**Interfaces:**
- Consumes: `getManga`, `getFeed` dari Task 2.
- Produces: Halaman search grid dan detail dengan toggle bahasa di URL.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { feedQuery } from "../lib/mangadex";

describe("feedQuery", () => {
  it("memakai translatedLanguage id dan en", () => {
    const q = feedQuery("manga-1", "id");
    expect(q).toContain("translatedLanguage[]=id");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/feed-query.test.ts`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```ts
export function feedQuery(mangaId: string, lang: string) {
  return `manga/${mangaId}/feed?translatedLanguage[]=${lang}&order[chapter]=asc&limit=500`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/feed-query.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: search detail dan daftar chapter ID EN"
```

### Task 4: Reader vertical scroll + toolbar

**Files:**
- Create: `app/chapter/[chapterId]/page.tsx`
- Create: `components/ReaderView.tsx`
- Create: `components/ReaderToolbar.tsx`

**Interfaces:**
- Consumes: `getAtHome`, `buildPageUrls` dari Task 2.
- Produces: Reader scroll vertikal dengan prev/next chapter sebahasa, toggle hemat data, progres baca.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { nextChapterSameLang } from "../lib/reader";

describe("nextChapterSameLang", () => {
  it("memilih chapter berikut dalam bahasa aktif", () => {
    const list = [{ id: "a", chapter: "1" }, { id: "b", chapter: "2" }];
    expect(nextChapterSameLang(list, "a")).toBe("b");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/reader-nav.test.ts`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```ts
export function nextChapterSameLang(list: { id: string }[], currentId: string) {
  const i = list.findIndex((c) => c.id === currentId);
  return list[i + 1]?.id ?? null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/reader-nav.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: reader vertikal dengan toolbar dan hemat data"
```
