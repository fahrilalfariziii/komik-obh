import { describe, it, expect } from "vitest";
import { buildPageUrls } from "../lib/mangadex";

describe("buildPageUrls", () => {
  it("merakit URL dataSaver dengan benar", () => {
    const urls = buildPageUrls("https://cdn.test", "abc123", ["p1.jpg"], ["p1.jpg"], true);
    expect(urls).toEqual(["https://cdn.test/data-saver/abc123/p1.jpg"]);
  });
});
