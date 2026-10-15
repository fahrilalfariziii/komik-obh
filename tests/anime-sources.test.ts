import { describe, it, expect, vi, afterEach } from "vitest";
import {
  fromAnoboyDetail,
  fromAnoboyEpisode,
  fromOtakudesuDetail,
  legacySlugTarget,
  searchAllAnime,
  type AnimeResult,
} from "../lib/anime-sources";

afterEach(() => {
  vi.unstubAllGlobals();
});

const anoboyItem = {
  title: "\n  One Piece: Gyojin Tou-hen  ",
  slug: "one-piece-gyojin-tou-hen",
  poster: "https://anoboy.be/x.jpg",
  status: "Completed",
  type: "TV",
};

const anoboyDetail = {
  title: "One Piece",
  poster: "https://anoboy.be/y.jpg",
  synopsis: "  Luffy berlayar.  ",
  info: {
    status: "Ongoing",
    studio: "Toei Animation",
    released: "1999",
    duration: "24 min.",
    type: "TV",
  },
  genres: [{ name: " Action ", slug: "action" }],
  episode_list: [
    {
      slug: "one-piece-episode-1180-subtitle-indonesia",
      title: "One Piece Episode 1180 Subtitle Indonesia",
      episode: "1180",
      release_date: "September 26, 2026",
    },
  ],
};

const anoboyEpisode = {
  title: "One Piece Episode 1180 Subtitle Indonesia",
  streams: [{ name: "Stream Utama", url: "https://stream/x" }],
  downloads: [],
};

const otakudesuDetail = {
  title: "Tensei S2",
  poster: "https://otakudesu.blog/z.jpg",
  type: "TV",
  status: "Ongoing",
  score: "7.51",
  studios: "C2C",
  duration: "24 Menit",
  aired: "Okt 01, 2026",
  synopsis: { paragraphs: ["Paragraf satu.", "Paragraf dua."], connections: [] },
  genreList: [{ title: "Action", genreId: "action", href: "/anime/genre/action", otakudesuUrl: "" }],
  episodeList: [
    {
      title: "Eps 3",
      eps: 3,
      date: "15 Oktober,2026",
      episodeId: "tskd-s2-episode-3-sub-indo",
      href: "",
      otakudesuUrl: "",
    },
  ],
  recommendedAnimeList: [{ title: "R", poster: "p", animeId: "r-id", href: "", otakudesuUrl: "" }],
};

function stubFetch(handler: (url: string) => unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => ({
      ok: true,
      status: 200,
      json: async () => handler(url),
    }))
  );
}

describe("normalisasi Anoboy", () => {
  it("item search mentah jadi AnimeResult benar", async () => {
    stubFetch(() => ({ anime_list: [anoboyItem] }));
    const { results } = await searchAllAnime("one piece", 50);
    const ano = results.find((r: AnimeResult) => r.source === "anoboy");
    expect(ano?.title).toBe("One Piece: Gyojin Tou-hen");
    expect(ano?.detailHref).toBe("/anime/anoboy/one-piece-gyojin-tou-hen");
    expect(ano?.meta).toContain("TV");
  });
  it("detail Anoboy jadi view benar", () => {
    const v = fromAnoboyDetail(anoboyDetail);
    expect(v.title).toBe("One Piece");
    expect(v.synopsis).toBe("Luffy berlayar.");
    expect(v.episodes[0]).toMatchObject({
      id: "one-piece-episode-1180-subtitle-indonesia",
      eps: "1180",
    });
    expect(v.genres[0]).toEqual({ id: "action", title: "Action" });
  });
  it("episode Anoboy jadi view benar", () => {
    const v = fromAnoboyEpisode(anoboyEpisode);
    expect(v.defaultStream).toBe("https://stream/x");
    expect(v.serverGroups).toEqual([]);
    expect(v.detailHref).toBeNull();
  });
});

describe("normalisasi Otakudesu", () => {
  it("detail jadi view dengan chips dan episode", () => {
    const v = fromOtakudesuDetail(otakudesuDetail);
    expect(v.chips).toContain("Skor 7.51");
    expect(v.synopsis).toContain("Paragraf satu.");
    expect(v.episodes[0].id).toBe("tskd-s2-episode-3-sub-indo");
    expect(v.recommendations[0].detailHref).toBe("/anime/otakudesu/r-id");
  });
});

describe("searchAllAnime", () => {
  it("satu sumber gagal, hasil lain utuh + flag partial", async () => {
    stubFetch((url: string) => {
      if (url.includes("/anoboy/")) throw new Error("500");
      return { data: { animeList: [{ title: "T", poster: "p", animeId: "t-id", href: "" }] } };
    });
    const { results, partial } = await searchAllAnime("x", 50);
    expect(results.length).toBe(1);
    expect(results[0].source).toBe("otakudesu");
    expect(partial).toEqual({ otakudesu: false, anoboy: true });
  });
  it("timeout diperlakukan gagal", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {}))
    );
    const { results, partial } = await searchAllAnime("x", 20);
    expect(results).toEqual([]);
    expect(partial).toEqual({ otakudesu: true, anoboy: true });
  });
  it("keduanya kosong jadi list kosong", async () => {
    stubFetch((url: string) =>
      url.includes("/anoboy/") ? { anime_list: [] } : { data: { animeList: [] } }
    );
    const { results } = await searchAllAnime("zzz", 50);
    expect(results).toEqual([]);
  });
});

describe("legacySlugTarget", () => {
  it("slug id sumber ke /anime", () => {
    expect(legacySlugTarget("anoboy")).toBe("/anime");
    expect(legacySlugTarget("otakudesu")).toBe("/anime");
  });
  it("slug biasa ke prefix otakudesu", () => {
    expect(legacySlugTarget("tensei-deshita-s2-sub-indo")).toBe(
      "/anime/otakudesu/tensei-deshita-s2-sub-indo"
    );
  });
});
