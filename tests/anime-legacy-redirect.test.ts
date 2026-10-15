import { describe, it, expect, vi, beforeEach } from "vitest";
import { partialNotice } from "../lib/anime-sources";

const stores = vi.hoisted(() => ({
  redirects: [] as Array<{ url: string; type?: string }>,
  ownerCalls: 0,
}));

vi.mock("next/navigation", () => ({
  redirect: (url: string, type?: string) => {
    stores.redirects.push({ url, type });
    throw new Error("NEXT_REDIRECT");
  },
  RedirectType: { push: "push", replace: "replace" },
}));

vi.mock("@/lib/gate", () => ({
  requireOwner: async () => {
    stores.ownerCalls++;
  },
}));

import LegacySlugRedirect from "../app/anime/[slug]/page";
import LegacyWatchRedirect from "../app/anime/watch/[episodeId]/page";

beforeEach(() => {
  stores.redirects = [];
  stores.ownerCalls = 0;
});

describe("partialNotice", () => {
  it("keduanya gagal jadi pesan kedua sumber", () => {
    expect(partialNotice({ otakudesu: true, anoboy: true }, false)).toBe(
      "Kedua sumber (Otakudesu dan Anoboy) tidak merespons. Coba lagi."
    );
  });
  it("satu gagal + ada hasil jadi klaim hasil tersedia", () => {
    expect(partialNotice({ otakudesu: true, anoboy: false }, true)).toBe(
      "Otakudesu tidak merespons, menampilkan hasil yang tersedia."
    );
    expect(partialNotice({ otakudesu: false, anoboy: true }, true)).toBe(
      "Anoboy tidak merespons, menampilkan hasil yang tersedia."
    );
  });
  it("satu gagal tanpa hasil jadi ajakan coba lagi", () => {
    expect(partialNotice({ otakudesu: false, anoboy: true }, false)).toBe(
      "Anoboy tidak merespons. Coba lagi."
    );
  });
  it("tak ada gagal jadi null", () => {
    expect(partialNotice({ otakudesu: false, anoboy: false }, true)).toBeNull();
    expect(partialNotice({ otakudesu: false, anoboy: false }, false)).toBeNull();
  });
});

describe("legacy slug redirect", () => {
  it("gate dulu lalu redirect permanen ke prefix", async () => {
    await expect(
      LegacySlugRedirect({ params: Promise.resolve({ slug: "x-id" }) })
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(stores.ownerCalls).toBe(1);
    expect(stores.redirects).toEqual([{ url: "/anime/otakudesu/x-id", type: "replace" }]);
  });
  it("slug id sumber ke /anime permanen", async () => {
    await expect(
      LegacySlugRedirect({ params: Promise.resolve({ slug: "anoboy" }) })
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(stores.redirects).toEqual([{ url: "/anime", type: "replace" }]);
  });
});

describe("legacy watch redirect", () => {
  it("pertahankan query + redirect permanen", async () => {
    await expect(
      LegacyWatchRedirect({
        params: Promise.resolve({ episodeId: "e1" }),
        searchParams: Promise.resolve({ server: "A", quality: "720p" }),
      })
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(stores.ownerCalls).toBe(1);
    expect(stores.redirects).toEqual([
      { url: "/anime/otakudesu/watch/e1?server=A&quality=720p", type: "replace" },
    ]);
  });
  it("tanpa query tanpa tanda tanya", async () => {
    await expect(
      LegacyWatchRedirect({
        params: Promise.resolve({ episodeId: "e1" }),
        searchParams: Promise.resolve({}),
      })
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(stores.redirects).toEqual([{ url: "/anime/otakudesu/watch/e1", type: "replace" }]);
  });
});
