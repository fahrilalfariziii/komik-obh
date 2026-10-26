# Design: History (Riwayat Baca & Tonton) — KomikReader
Tanggal: 2026-10-26 · Status: disetujui pemilik

## 1. Intent & Why
Aplikasi sebelumnya sama sekali tanpa penyimpanan (DESIGN.md menunda "bookmark/history (belum ada penyimpanan)"). Pemilik ingin riwayat yang **tercatat otomatis** dan **nyambung ke akun** (lintas perangkat, Clerk userId):
- Komik (manga/manhwa/manhua): sampai chapter mana — **tanpa** posisi di dalam chapter. Plus penanda abu-abu (`text-muted`) pada chapter yang sudah dibaca di daftar chapter detail komik.
- Drakor & movie: sampai **dalam** — episode + posisi menit (bisa "lanjut di menit X"). Player hls.js.
- Anime: ikut, tapi **hanya sampai episode** (player anime = iframe embed eksternal; posisi menit tak tertangkap browser).

## 2. Goals
- G1: Riwayat tercatat otomatis (buka chapter/episode = tercatat; tontonan rekam saat play pertama lalu heartbeat) dan tersimpan server-side → sinkron antar-perangkat.
- G2: Halaman/tab **Riwayat** terikat akun: satu feed lintas domain (Komik/Anime/Drakor/Movie), urut terbaru, paginasi, hapus per-baris.
- G3: ChapterList detail komik mengabu-abukan chapter yang pernah dibaca — akurat **per-chapter** (bukan heuristik "≤ terakhir") agar loncat ke tengah series tidak menandai chapter sebelumnya.
- G4: Resume: chip amber "Lanjut di 12:34" di halaman tonton drakor/movie (klik → seek); tombol amber "Lanjut: Ch. N" di detail komik.

## Non-goals
Bookmark/favorit, statistik, offline mode, penandaan manual, posisi menit anime, sinkron antar-akun.

## Anti-goals (kegagalan)
- UI ikut menunggu/lemot karena pencatatan — recording wajib fire-and-forget; gagal = hening, app tetap normal.
- Tabel tumbuh tanpa kontrol.

## 3. Constraints
- Next.js 15 App Router, React 19, Tailwind 4 + token DESIGN.md, deploy Vercel, Clerk middleware (semua route wajib login kecuali `/sign-in`).
- **Neon Postgres** free tier + driver `@neondatabase/serverless`; **tanpa ORM**; env baru: `DATABASE_URL` (server-only).
- Tulis via **Server Actions** (pola pertama di app ini) — tanpa route handler baru.
- Baca DB di RSC hanya di halaman yang memang dinamis: `/history` (per-akun) dan halaman watch (`getPlay`/`playDrakor` revalidate 0 → sudah dynamic). Detail manga tetap ISR: read-state dari client via Server Action.

## 4. Approaches (dipilih pemilik)
1. **Neon Postgres** (dipilih) — tabel kecil, upsert per `(user, domain, ref)`; alasan: murah setup di Vercel, muat riwayat bertahun-tahun.
2. Upstash Redis sorted-set — setup lebih cepat, tapi data semi-terstruktur dan tetap layanan baru.
3. Clerk privateMetadata — ditolak: metadata user Clerk dibatasi **8 KB** (docs resmi) → hanya muat ~20–30 entri.

## 5. Model data
Satu tabel `history` (PK `(user_id, domain, ref)`), `payload JSONB` per domain:
- komik: `{ lastChapter: {slug, number}, readSet: [{from, to}] }` — rentang nomor chapter (float "10.5" didukung)
- anime: `{ source, animeSlug, episode: {episodeId, number} }`
- drakor: `{ episodeId, episode: number, position: sec, duration: sec }`
- movie: `{ kind: 'movie'|'series', season?, episode?, episodeId, position, duration }` — `episodeId` per-episode wajib (syarat link `movie/watch` & resume series)

Poster/judul **denormalisasi saat menulis** → halaman Riwayat tidak pernah fetch API eksternal.

Trim (keputusan terekam): maks **500 baris/user**; overflow → hapus `updated_at` terlama domain watch (anime/drakor/movie) lebih dulu; bila masih lint (semua baris komik) → hapus baris komik terlama. "Selesai" dihitung (bukan kolom): `position/duration ≥ 0,95`.

## 6. Write paths (Server Actions, semua idempotenn via upsert)
| Domain | Trigger | Aksi |
|---|---|---|
| Komik | ReaderView: `<img>` pertama onLoad | `recordComicRead` — merge nomor chapter ke readSet, set lastChapter |
| Anime | mount watch page | `recordAnimeWatch` |
| Drakor | hls.js: heartbeat 10 s + pause + pagehide (fetch keepalive) | `recordDrakorProgress` — position di-clamp **maksimum** (majulah, tidak kemundur) |
| Movie | idem | `recordMovieProgress` |

## 7. Read paths & UI
- `/history` (RSC dynamic): feed baris ala UpdateRow — thumb poster (placeholder bila kosong), judul, chip domain, meta progres ("Ch. 235", "Ep 3 · 12:34/45:00" atau tandai "Selesai"), waktu relatif; paginasi `?page` (50/baris); StatePanel kosong/error; tombol hapus kecil per baris.
- Link baris → `/chapter/{chapterSlug}?manga={mangaSlug}`, `/anime/{source}/watch/{episodeId}`, `/drakor/watch/{id}?episode=n`, `/movie/watch?slug&id={episodeId}&kind&season&episode`.
- Detail komik: ChapterList fetch read-state via Server Action (`useEffect`) → chapter di readSet dapat `text-muted`; tombol amber "Lanjut: Ch. N" dari `lastChapter`.
- Watch drakor/movie (RSC): baca payload → chip amber "Lanjut di 12:34" **hanya bila** episode payload = episode di URL **dan** belum "Selesai"; chip = link URL yang sama + `&t={sec}`; player menerima `initialSeek` dari `?t` (resume tidak pernah auto-jump).
- Nav: Navbar tambah link/ikon Riwayat; BottomNav jadi 7 item (Riwayat menempati sebelum Cari). Ikon garis 1.75 selaras `Icon.tsx`.
- Init DB: `db/history.sql` dijalankan sekali via Neon console.

## 8. Keputusan builder (tertandai my calls)
Penamaan komponen/fungsi, copy text, ikon, urutan item nav, ukuran paginasi, detail retry heartbeat, urutan render feed.
