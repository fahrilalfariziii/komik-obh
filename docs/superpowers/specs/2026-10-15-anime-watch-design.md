# Spec: Tambah Nonton Anime (Otakudesu)

Tanggal: 2026-10-15
Status: disetujui (pendekatan A — paralel komik)
Sumber: `https://www.sankavollerei.web.id/anime` (provider Otakudesu saja, v1)

## 1. Tujuan & batasan

- Menambah subsystem nonton anime tanpa mengubah/menghapus fitur komik yang ada.
- Navigasi mudah: tab Komik (ada) + Anime (baru) di `Navbar` dan `BottomNav`.
- UI selaras katalog gelap editorial (`DESIGN.md`): token yang sama, tanpa tema baru.
- Rate limit upstream 45 req/menit dihormati via cache `fetch` + pesan 429 yang jelas.
- Struktur respons Otakudesu sudah diverifikasi langsung (home, detail, episode, server, schedule, search, ongoing, genre).

Keputusan pemakai (mengikat):
1. Sumber v1: Otakudesu saja.
2. Navigasi: tab Komik + Anime.
3. Player: iframe + ganti server per kualitas.

Non-tujuan v1: multi-source (Samehadaku/Oploverz/dll), bookmark/history anime, download inline (hanya link keluar), autoplay.

## 2. Arsitektur

- `lib/anime.ts` baru, mirror `lib/sanka.ts`. Tidak mengubah `lib/sanka.ts`.
- Semua halaman anime adalah Server Component (fetch server-side). Satu-satunya interaktivitas player adalah navigasi link `?server=&quality=` — tanpa fetch browser-ke-upstream (hindari CORS).
- Pola `Promise.allSettled` untuk home (seperti `app/page.tsx`): satu sumber gagal tidak mematikan halaman.

### 2.1 API upstream yang dipakai (terverifikasi)

| Fungsi | Upstream | Cache |
|---|---|---|
| `getAnimeHome()` | `GET /anime/home` → `{ data: { ongoing: { animeList[] }, completed: { animeList[] } } }` | 300s |
| `getOngoing(page)` | `GET /anime/ongoing-anime?page=` → `{ data: { animeList[] }, pagination }` | 300s |
| `getComplete(page)` | `GET /anime/complete-anime?page=` → sama | 300s |
| `getAnimeDetail(slug)` | `GET /anime/anime/:slug` → `{ data: { title, poster, score, type, status, studios, duration, aired, genreList[], episodeList[], recommendedAnimeList[], synopsis } }` | 3600s |
| `getEpisode(slug)` | `GET /anime/episode/:slug` → `{ data: { title, animeId, defaultStreamingUrl, prevEpisode, nextEpisode, hasPrevEpisode, hasNextEpisode, server: { qualities[] }, downloadUrl: { qualities[] }, info } }` | 300s |
| `getServerUrl(id)` | `GET /anime/server/:serverId` → `{ data: { url } }` | 600s |
| `searchAnime(kw)` | `GET /anime/search/:keyword` → `{ data: { animeList[] } }` | 300s |
| `getSchedule()` | `GET /anime/schedule` → `{ data: [{ day, anime_list[] }] }` | 900s |
| `getGenre(slug, page)` | `GET /anime/genre/:slug?page=` → `{ data: { animeList[] }, pagination }` | 300s |

Catatan bentuk data (kontrak yang dipegang):
- Item list: `{ title, poster, animeId, href, episodes?, score?, releaseDay?, latestReleaseDate? }`. `animeId` dipakai sebagai slug route lokal.
- Episode item: `{ title, eps, date, episodeId, href }`. `episodeId` dipakai sebagai slug watch lokal.
- Server: `{ qualities: [{ title: "360p"|"480p"|"720p", serverList: [{ title, serverId, href }] }] }`.
- Schedule: `[{ day, anime_list: [{ title, slug, url, poster }] }]`. `slug` dipakai langsung.
- Synopsis detail sering `paragraphs: []` → UI wajib fallback, bukan blank.
- Semua respons dibungkus `{ status, data, pagination }`; `pagination` bisa `null`.

### 2.2 Route lokal

