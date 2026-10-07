import { describe, it, expect } from "vitest";
import { nextChapterSameLang } from "../lib/reader";

describe("nextChapterSameLang", () => {
  it("memilih chapter berikut dalam bahasa aktif", () => {
    const list = [{ id: "a", chapter: "1" }, { id: "b", chapter: "2" }];
    expect(nextChapterSameLang(list, "a")).toBe("b");
  });
});
