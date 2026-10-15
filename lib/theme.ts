export const themeTokens = {
  appBg: "#09090b",
  readerBg: "#000000",
  accent: "#fbbf24",

  // Hirarki permukaan: kartu lebih terang dari latar agar terbaca sebagai bidang.
  surface: "#121216",
  surfaceRaised: "#1b1b21",
  // Garis pemisah tipis, cukup kontras di atas surface (bukan zinc-800 lama).
  border: "#2a2a31",
  borderStrong: "#3f3f46",

  // Teks: body >=4.5:1, muted hanya untuk teks besar atau non-teks.
  text: "#f4f4f5",
  textMuted: "#a1a1aa",

  accentHover: "#fcd34d",
  // Teks gelap di atas tombol aksen.
  accentInk: "#0b0b0d",
} as const;
