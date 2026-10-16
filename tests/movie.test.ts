import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  detailUrl,
  filtersUrl,
  getPlayUrl,
  homeUrl,
  moviesUrl,
  networkUrl,
  resolvePlayableUrl,
  seriesUrl,
} from "../lib/movie";

afterEach(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  vi.stubEnv("DRAKOR_API_KEY", "test-key");
});

function stubFetch(handler: (url: string, init?: RequestInit) => unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => ({
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      text: async () =>
        typeof handler(url, init) === "string"
          ? (handler(url, init) as string)
          : JSON.stringify(handler(url, init)),
      json: async () => handler(url, init),
    }))
  );
}

describe("movie urls", () => {
  it("home tanpa param", () => {
    expect(homeUrl()).toBe("https://indocast.site/api/idlix/home");
  });
  it("network membawa semua param", () => {
    expect(networkUrl("netflix", 2, "rating")).toBe(
      "https://indocast.site/api/idlix/home/network?network=netflix&page=2&limit=36&sort=rating"
    );
  });
  it("filters", () => {
    expect(filtersUrl()).toBe("https://indocast.site/api/idlix/movie/filters");
  });
  it("movies membawa page limit sort genre", () => {
    expect(moviesUrl({ page: 1, genre: "action", sort: "rating" })).toBe(
      "https://indocast.site/api/idlix/movie?page=1&limit=36&sort=rating&genre=action"
    );
  });
  it("series tanpa genre default", () => {
    expect(seriesUrl({ page: 3 })).toBe(
      "https://indocast.site/api/idlix/series?page=3&limit=36&sort=releaseDate"
    );
  });
  it("detail memakai type jamak", () => {
    expect(detailUrl("michael-2026", "movie")).toBe(
      "https://indocast.site/api/idlix/detail?slug=michael-2026&type=movies"
    );
    expect(detailUrl("the-mentalist-2008", "series")).toBe(
      "https://indocast.site/api/idlix/detail?slug=the-mentalist-2008&type=series"
    );
  });
  it("getplay movie vs series", () => {
    expect(getPlayUrl({ slug: "michael-2026", id: "abc", kind: "movie" })).toBe(
      "https://indocast.site/api/idlix/getplay?slug=michael-2026&id=abc&type=movie"
    );
    expect(getPlayUrl({ slug: "the-mentalist-2008", id: "ep-1", kind: "series" })).toBe(
      "https://indocast.site/api/idlix/getplay?slug=the-mentalist-2008&id=ep-1&type=series"
    );
  });
});

describe("resolvePlayableUrl", () => {
  it("m3u8 langsung dipakai apa adanya", async () => {
    stubFetch(() => "#EXTM3U\n#EXT-X-STREAM-INF:band\nhttps://cdn/x.m3u8");
    await expect(resolvePlayableUrl("https://proxy/cfg")).resolves.toBe("https://proxy/cfg");
  });
  it("config {file} diekstrak", async () => {
    stubFetch(() => ({ file: "https://cdn/a.m3u8?token=1" }));
    await expect(resolvePlayableUrl("https://proxy/cfg")).resolves.toBe("https://cdn/a.m3u8?token=1");
  });
  it("config {sources:[{file}]} diekstrak", async () => {
    stubFetch(() => ({ sources: [{ file: "https://cdn/b.m3u8" }] }));
    await expect(resolvePlayableUrl("https://proxy/cfg")).resolves.toBe("https://cdn/b.m3u8");
  });
  it("tanpa m3u8 melempar", async () => {
    stubFetch(() => ({ hello: "world" }));
    await expect(resolvePlayableUrl("https://proxy/cfg")).rejects.toThrow("m3u8");
  });
});
