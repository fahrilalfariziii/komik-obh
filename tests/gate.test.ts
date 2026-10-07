import { describe, it, expect } from "vitest";
import { isAllowed } from "../lib/gate";

describe("isAllowed", () => {
  it("mengizinkan email pemilik yang sama persis", () => {
    expect(isAllowed("owner@mail.com", "owner@mail.com")).toBe(true);
  });

  it("menolak email lain", () => {
    expect(isAllowed("asing@mail.com", "owner@mail.com")).toBe(false);
  });

  it("menolak saat allowlist kosong atau email kosong", () => {
    expect(isAllowed("owner@mail.com", "")).toBe(false);
    expect(isAllowed("", "owner@mail.com")).toBe(false);
  });
});
