import { describe, it, expect } from "vitest";
import { feedQuery } from "../lib/mangadex";

describe("feedQuery", () => {
  it("memakai translatedLanguage id dan en", () => {
    const q = feedQuery("manga-1", "id");
    expect(q).toContain("translatedLanguage[]=id");
  });
});
