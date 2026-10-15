import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  cariUrl,
  detailUrl,
  kategoriDetailUrl,
  kategoriUrl,
  ongoingUrl,
  playDrakor,
  terbaruUrl,
  trendingUrl,
} from "../lib/drakor";

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
      json: async () => handler(url, init),
    }))
  );
}

describe("drakor urls", () => {
  it("ongoing membawa page", () => {
    expect(ongoingUrl(2)).toBe("https://indocast.site/api/drakorid/ongoing?page=2");
  });
  it("terbaru membawa page", () => {
    expect(terbaruUrl(1)).toBe("https://indocast.site/api/drakorid/terbaru?page=1");
  });
  it("trending tanpa param", () => {
    expect(trendingUrl()).toBe("https://indocast.site/api/drakorid/trending");
  });
  it("cari encode keyword + page", () => {
    expect(cariUrl("Love in Disguise", 2)).toBe(
      "https://indocast.site/api/drakorid/cari?q=Love%20in%20Disguise&page=2"
    );
  });
  it("kategori dan detail kategori", () => {
    expect(kategoriUrl()).toBe("https://indocast.site/api/drakorid/kategori");
    expect(kategoriDetailUrl("film-korea", 1)).toBe(
      "https://indocast.site/api/drakorid/kategori/detail?slug=film-korea&page=1"
    );
  });
  it("details memakai slug", () => {
    expect(detailUrl("first-love-again-2026")).toBe(
      "https://indocast.site/api/drakorid/details?slug=first-love-again-2026"
    );
  });
});

describe("envelope API", () => {
  it("key kosong jadi error jelas", async () => {
    vi.stubEnv("DRAKOR_API_KEY", "");
    stubFetch(() => ({ code: 0, message: "ok", data: {} }));
    await expect(playDrakor("x", 1)).rejects.toThrow("belum dikonfigurasi");
  });
  it("code bukan 0 melempar pesan API", async () => {
    stubFetch(() => ({ code: 1, message: "invalid api key", data: null }));
    await expect(playDrakor("x", 1)).rejects.toThrow("invalid api key");
  });
  it("play memakai POST + header x-api-key", async () => {
    let seen: RequestInit | undefined;
    stubFetch((_url: string, init?: RequestInit) => {
      seen = init;
      return {
        code: 0,
        message: "ok",
        data: { id: "x", episode: 1, quality: 720, format: "HLS", vid_url: "u", vid_url_proxy: "p" },
      };
    });
    const d = await playDrakor("fate-chooses-you-2026", 1);
    expect(seen?.method).toBe("POST");
    expect((seen?.headers as Record<string, string>)["x-api-key"]).toBeTruthy();
    expect(JSON.parse(seen?.body as string)).toMatchObject({
      id: "fate-chooses-you-2026",
      episode: "1",
      quality: "720",
    });
    expect(d.format).toBe("HLS");
  });
});
