const TABLES = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
] as const;

// Angka romawi untuk penanda katalog (halaman, urutan). Rentang 1-3999.
export function toRoman(value: number): string {
  if (!Number.isFinite(value) || value < 1 || value > 3999) return String(value);
  let n = Math.floor(value);
  let out = "";
  for (const [v, s] of TABLES) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}
