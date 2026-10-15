# Spec: Anime Multi-Sumber Tranche 1 (Samehadaku, Fallback Otomatis)

Tanggal: 2026-10-16
Status: disetujui (pendekatan A — paralel + gabung + badge)
Latar: pencarian Otakudesu-only tidak menemukan sebagian judul. Tambah Samehadaku
sebagai sumber cadangan dengan fallback otomatis. Donghua/Kusonime/Anoboy/Oploverz
menyusul di tranche berikut dengan pola yang sama.

Keputusan pemakai (mengikat):
1. Model UX: C — fallback otomatis (URL tetap sama dari sisi pengguna).
2. Cakupan tranche 1: Samehadaku saja, bertahap.
3. Identitas sumber: A — prefix path (`/anime/<source>/<slug>`).
4. Strategi pencarian: A — paralel + gabung + badge sumber.

Non-tujuan tranche 1: sumber ke-3+, halaman genre per-sumber, home/list/jadwal
per-sumber, ranking relevansi lintas sumber, live-search/autocomplete.

## 1. Arsitektur lib

- `lib/anime.ts` TIDAK diubah (Otakudesu utuh).
- `lib/anime-samehadaku.ts` baru — mirror pola `lib/anime.ts` untuk base
  `https://www.sankavollerei.web.id/anime/samehadaku`:
  `getSamehadakuHome()`, `searchSamehadaku(q)`, `getSamehadakuDetail(id)`,
  `getSamehadakuEpisode(id)`, `getSamehadakuServer(id)`.
  Cache: detail 3600, lainnya 300. Bentuk JSON pasti disampling saat implementasi
  (field Samehadaku beda nama dengan Otakudesu — sudah pasti dari dokumentasi
  endpoint; endpoint yang dipakai: `/home`, `/search?q=&page`, `/ongoing`,
  `/completed`, `/anime/:animeId`, `/episode/:episodeId`, `/server/:serverId`).
- `lib/anime-sources.ts` baru — kontrak bersama:
  - `SourceId = "otakudesu" | "samehadaku"`, `KNOWN_SOURCES = ["otakudesu", "samehadaku"]`.
  - `AnimeResult { source: SourceId; id: string; title: string; cover: string; meta?: string; detailHref: string }`.
  - `searchAllAnime(q)`: tembak kedua sumber paralel via `Promise.allSettled`
    dengan timeout lunak ±8 detik per sumber (`AbortSignal.timeout`); gabung
    Otakudesu (maks 12) lalu Samehadaku (maks 12); satu sumber gagal → hasil
    sumber lain tetap tampil + flag `partial: { otakudesu: boolean; samehadaku: boolean }`.

## 2. Route

| Route | Perilaku |
|---|---|
| `/anime/[source]/[slug]` | Detail. `source` tak dikenal → `StatePanel` + kembali `/anime`. `otakudesu` = tampilan lama dipindah tanpa ubah. `samehadaku` = mapping ke tampilan sama; field tak tersedia disembunyikan. Genre chips Samehadaku statis (tanpa link). Tombol nonton → `/anime/samehadaku/watch/<episodeId>`. |
| `/anime/[source]/watch/[episodeId]` | Player. Pola `?server=` + fallback default + notice, sama seperti sekarang. Kontrak `AnimePlayer { streamUrl, title }` tidak berubah; perbedaan struktur server Samehadaku ditampung di adaptor. Prev/next + download mengikuti data masing-masing sumber; blok kosong disembunyikan. |
| `/anime/<slug>` (legacy) | Redirect permanen ke `/anime/otakudesu/<slug>`, kecuali `<slug>` adalah id sumber terdaftar → redirect ke `/anime`. |
| `/anime/watch/<ep>` (legacy) | Redirect permanen ke `/anime/otakudesu/watch/<ep>`. |
| `/anime/cari` | Halaman gabungan (Bagian 3). |
| `/anime`, `/anime/ongoing`, `/anime/tamat`, `/anime/jadwal` | Tetap Otakudesu tahap ini. |

## 3. Search gabungan

- Form tetap submit manual (tanpa live-search).
- Hasil: Otakudesu maks 12 + Samehadaku maks 12. Badge sumber: Otakudesu polos
  (default), Samehadaku berlabel "Samehadaku" (prop `badge` `AnimeCard` yang ada).
- Keduanya kosong → `StatePanel` "Tidak ada hasil di Otakudesu maupun Samehadaku"
  + saran cek ejaan/judul Inggris. Satu gagal → hasil ada + notice kecil
  non-blokir ("Samehadaku tidak merespons, menampilkan hasil Otakudesu").
- Urutan deterministik (Otakudesu dulu), tanpa skor relevansi.
- Budget: 1 pencarian = 2 request paralel; cache search 300 dtk/sumber; tanpa
  prefetch detail; tanpa resolve semua server. Jauh di bawah 45/menit untuk
  pemakaian pribadi.

## 4. Testing & verifikasi

- `tests/anime-sources.test.ts` (fetch di-mock, tanpa network): builder URL
  Samehadaku, `slugFromSamehadakuHref`, normalisasi satu item mentah per sumber
  → `AnimeResult` benar (termasuk `detailHref` prefix), gabungan saat satu
  sumber gagal → hasil sumber lain utuh, keduanya kosong → list kosong.
- Manual: cari judul yang kemarin tak ketemu → badge Samehadaku → buka detail →
  ganti server → cek redirect URL lama → `npm test` + `npm run build` hijau.
- Regresi: seluruh alur Otakudesu lama tetap jalan (termasuk redirect).

## 5. Risiko

- Bentuk JSON Samehadaku menyimpang dari dokumentasi → adaptor defensif
  (`?? []`, optional chaining); halaman tidak crash, tampil `StatePanel`.
- Embed Samehadaku diblokir X-Frame-Options → fallback teks + server lain + download.
- Tranche berikut (Donghua/dll) tinggal tambah adaptor + entri `SourceId` + prefix.
