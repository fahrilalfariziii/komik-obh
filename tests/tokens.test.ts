import { describe, it, expect } from "vitest";
import { themeTokens } from "../lib/theme";

describe("themeTokens", () => {
  it("memakai dasar gelap OLED tanpa gradient", () => {
    expect(themeTokens.appBg).toBe("#09090b");
    expect(themeTokens.readerBg).toBe("#000000");
    expect(themeTokens.accent).toBe("#fbbf24");
  });
});
