import { describe, it, expect } from "vitest";
import {
  animeHomeUrl,
  ongoingUrl,
  completeUrl,
  animeDetailUrl,
  episodeUrl,
  serverUrl,
  animeSearchUrl,
  scheduleUrl,
  genreUrl,
  slugFromAnimeHref,
  pickStreamUrl,
  friendlyAnimeError,
} from "../lib/anime";

describe("anime urls", () => {
  it("home mengarah ke /anime/home", () => {
    expect(animeHomeUrl()).toBe("https://www.sankavollerei.web.id/anime/home");
  });
  it("ongoing membawa page", () => {
    expect(ongoingUrl(2)).toBe("https://www.sankavollerei.web.id/anime/ongoing-anime?page=2");
  });
  it("complete membawa page", () => {
    expect(completeUrl(1)).toBe("https://www.sankavollerei.web.id/anime/complete-anime?page=1");
  });
  it("detail encode sekali untuk slug ber-encoding", () => {
    expect(animeDetailUrl("bang-dream-yume∞mita-sub-indo")).toBe(
      "https://www.sankavollerei.web.id/anime/anime/bang-dream-yume%E2%88%9Emita-sub-indo"
    );
  });
  it("episode dari slug", () => {
    expect(episodeUrl("tskd-s2-episode-3-sub-indo")).toBe(
      "https://www.sankavollerei.web.id/anime/episode/tskd-s2-episode-3-sub-indo"
    );
  });
  it("server dari id", () => {
    expect(serverUrl("75BB8C-5-8B5u")).toBe(
      "https://www.sankavollerei.web.id/anime/server/75BB8C-5-8B5u"
    );
  });
  it("search encode spasi dan simbol", () => {
    expect(animeSearchUrl("Re:Zero one")).toBe(
      "https://www.sankavollerei.web.id/anime/search/Re%3AZero%20one"
    );
  });
  it("schedule tanpa param", () => {
    expect(scheduleUrl()).toBe("https://www.sankavollerei.web.id/anime/schedule");
  });
  it("genre membawa slug dan page", () => {
    expect(genreUrl("action", 2)).toBe(
      "https://www.sankavollerei.web.id/anime/genre/action?page=2"
    );
  });
});

describe("slugFromAnimeHref", () => {
  it("path relatif upstream", () => {
    expect(slugFromAnimeHref("/anime/anime/tensei-deshita-s2-sub-indo")).toBe(
      "tensei-deshita-s2-sub-indo"
    );
  });
  it("url penuh dengan trailing slash", () => {
    expect(
      slugFromAnimeHref("https://otakudesu.blog/anime/sasaki-pii-chan-s2-sub-indo/")
    ).toBe("sasaki-pii-chan-s2-sub-indo");
  });
  it("slug jadwal polos", () => {
    expect(slugFromAnimeHref("doumo-suki-majo-sub-indo")).toBe("doumo-suki-majo-sub-indo");
  });
});

describe("pickStreamUrl", () => {
  it("pakai resolved bila serverId cocok dan resolved ada", () => {
    expect(pickStreamUrl("def", "https://x/embed/1", "A")).toBe("https://x/embed/1");
  });
  it("fallback default bila serverId kosong", () => {
    expect(pickStreamUrl("def", "https://x/embed/1", "")).toBe("def");
  });
  it("fallback default bila resolved kosong", () => {
    expect(pickStreamUrl("def", "", "A")).toBe("def");
  });
});

describe("friendlyAnimeError", () => {
  it("fetch failed menyebut sumber", () => {
    expect(friendlyAnimeError(new TypeError("fetch failed"))).toContain("sankavollerei");
  });
  it("429 menyebut 45/menit", () => {
    expect(friendlyAnimeError(new Error("Rate limit API 45/menit tercapai"))).toContain("45/menit");
  });
});
