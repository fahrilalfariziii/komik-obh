# Spec: Anime Multi-Sumber Tranche 1 (Anoboy, Fallback Otomatis)

Tanggal: 2026-10-16 (revisi: Samehadaku → Anoboy)
Status: disetujui (pendekatan A — paralel + gabung + badge)
Latar: pencarian Otakudesu-only tidak menemukan sebagian judul. Rencana awal
memakai Samehadaku, tetapi sampling langsung membuktikan endpoint Samehadaku
yang dibutuhkan rusak: `search` 500 (3 query), `episode` 500, `ongoing` 500
(hanya `home` + `detail` hidup). Anoboy diverifikasi hijau penuh: search,
detail, episode. Donghua/Kusonime/Oploverz menyusul di tranche berikut.

Keputusan pemakai (mengikat):
1. Model UX: C — fallback otomatis.
2. Cakupan tranche 1: Anoboy (pengganti Samehadaku yang upstream-nya rusak).
3. Identitas sumber: A — prefix path (`/anime/<source>/<slug>`).
4. Strategi pencarian: A — paralel + gabung + badge sumber.

Non-tujuan tranche 1: sumber ke-3+, halaman genre per-sumber, home/list/jadwal
per-sumber, ranking relevansi lintas sumber, live-search/autocomplete.

## 1. Bentuk data Anoboy (disampling langsung, bukan tebakan)

- Search `GET /anime/anoboy/search/:keyword?page=` →
  `{ status, creator, source, anime_list: [{ title, slug, poster, status, type, url }], pagination }`.
  TANPA envelope `data`. Judul mentah ber-whitespace → adaptor wajib `.trim()`.
- Detail `GET /anime/anoboy/anime/:slug` →
  `{ status, creator, source, detail: { title, poster, synopsis: string,
  info: { status, studio, released, duration, season, type },
  genres: [{ name, slug, url }],
  episode_list: [{ slug, title, episode: string, release_date, url }] } }`.
  `episode` berupa string ("1180"). Synopsis berupa string (Otakudesu: paragraphs[]).
- Episode `GET /anime/anoboy/episode/:slug` →
  `{ status, creator, source, title, streams: [{ name, url }], downloads: [] }`.
  Player langsung tanpa pilih server/kualitas. `downloads` bisa kosong → blok disembunyikan.

## 2. Arsitektur lib

- `lib/anime.ts` TIDAK diubah (Otakudesu utuh).
- `lib/anime-anoboy.ts` baru — mirror pola `lib/anime.ts` untuk base
  `https://www.sankavollerei.web.id/anime/anoboy`:
  builder `anoboySearchUrl(kw)`, `anoboyDetailUrl(slug)`, `anoboyEpisodeUrl(slug)`,
  `slugFromAnoboyHref(href)`, fetch `searchAnoboy(q)`, `getAnoboyDetail(slug)`,
  `getAnoboyEpisode(slug)`, error `friendlyAnoboyError`. Cache: detail 3600,
  search/episode 300.
- `lib/anime-sources.ts` baru — kontrak bersama:
  - `SourceId = "otakudesu" | "anoboy"`, `KNOWN_SOURCES = ["otakudesu", "anoboy"]`.
  - `AnimeResult { source, id, title, cover, meta?, badge?, detailHref }`.
  - `searchAllAnime(q)`: paralel via `Promise.allSettled` + timeout lunak ±8 detik
    per sumber (`Promise.race`); gabung Otakudesu (maks 12) lalu Anoboy (maks 12);
    kembalikan `{ results, partial: { otakudesu: boolean; anoboy: boolean } }`.
  - `AnimeDetailView { title, poster, chips: string[], metaLine: string,
    genres: Array<{ id, title }>, synopsis: string,
    episodes: Array<{ id, title, eps: string, date? }>,
    recommendations: AnimeResult[] }`
    + mapper `fromOtakudesuDetail(d)` dan `fromAnoboyDetail(d)`.
  - `AnimeWatchView { title, animeId, detailHref, defaultStream: string,
    serverGroups: Array<{ quality: string; servers: Array<{ id, title }> }>,
    prevId?: string | null, nextId?: string | null,
    downloads: Array<{ title: string; size?: string; links: Array<{ title, url }> }>,
    episodes: Array<{ id, title, eps: string }> }`
    + mapper `fromOtakudesuEpisode(e)` dan `fromAnoboyEpisode(e)`.
    Anoboy: `serverGroups = []` (player langsung), prev/next = null
    (endpoint tak menyediakan navigasi), downloads dimapping bila ada.
  - `legacySlugTarget(slug)`: slug == id sumber terdaftar → `"/anime"`,
    else → `` `/anime/otakudesu/${slug}` ``. (Logika redirect yang bisa di-unit-test.)
  - `resolveOtakudesuStream(ep, serverId)`: validasi allowlist + `getServerUrl`,
    fallback default (dipindah dari watch page agar seragam).

