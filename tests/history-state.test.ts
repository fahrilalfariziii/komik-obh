import { describe, it, expect } from "vitest";
import {
  formatPosition,
  fmtRel,
  inRanges,
  isCompleted,
  mergeRanges,
  mergeWatchPayload,
  parseNum,
  resumeFor,
  type Range,
} from "../lib/history-state";

describe("mergeRanges", () => {
  it("set kosong menjadi rentang tunggal", () => {
    expect(mergeRanges([], 1)).toEqual([{ from: 1, to: 1 }]);
  });

  it("nomor float 10.5 jadi rentang sendiri", () => {
    expect(mergeRanges([], 10.5)).toEqual([{ from: 10.5, to: 10.5 }]);
  });

  it("chapter berurutan menenggelamkan rentang", () => {
    const set: Range[] = [{ from: 1, to: 2 }];
    expect(mergeRanges(set, 3)).toEqual([{ from: 1, to: 3 }]);
  });

  it("rentang berlebih (overlap) tetap satu rentang", () => {
    const set: Range[] = [{ from: 1, to: 5 }];
    expect(mergeRanges(set, 3)).toEqual([{ from: 1, to: 5 }]);
  });

  it("nomor berjarak tidak digabung", () => {
    const set: Range[] = [{ from: 1, to: 2 }];
    expect(mergeRanges(set, 9)).toEqual([
      { from: 1, to: 2 },
      { from: 9, to: 9 },
    ]);
  });

  it("input tidak diubah (murni)", () => {
    const set: Range[] = [{ from: 1, to: 2 }];
    mergeRanges(set, 3);
    expect(set).toEqual([{ from: 1, to: 2 }]);
  });
});

describe("inRanges", () => {
  const set: Range[] = [
    { from: 1, to: 12 },
    { from: 10.5, to: 10.5 },
    { from: 15, to: 15 },
  ];

  it("nomor di dalam rentang", () => {
    expect(inRanges(set, 7)).toBe(true);
  });

  it("nomor float exact", () => {
    expect(inRanges(set, 10.5)).toBe(true);
  });

  it("nomor 10 tidak masuk hanya karena ada 10.5", () => {
    expect(inRanges([{ from: 10.5, to: 10.5 }], 10)).toBe(false);
  });

  it("nomor di luar semua rentang", () => {
    expect(inRanges(set, 20)).toBe(false);
  });
});

describe("mergeWatchPayload", () => {
  it("rewind: posisi lebih kecil tidak menurunkan tersimpanan", () => {
    const prev = { position: 600, duration: 4523 };
    const next = { position: 420, duration: 4523 };
    expect(mergeWatchPayload(prev, next).position).toBe(600);
  });

  it("prev null mengikuti next", () => {
    expect(mergeWatchPayload(null, { position: 300, duration: 4523 })).toEqual({
      position: 300,
      duration: 4523,
    });
  });

  it("durasi selalu dari next", () => {
    const prev = { position: 600, duration: 1000 };
    const next = { position: 700, duration: 2000 };
    expect(mergeWatchPayload(prev, next)).toEqual({ position: 700, duration: 2000 });
  });

  it("kedua posisi tak-angka menghasilkan null", () => {
    expect(mergeWatchPayload(null, { position: null })).toEqual({ position: null });
  });
});

describe("isCompleted", () => {
  it("0.94 belum selesai", () => {
    expect(isCompleted(940, 1000)).toBe(false);
  });

  it("0.95 selesai", () => {
    expect(isCompleted(950, 1000)).toBe(true);
  });

  it("durasi 0 / NaN belum selesai", () => {
    expect(isCompleted(10, 0)).toBe(false);
    expect(isCompleted(10, NaN)).toBe(false);
  });

  it("posisi null belum selesai", () => {
    expect(isCompleted(null, 4523)).toBe(false);
  });
});

describe("resumeFor", () => {
  const payload = { episodeId: "eps-3", position: 754, duration: 4523 };

  it("episode cocok dan belum selesai: kembalikan posisi", () => {
    expect(resumeFor(payload, "eps-3")).toBe(754);
  });

  it("payload null", () => {
    expect(resumeFor(null, "eps-3")).toBeNull();
  });

  it("episode berbeda: null", () => {
    expect(resumeFor(payload, "eps-4")).toBeNull();
  });

  it("sudah selesai: null", () => {
    const done = { episodeId: "eps-3", position: 4500, duration: 4523 };
    expect(resumeFor(done, "eps-3")).toBeNull();
  });
});

describe("formatPosition", () => {
  it("null menjadi 0:00", () => {
    expect(formatPosition(null)).toBe("0:00");
  });

  it("menit:detik", () => {
    expect(formatPosition(754)).toBe("12:34");
  });

  it("jam:menit:detik", () => {
    expect(formatPosition(4523)).toBe("1:15:23");
  });
});

describe("fmtRel", () => {
  it("baru saja", () => {
    expect(fmtRel(new Date(Date.now() - 10_000).toISOString())).toBe("baru saja");
  });

  it("x menit lalu", () => {
    expect(fmtRel(new Date(Date.now() - 5 * 60_000).toISOString())).toBe("5 menit lalu");
  });

  it("x jam lalu", () => {
    expect(fmtRel(new Date(Date.now() - 3 * 3_600_000).toISOString())).toBe("3 jam lalu");
  });

  it("x hari lalu", () => {
    expect(fmtRel(new Date(Date.now() - 2 * 86_400_000).toISOString())).toBe("2 hari lalu");
  });

  it("lebih dari 30 hari: tanggal d MMM yyyy", () => {
    expect(fmtRel("2026-08-01T10:00:00Z")).toBe("1 Agu 2026");
  });

  it("input tak-valid: tanda hubung", () => {
    expect(fmtRel("bukan-tanggal")).toBe("-");
  });
});

describe("parseNum", () => {
  it("Chapter 10.5 menjadi 10.5", () => {
    expect(parseNum("Chapter 10.5")).toBe(10.5);
  });

  it("Ep 12 menjadi 12", () => {
    expect(parseNum("Ep 12")).toBe(12);
  });

  it("angka langsung", () => {
    expect(parseNum(10)).toBe(10);
  });

  it("TBD / bullet / kosong / null / undefined: null", () => {
    expect(parseNum("TBD")).toBeNull();
    expect(parseNum("•")).toBeNull();
    expect(parseNum("")).toBeNull();
    expect(parseNum(null)).toBeNull();
    expect(parseNum(undefined)).toBeNull();
  });
});