| Route | Sumber data | Isi |
|---|---|---|
| `/anime` | `getAnimeHome()` | hero + form cari anime, ongoing terbaru (12), completed (10), CTA jadwal/ongoing/tamat |
| `/anime/ongoing?page=` | `getOngoing(page)` | grid + pagination prev/next |
| `/anime/tamat?page=` | `getComplete(page)` | grid + pagination prev/next |
| `/anime/jadwal` | `getSchedule()` | grup hari, hari berjalan badge accent |
| `/anime/cari?q=` | `searchAnime(q)` | hasil grid; kosong → `StatePanel` |
| `/anime/genre/[slug]?page=` | `getGenre(slug, page)` | hasil per genre + pagination |
| `/anime/[slug]` | `getAnimeDetail(slug)` | poster, meta, genre, sinopsis, episode, rekomendasi |
| `/anime/watch/[episodeId]?server=&quality=` | `getEpisode(episodeId)` + opsional `getServerUrl(server)` | player + server picker + prev/next + download + daftar episode |

Aturan slug: hanya `animeId` / `episodeId` / `slug` jadwal (tanpa `/anime/...` prefix upstream). Helper `slugFromAnimeHref(href)` = segmen terakhir, reuse pola `slugFromLink`.

### 2.3 File yang dibuat/diubah

Dibuat:
- `lib/anime.ts` — base, tipe, builder URL, fetch + cache, `friendlyAnimeError`, `pickStreamUrl(defaultUrl, resolvedUrl, serverId)` (kembalikan `resolvedUrl` bila `serverId` non-kosong dan `resolvedUrl` non-kosong, else `defaultUrl`), `slugFromAnimeHref`.
- `app/anime/page.tsx`, `app/anime/ongoing/page.tsx`, `app/anime/tamat/page.tsx`, `app/anime/jadwal/page.tsx`, `app/anime/cari/page.tsx`, `app/anime/genre/[slug]/page.tsx`, `app/anime/[slug]/page.tsx`, `app/anime/watch/[episodeId]/page.tsx`.
- `components/AnimeCard.tsx`, `components/AnimePlayer.tsx` (iframe + server picker link-based), `components/AnimeSearchForm.tsx` (form GET ke `/anime/cari`, tiru gaya `HeroSearch` tanpa mengubahnya).
- `tests/anime.test.ts` — unit builder + `pickStreamUrl` + `slugFromAnimeHref`.

Diubah (minimal):
- `components/Icon.tsx` — tambah ikon `play` (satu path, stroke 1.75).
- `components/Navbar.tsx` — tambah tab `{ href: "/anime", label: "Anime", icon: "play" }` di antara Beranda dan Peringkat. Catatan: keadaan akhir nav mengikuti redesign komik yang sedang berjalan di working tree (tab Peringkat sudah ada sebelum task anime; link "Cari Komik" tidak ada — form search hanya tampil di `md+`, BottomNav "Cari" menutup celah di layar kecil).
- `components/BottomNav.tsx` — tambah tab Anime; grid menjadi `grid-cols-4` (Beranda/Anime/Peringkat/Cari).
- `app/layout.tsx` — tidak wajib diubah (preconnect sankavollerei sudah ada). Opsional: tambah `metadata` per halaman anime.

Tidak diubah: seluruh route komik (`/`, `/manga/*`, `/chapter/*`, `/search`, `/peringkat`), `lib/sanka.ts`, `MangaCard`, `HeroSearch`.

## 3. Komponen & UI

