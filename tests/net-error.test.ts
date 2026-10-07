import { describe, it, expect } from "vitest";
import { friendlyMangaDexError } from "../lib/mangadex";

describe("friendlyMangaDexError", () => {
  it("memetakan fetch failed menjadi pesan blokir DNS", () => {
    const msg = friendlyMangaDexError(new TypeError("fetch failed"));
    expect(msg).toContain("api.mangadex.org");
  });
});
