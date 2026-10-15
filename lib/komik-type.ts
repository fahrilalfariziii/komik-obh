// Utilitas jenis komik. Endpoint pencarian sumber sudah menyediakan field `type`
// (mis. "Manhwa"), jadi nilai itu dipakai langsung. Fungsi di bawah hanya untuk
// kasus tanpa field type.

export type SankaType = "Manga" | "Manhwa" | "Manhua" | string;

const COLOR_KEYS = ["colored", "berwarna", "full color", "webtoon"];
const MANHWA_KEYS = ["manhwa"];
const MANHUA_KEYS = ["manhua"];
const MANGA_KEYS = ["manga"];

const normalise = (values: string[]) => values.join(" ").toLowerCase();
const has = (haystack: string, keys: string[]) => keys.some((k) => haystack.includes(k));

// Perkiraan jenis dari nama genre, hanya dipakai bila field type tidak ada.
export function komikType(genres?: string[]): string | undefined {
  if (!genres?.length) return undefined;
  const text = normalise(genres);
  if (has(text, COLOR_KEYS)) return "Berwarna";
  if (has(text, MANHWA_KEYS)) return "Manhwa";
  if (has(text, MANHUA_KEYS)) return "Manhua";
  if (has(text, MANGA_KEYS)) return "Manga";
  return undefined;
}

export type TypeFilter = "all" | "manhwa" | "manhua" | "manga";

export const TYPE_OPTIONS: Array<{ value: TypeFilter; label: string }> = [
  { value: "all", label: "Semua" },
  { value: "manhwa", label: "Manhwa" },
  { value: "manhua", label: "Manhua" },
  { value: "manga", label: "Manga" },
];

export function isTypeFilter(value: string | undefined): value is TypeFilter {
  return TYPE_OPTIONS.some((o) => o.value === value);
}

// Cocokkan field type dari API dengan filter yang dipilih.
export function matchesType(type: string | undefined, filter: string): boolean {
  if (filter === "all") return true;
  if (!type) return false;
  return type.toLowerCase() === filter.toLowerCase();
}
