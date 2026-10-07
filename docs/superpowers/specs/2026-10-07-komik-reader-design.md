# Komik Reader Design

Tanggal: 2026-10-07
Status: disetujui percakapan, siap implementasi

## 1. Tujuan

Web app reader komik manga, manhwa, manhua. MVP hanya Search, Detail, Reader. Bahasa default Indonesia dengan toggle manual ID dan EN. Folder awal kosong, mulai dari nol.

Sukses: cari komik, buka daftar chapter Indonesia, baca gambar per halaman lancar di HP dan desktop.

## 2. Arsitektur

Next.js App Router dengan Tailwind. Semua call MangaDex dan AniList lewat Route Handler sendiri di `/api/mangadex/...`.

Sumber:
- MangaDex untuk konten: search, detail, feed chapter, gambar at-home.
- AniList GraphQL opsional untuk trending di homepage, klik judul lalu search ke MangaDex untuk cek ketersediaan ID dan EN.

Alur:
1. Search `GET /manga?title=X&availableTranslatedLanguage[]=id&availableTranslatedLanguage[]=en&includes[]=cover_art`
2. Detail `GET /manga/{id}` tambah `GET /manga/{id}/feed?translatedLanguage[]=id,en&order[chapter]=asc`
3. Reader `GET /at-home/server/{chapterId}` jadi `baseUrl`, `chapterHash`, `data`, `dataSaver`, lalu rakit URL gambar.
4. Toggle ID dan EN mengganti param `translatedLanguage[]`, simpan di URL `?lang=id`.

Cache: metadata 1 jam, feed 10 menit, at-home 30 menit dengan retry 1x, fallback `forcePort443=true`.

## 3. Halaman dan Komponen

Routes:
- `/` homepage dengan search bar, strip trending, update ID terbaru.
- `/search?q=` grid `MangaCard` berisi cover, judul, status, badge ID dan EN.
- `/manga/[id]` detail dengan `ChapterList`.
- `/chapter/[chapterId]?manga=ID&lang=id` reader murni.

ChapterList dikelompokkan per bahasa, sort desc default, menampilkan volume, chapter, tanggal, bahasa.

Reader:
- Vertical scroll default, lazy load per gambar, klik untuk toolbar.
- Toolbar berisi prev dan next chapter sebahasa, judul chapter, toggle ID dan EN, toggle hemat data `data` lawan `dataSaver`, progres baca persen.
- Pakai `img` biasa, bukan `next/image`, dengan `loading=lazy`.
- Mobile-first, lebar maksimal 800px tengah, background hitam.

Komponen: `SearchBar`, `MangaCard`, `ChapterList`, `ReaderView`, `LangToggle`, `ReaderToolbar`.

## 4. Tema Gelap

Arah dibaca sebagai reader untuk sesi panjang di HP dan desktop, gaya content-first tenang, dial ENERGY 1, RHYTHM 1, MOTION 1. Tanpa DESIGN.md penuh, ini draft yang dikunci di sini.

Alasan dark: halaman baca gambar panjang butuh background gelap agar fokus ke artwork dan mata tidak cepat lelah.

Token:
- App `zinc-950 #09090b`. Alasan: netral gelap menjaga kontras AA.
- Surface `zinc-900`, border `zinc-800`, teks `zinc-100`, sekunder `zinc-400`.
- Area baca `#000`. Alasan: kontras maksimal dengan chrome UI.
- Aksen tunggal `amber-400 #fbbf24` hanya untuk progres dan chapter aktif. Alasan: lolos kontras di atas hitam dan tidak bersaing dengan artwork.
- Verifikasi ui-ux-pro-max: style `dark-mode-oled` dengan `#000000`, `#121212`, teks `#FFFFFF`, kontras 7:1 lebih, glow minimal. Warna entertainment dark `#0F0F23` background, `#1B1B30` card, `#27273B` muted, `#94A3B8` muted foreground, `#F8FAFC` foreground. Aksen spotlight gold `#CA8A04` sekeluarga dengan amber.
- Tipografi terbaca: heading `Lexend`, body `Source Sans 3`. Alasan: Lexend dirancang untuk keterbacaan dan aksesibilitas.
- Tanpa gradient biru ungu, tanpa glass di semua permukaan, tanpa glow. Toolbar solid.
- Toggle terang dan gelap dua-duanya diverifikasi, default gelap.

## 5. Error Handling

- 429: retry backoff sekali di Route Handler, lalu pesan coba lagi 30 detik.
- At-home 404 atau expire: refetch sekali, fallback `forcePort443=true`.
- Chapter ID kosong: empty state jelas dengan tombol switch ke EN.
- Gambar gagal: placeholder per halaman dengan retry, bukan gagal seluruh chapter.

## 6. Testing

Manual: search Solo Leveling, buka detail, switch ID dan EN, baca 1 chapter full, cek prev dan next, cek hemat data.
Otomatis: unit rakit URL gambar at-home, e2e 1 alur search ke reader.

## 7. Batasan MVP

Tanpa login, tanpa bookmark dan history, tanpa komentar, tanpa download, `contentRating=safe+suggestive` saja, tanpa Consumet self-host.
