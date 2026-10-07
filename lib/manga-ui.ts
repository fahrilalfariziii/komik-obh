export function mangaTitle(titles: Record<string, string>): string {
  return titles.en ?? titles["ja-ro"] ?? Object.values(titles)[0] ?? "Tanpa judul";
}

export function coverUrl(mangaId: string, relationships: Array<{ type: string; attributes?: { fileName?: string } }>): string {
  const cover = relationships.find((r) => r.type === "cover_art");
  const file = cover?.attributes?.fileName;
  if (!file) return "";
  return `https://uploads.mangadex.org/covers/${mangaId}/${file}.256.jpg`;
}
