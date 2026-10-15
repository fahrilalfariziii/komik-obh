# DESIGN.md: KomikReader

Dokumen arah desain. Sumber kebenaran untuk token, dial, dan alasan keputusan visual.
Antislop memfilter di atas dokumen ini; dokumen ini yang memberi "jiwa" visual.

## Identitas

KomikReader adalah aplikasi baca komik privat untuk satu pemilik. Isinya: katalog komik,
daftar chapter, dan pembaca gambar. Visualnya mengikuti bahasa **katalog gelap editorial**:
rapi seperti daftar pustaka, bukan seperti landing page produk.

Referensi: komiku.org diambil sebagai **pola informasi** (blok peringkat bernomor,
feed update, chip genre, nav kategori), bukan sebagai tampilan visual yang ditiru.

## Dial

| Dial | Nilai | Alasan |
|------|-------|--------|
| ENERGY | 2 | Konten yang penting adalah sampul dan judul, bukan dekorasi. Hero tenang, aksen muncul di titik kunci saja. |
| RHYTHM | 2 | Bagian berganti komposisi (list peringkat, feed horizontal, grid), tapi tetap satu bahasa visual. |
| MOTION | 1 | Hover/focus transition saja. Tanpa scroll-reveal agar ringan di perangkat lemah dan tetap tenang saat membaca. |

## Palet

Netral zinc sebagai latar, satu aksen amber. Tidak ada warna kedua selain sinyal status.

| Token | Nilai | Peran |
|-------|-------|-------|
| `--app-bg` | `#09090b` | Latar halaman |
| `--surface` | `#121216` | Bidang kartu, lebih terang dari latar |
| `--surface-raised` | `#1b1b21` | Bidang naik (hover, badge nomor) |
| `--border` | `#2a2a31` | Garis kartu/pemisah |
| `--border-strong` | `#3f3f46` | Garis kontrol/input |
| `--text` | `#f4f4f5` | Teks utama |
| `--text-muted` | `#a1a1aa` | Teks sekunder (>=4.5:1 di atas surface) |
| `--accent` | `#fbbf24` | Aksen tunggal: aksi utama, penanda posisi baca |
| `--accent-ink` | `#0b0b0d` | Teks di atas tombol aksen |

Kontras terverifikasi (WCAG): zinc-400 `#a1a1aa` 7.29:1 di atas surface, amber-400
11.19:1 di atas surface, zinc-100 17.0:1. zinc-500 hanya dipakai untuk teks besar
atau elemen non-teks di atas latar `--app-bg`.

## Tipografi

Font sistem (Geist/Inter/`system-ui`) untuk UI, Georgia/serif untuk badan sinopsis.
Alasan: font sistem sudah optimal untuk rendering cepat dan tidak menambah unduhan;
serif memisahkan prosa sinopsis dari UI.

Skala: `text-3xl` (judul hero), `text-xl` (judul halaman), `text-base` (judul kartu),
`text-sm` (body), `text-xs` (metadata). Angka peringkat memakai `tabular-nums`.

## Motif Identitas

Nomor peringkat besar (angka amber, `tabular-nums`) yang muncul di blok Peringkat dan
kartu yang duduk di atasnya. Diulang sebagai penanda "posisi" di beranda dan halaman
`/peringkat`. Satu pola, dipakai konsisten, dan hanya di tempat yang punya makna: urutan
nyata dari data, bukan hiasan.

## Keputusan dan Alasan (satu baris per keputusan)

- **Kartu duduk di atas cover**: memberi kontras teks pada sampul apa pun (R-25, R-12), dan menandai bidang kartu.
- **Angka peringkat besar**: menandai urutan nyata dari data populer, bukan hiasan (R-17, R-31).
- **Aksen hanya untuk aksi baca dan posisi baca**: satu aksen di titik kunci (R-13, R-29).
- **Kartu memiliki garis aksen hanya pada hover**: mengarahkan perhatian, bukan dekorasi tetap (R-19).
- **Ikon SVG buatan sendiri, satu berat garis 1.75**: menghindari keseragaman ikon pustaka (R-04).
- **Feed update berbentuk baris, bukan grid**: satu baris membawa judul + jenis + chapter + waktu dalam satu tatapan (R-05).
- **Reader berlatar hitam pekat**: memisahkan gambar komik dari UI tanpa distraksi (R-21).
- **Pemisah halaman berlabel angka**: komik strip bisa punya margin putih tipis; label mencegah halaman terlihat menyatu (R-31).

## Yang sengaja tidak dibuat

- Tanpa toggle tema. Aplikasi ini dibuka untuk membaca, sering di malam hari; latar gelap
  adalah keputusan produk, bukan tren. Satu tema yang benar lebih baik daripada dua tema
  setengah jadi (R-21, R-34).
- Tanpa fitur tanpa tujuan: tanpa statistik karangan, tanpa bookmark/history (belum ada penyimpanan), tanpa halaman di navbar yang tidak ada isinya (R-17, R-24, R-38).