- `AnimeCard`: tiru `MangaCard` (border `surface`, hover `accent`, `aspect-[3/4]`, judul `line-clamp-2`, meta `text-xs muted`). Props: `id, title, cover, meta?, badge?`. Href `/anime/[id]`.
- `AnimePlayer`: props `streamUrl, title`. Render `iframe` `aspect-video w-full rounded-card border`, `allowFullScreen`, `title="Nonton <judul>"`. Di bawahnya `ServerPicker`: per `quality` satu grup; tiap server satu `Link` ke `?server=<id>&quality=<q>`; aktif (`server` cocok) = `bg-accent text-accent-ink`, sisanya outline. Tanpa client JS.
- Halaman watch: breadcrumb `Beranda / Anime / <judul anime> / Episode N`; tombol Prev (outline) / Next (accent, gaya tombol manga detail); blok download: tiap `downloadUrl.qualities[]` tampil `title + size`, di dalamnya link host `target=_blank rel=noopener` (Pdrain/Acefile/dll); daftar episode urut seperti API (terbaru dulu) dengan penanda episode aktif.
- Detail `/anime/[slug]`: layout 2 kolom tiru `manga/[id]` (poster 36 + info). Chips: `type`, `status`, `score`. Meta baris: studio, durasi, tayang. Genre chips → link `/anime/genre/<genreId>`. Sinopsis: gabung `synopsis.paragraphs` bila ada, else fallback "Sinopsis belum tersedia dari sumber." Episode list + rekomendasi (`AnimeCard` kecil).
- Home `/anime`: hero judul "Nonton anime subtitle Indonesia" + `AnimeSearchForm`; dua section (Ongoing Terbaru, Tamat) + link "Lihat semua". Section ketiga jadwal hari ini (maks 6 kartu) tampil hanya bila `getSchedule()` sukses; bila gagal, section disembunyikan tanpa error.
- Jadwal: tiap `day` satu section; nama hari + jumlah; grid kartu; hari berjalan (zona `Asia/Jakarta` via `Intl.DateTimeFormat("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" })`, dicocokkan case-insensitive ke `day`) badge accent "Hari ini".
- Aksesibilitas: `aria-label` nav, `aria-current` tab aktif (reuse pola), iframe `title`, fokus accent, kontras ikut token lama. `prefers-reduced-motion` tidak perlu tambahan (tanpa animasi baru).

## 4. Player flow

1. `watch` Server Component: `episode = await getEpisode(episodeId)`.
2. `streamUrl = episode.defaultStreamingUrl`. Jika `searchParams.server` ada dan cocok dengan salah satu `serverId` di `server.qualities` → `try getServerUrl(server)` → `streamUrl = data.url`; gagal → tetap default + `serverNotice = "Server pilihan gagal dimuat (mungkin rate-limit), memakai stream default."`
3. Render `AnimePlayer streamUrl`, `ServerPicker` dari `episode.server`, navigasi prev/next dari `prevEpisode/nextEpisode` (link `/anime/watch/<episodeId>`), download dari `downloadUrl`, episode list dari `info.episodeList` (fallback `episodeList` bila perlu).
4. Tidak ada auto-resolve semua server di server (hemat kuota 45/menit); hanya resolve 1 server yang dipilih.

## 5. Error handling & rate limit

- `animeFetch(url, revalidate)`: header `User-Agent: komik-reader/0.1`; 429 → throw `"Rate limit anime (45/menit) tercapai. Tunggu ±1 menit lalu coba lagi."`; `!ok` → `"API anime error <status>. Coba lagi."`; network fail → `friendlyAnimeError` ("Tidak bisa mencapai sankavollerei.web.id (...)").
- Home pakai `allSettled`; gagal total → `StatePanel` "Gagal memuat daftar anime" + tombol "Coba lagi" (`/anime`).
- Detail/episode gagal → `StatePanel` + tombol kembali (`/anime` / detail anime via `animeId`).
- Search kosong (`q` kosong) → `StatePanel` "Masukkan kata kunci"; hasil nol → "Tidak ada hasil untuk ...".
- Pagination: `page` invalid (<1/NaN) → normalisasi ke 1; `hasNextPage` false → sembunyikan Next.

## 6. Testing & verifikasi

- `tests/anime.test.ts`: builder URL (`home/ongoing/detail/episode/server/search/schedule/genre`), `slugFromAnimeHref` (path relatif + absolut + trailing slash), `pickStreamUrl(default, resolved, serverId)` (pakai resolved bila serverId cocok, else default), `friendlyAnimeError` (429 + fetch failed). Tanpa network.
- Manual: `npm test`, `npm run build`; `npm run dev` → `/anime`, 1 detail, 1 watch + ganti server 360p→720p, `/anime/jadwal`, `/anime/cari?q=naruto`, `/anime/ongoing?page=2`.
- Kriteria selesai: komik tidak berubah perilaku; semua route anime render; ganti server mengganti iframe; tidak ada warna/token baru di luar yang ada.

## 7. Risiko

- Upstream mengubah bentuk JSON → `lib/anime.ts` pakai akses defensif (`?? []`, optional chaining) + tipe longgar; halaman tidak crash, tampil `StatePanel`.
- Embed diblokir X-Frame-Options oleh host video tertentu → fallback teks + saran coba server lain + link download.
- Rate limit saat QA berulang → jeda + andalkan cache revalidate; jangan spam refresh.
