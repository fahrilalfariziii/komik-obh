import { describe, it, expect } from "vitest";
import {
  anoboySearchUrl,
  anoboyDetailUrl,
  anoboyEpisodeUrl,
  slugFromAnoboyHref,
  friendlyAnoboyError,
} from "../lib/anime-anoboy";

describe("anoboy urls", () => {
  it("search memakai path param + page", () => {
    expect(anoboySearchUrl("one piece")).toBe(
      "https://www.sankavollerei.web.id/anime/anoboy/search/one%20piece?page=1"
    );
  });
  it("detail dari slug", () => {
    expect(anoboyDetailUrl("one-piece")).toBe(
      "https://www.sankavollerei.web.id/anime/anoboy/anime/one-piece"
    );
  });
  it("episode dari slug", () => {
    expect(anoboyEpisodeUrl("one-piece-episode-1180-subtitle-indonesia")).toBe(
      "https://www.sankavollerei.web.id/anime/anoboy/episode/one-piece-episode-1180-subtitle-indonesia"
    );
  });
});

describe("slugFromAnoboyHref", () => {
  it("slug polos", () => {
    expect(slugFromAnoboyHref("one-piece")).toBe("one-piece");
  });
  it("url penuh upstream", () => {
    expect(slugFromAnoboyHref("https://anoboy.be/one-piece-episode-1180-subtitle-indonesia/")).toBe(
      "one-piece-episode-1180-subtitle-indonesia"
    );
  });
  it("membuang query dan hash", () => {
    expect(slugFromAnoboyHref("/anime/x-sub-indo?y=1")).toBe("x-sub-indo");
    expect(slugFromAnoboyHref("/anime/x-sub-indo#e")).toBe("x-sub-indo");
  });
});

describe("friendlyAnoboyError", () => {
  it("fetch failed menyebut sumber", () => {
    expect(friendlyAnoboyError(new TypeError("fetch failed"))).toContain("sankavollerei");
  });
  it("429 menyebut 45/menit", () => {
    expect(friendlyAnoboyError(new Error("429"))).toContain("45/menit");
  });
});
