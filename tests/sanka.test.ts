import { describe, it, expect } from "vitest";
import {
  chapterUrl,
  comicUrl,
  searchUrl,
  friendlySankaError,
  pickPages,
} from "../lib/sanka";

describe("sanka urls", () => {
  it("membangun url search dengan query", () => {
    expect(searchUrl("solo leveling")).toContain("/comic/search?q=solo%20leveling");
  });

  it("membangun url detail dari slug", () => {
    expect(comicUrl("solo-leveling-id")).toContain("/comic/comic/solo-leveling-id");
  });

  it("membangun url chapter dari slug", () => {
    expect(chapterUrl("solo-leveling-chapter-1")).toContain(
      "/comic/chapter/solo-leveling-chapter-1"
    );
  });
});

describe("pickPages", () => {
  it("memakai imagesproxy saat mode proxy", () => {
    const pages = pickPages(["a.jpg"], ["proxy-a.jpg"], true);
    expect(pages).toEqual(["proxy-a.jpg"]);
  });

  it("memakai images langsung saat mode langsung", () => {
    const pages = pickPages(["a.jpg"], ["proxy-a.jpg"], false);
    expect(pages).toEqual(["a.jpg"]);
  });
});

describe("friendlySankaError", () => {
  it("memetakan fetch failed menjadi pesan blokir", () => {
    const msg = friendlySankaError(new TypeError("fetch failed"));
    expect(msg).toContain("sankavollerei");
  });
});