## 3. Route

| Route | Perilaku |
|---|---|
| `/anime/[source]/[slug]` | Detail, render murni dari `AnimeDetailView`. `source` tak dikenal → `StatePanel` + kembali `/anime`. Genre chips Anoboy statis (tanpa link). |
| `/anime/[source]/watch/[episodeId]` | Player dari `AnimeWatchView` + link "← Detail anime". Server picker hanya bila `serverGroups` ada (Otakudesu); Anoboy langsung iframe. |
| `/anime/<slug>` (legacy) | Redirect permanen via `legacySlugTarget`. |
| `/anime/watch/<ep>` (legacy) | Redirect permanen ke `/anime/otakudesu/watch/<ep>`. |
| `/anime/cari` | Search gabungan (Bagian 4). |
| `/anime`, `/anime/ongoing`, `/anime/tamat`, `/anime/jadwal`, `/anime/genre/*` | Tetap Otakudesu tahap ini. |

## 4. Search gabungan

- Form tetap submit manual (tanpa live-search).
- Hasil maks 12+12. Badge: Otakudesu polos (default), Anoboy berlabel "Anoboy".
  Meta kartu: Otakudesu seperti sekarang; Anoboy = `[type, status]` yang ada.
- Keduanya kosong → `StatePanel` "Tidak ada hasil di Otakudesu maupun Anoboy".
  Satu gagal → hasil ada + notice non-blokir ("Anoboy tidak merespons,
  menampilkan hasil Otakudesu" / sebaliknya).
- Urutan deterministik (Otakudesu dulu). Budget: 2 request paralel per pencarian,
  cache 300 dtk/sumber, tanpa prefetch, tanpa resolve semua server.

## 5. Testing & verifikasi

- `tests/anime-anoboy.test.ts`: builder URL, `slugFromAnoboyHref` (termasuk
  query/hash), `friendlyAnoboyError`. Tanpa network.
- `tests/anime-sources.test.ts` (fetch di-mock): normalisasi satu item search
  mentah per sumber → `AnimeResult` benar (judul ter-trim, `detailHref` prefix);
  `fromAnoboyDetail`/`fromAnoboyEpisode` dari fixture riil (dipotong) → view benar
  (synopsis string dipakai langsung, `serverGroups` kosong, episode `eps` string);
  `fromOtakudesuDetail` smoke (judul/chips/episode pertama); `searchAllAnime`:
  satu sumber gagal → hasil lain utuh + flag partial; timeout → diperlakukan gagal;
  keduanya kosong → list kosong; `legacySlugTarget("anoboy")` → `/anime`,
  `legacySlugTarget("x")` → `/anime/otakudesu/x`.
- Manual: cari judul yang kemarin tak ketemu → badge Anoboy → detail → nonton
  (tanpa pilih server) → cek redirect URL lama → `npm test` + `npm run build` hijau.
- Regresi: seluruh alur Otakudesu lama identik (tampilan detail/watch Otakudesu
  tidak berubah piksel logika — hanya pindah bungkus view).

## 6. Risiko

- Anoboy ikut rusak seperti Samehadaku di masa depan → `allSettled` + notice
  membuat halaman tetap berguna dengan satu sumber.
- `downloads` Anoboy terisi di judul lain dengan bentuk beda → mapper defensif,
  blok disembunyikan bila tak dikenali.
- Tranche berikut tinggal tambah adaptor + entri `SourceId` + prefix + mapper.
