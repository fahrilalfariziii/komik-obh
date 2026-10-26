import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// auth() selalu mengembalikan user tiruan supaya server actions jalan di vitest.
vi.mock("@clerk/nextjs/server", () => ({
  auth: async () => ({ userId: "user_vitest_history" }),
}));

import { db } from "../lib/db";
import {
  deleteHistoryRow,
  getComicReadState,
  getHistoryRows,
  getWatchResume,
  recordComicRead,
  recordMovieProgress,
} from "../lib/history";

const USER = "user_vitest_history";
const P = "__vitest_";

describe.skipIf(!process.env.DATABASE_URL)("history db roundtrip", () => {
  beforeAll(async () => {
    await db()`DELETE FROM history WHERE user_id = ${USER} AND ref LIKE ${P + "%"}`;
  });

  afterAll(async () => {
    await db()`DELETE FROM history WHERE user_id = ${USER} AND ref LIKE ${P + "%"}`;
  });

  it("(a) komik: ch1 lalu ch3 → rentang [{1,3}] dan lastChapter 3", async () => {
    await recordComicRead({
      mangaSlug: P + "manga",
      title: "Manga Uji",
      chapterSlug: "ch-1",
      chapterNumber: 1,
    });
    await recordComicRead({
      mangaSlug: P + "manga",
      title: "Manga Uji",
      chapterSlug: "ch-3",
      chapterNumber: 3,
    });
    const state = await getComicReadState(P + "manga");
    expect(state.readSet).toEqual([{ from: 1, to: 3 }]);
    expect(state.lastChapter).toEqual({ slug: "ch-3", number: 3 });
  });

  it("(b) buka ulang ch1 tidak menambah baris (idempotenn)", async () => {
    await recordComicRead({
      mangaSlug: P + "manga",
      title: "Manga Uji",
      chapterSlug: "ch-1",
      chapterNumber: 1,
    });
    const res = await getHistoryRows(1);
    const komikRows = res.rows.filter(
      (r) => r.domain === "komik" && r.ref === P + "manga",
    );
    expect(komikRows).toHaveLength(1);
  });

  it("(c) movie rewind: posisi tersimpan tetap maksimum", async () => {
    await recordMovieProgress({
      slug: P + "movie",
      kind: "series",
      episodeId: P + "ep1",
      title: "Movie Uji",
      season: 1,
      episode: 1,
      position: 600,
      duration: 4523,
    });
    await recordMovieProgress({
      slug: P + "movie",
      kind: "series",
      episodeId: P + "ep1",
      title: "Movie Uji",
      season: 1,
      episode: 1,
      position: 420,
      duration: 4523,
    });
    const res = await getWatchResume({ domain: "movie", ref: P + "movie", episodeId: P + "ep1" });
    expect(res).toEqual({ resumeAt: 600 });
  });

  it("(d) resume episode berbeda: null", async () => {
    const res = await getWatchResume({ domain: "movie", ref: P + "movie", episodeId: P + "ep2" });
    expect(res).toBeNull();
  });

  it("(e) ganti episode: posisi direset ke episode baru", async () => {
    await recordMovieProgress({
      slug: P + "movie",
      kind: "series",
      episodeId: P + "ep2",
      title: "Movie Uji",
      season: 1,
      episode: 2,
      position: 0,
      duration: 4523,
    });
    const res = await getWatchResume({ domain: "movie", ref: P + "movie", episodeId: P + "ep2" });
    expect(res).toEqual({ resumeAt: 0 });
  });

  it("(f) delete menghapus baris", async () => {
    await recordComicRead({
      mangaSlug: P + "hapus",
      title: "Hapus",
      chapterSlug: "ch-1",
      chapterNumber: 1,
    });
    await deleteHistoryRow({ domain: "komik", ref: P + "hapus" });
    const state = await getComicReadState(P + "hapus");
    expect(state.lastChapter).toBeNull();
    expect(state.readSet).toEqual([]);
  });
});
