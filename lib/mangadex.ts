const BASE = "https://api.mangadex.org";

export function buildPageUrls(
  baseUrl: string,
  hash: string,
  data: string[],
  dataSaver: string[],
  saver: boolean
) {
  const files = saver ? dataSaver : data;
  const folder = saver ? "data-saver" : "data";
  return files.map((f) => `${baseUrl}/${folder}/${hash}/${f}`);
}

export function feedQuery(mangaId: string, lang: string) {
  return `manga/${mangaId}/feed?translatedLanguage[]=${lang}&order[chapter]=asc&limit=500`;
}

export function friendlyMangaDexError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  if (/fetch failed|ENOTFOUND|EAI_AGAIN|ECONNRESET|certificate|SSL/i.test(raw)) {
    return "Tidak bisa mencapai api.mangadex.org (fetch failed). Di jaringan Indonesia domain ini sering dibajak DNS ke aduankonten.id (Internet Positif). Aktifkan DNS-over-HTTPS di perangkat atau deploy server di luar ID, lalu coba lagi.";
  }
  return raw;
}

async function mdFetch(path: string, revalidate: number) {
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    let res;
    try {
      res = await fetch(`${BASE}/${path}`, {
        next: { revalidate },
        headers: { "User-Agent": "komik-reader/0.1" },
      });
    } catch (e) {
      throw new Error(friendlyMangaDexError(e));
    }
    if (res.status === 429 && attempt === 0) {
      await new Promise((r) => setTimeout(r, 1200));
      continue;
    }
    if (!res.ok) {
      lastErr = new Error(`MangaDex ${res.status} untuk ${path}`);
      break;
    }
    return res.json();
  }
  throw lastErr instanceof Error ? lastErr : new Error("MangaDex gagal");
}

export function searchManga(q: string) {
  const p = `manga?title=${encodeURIComponent(q)}&availableTranslatedLanguage[]=id&availableTranslatedLanguage[]=en&includes[]=cover_art&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&limit=24`;
  return mdFetch(p, 3600);
}

export function getManga(id: string) {
  return mdFetch(`manga/${id}?includes[]=cover_art&includes[]=author`, 3600);
}

export function getFeed(id: string, lang: string) {
  const langs =
    lang === "id"
      ? "translatedLanguage[]=id&translatedLanguage[]=en"
      : "translatedLanguage[]=en&translatedLanguage[]=id";
  return mdFetch(`manga/${id}/feed?${langs}&order[chapter]=asc&limit=500&includes[]=scanlation_group`, 600);
}

export async function getAtHome(chapterId: string) {
  for (const suffix of ["", "?forcePort443=true"]) {
    const res = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}${suffix}`, {
      next: { revalidate: 1800 },
    });
    if (res.ok) return res.json();
  }
  throw new Error("At-home tidak tersedia");
}
