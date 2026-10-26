"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import {
  mergeRanges,
  mergeWatchPayload,
  resumeFor,
  trimCandidates,
  type ChapterRead,
  type Range,
  type WatchPayload,
} from "./history-state";

export type Domain = "komik" | "anime" | "drakor" | "movie";

export type HistoryRow = {
  domain: Domain;
  ref: string;
  title: string;
  posterUrl: string | null;
  payload: Record<string, unknown>;
  updatedAtISO: string;
};

type HistoryRecord = {
  domain: Domain;
  ref: string;
  title: string;
  poster_url: string | null;
  payload: unknown;
  updated_at: string;
};

const PAGE_SIZE = 50;
const HISTORY_MAX = 500;

// userId selalu dari sesi Clerk; jangan pernah percaya argumen client.
async function authUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId ?? null;
}

type StoredPayload = WatchPayload & {
  lastChapter?: { slug: string; number: number } | null;
  readSet?: Range[];
};

async function selectPayload(
  user: string,
  domain: Domain,
  ref: string,
): Promise<StoredPayload | null> {
  const rows = (await db()`
    SELECT payload FROM history
    WHERE user_id = ${user} AND domain = ${domain} AND ref = ${ref}
    LIMIT 1
  `) as Array<{ payload: unknown }>;
  const payload = rows[0]?.payload;
  return payload ? (payload as StoredPayload) : null;
}

async function upsert(
  user: string,
  domain: Domain,
  ref: string,
  title: string,
  posterUrl: string | null | undefined,
  payload: unknown,
): Promise<void> {
  await db()`
    INSERT INTO history (user_id, domain, ref, title, poster_url, payload)
    VALUES (${user}, ${domain}, ${ref}, ${title}, ${posterUrl ?? null}, ${JSON.stringify(payload)}::jsonb)
    ON CONFLICT (user_id, domain, ref) DO UPDATE
      SET title = EXCLUDED.title,
          poster_url = COALESCE(EXCLUDED.poster_url, history.poster_url),
          payload = EXCLUDED.payload,
          updated_at = now()
  `;
}

// Rim overflow (spec §5): watch terlama dihapus dulu, lalu komik terlama —
// urutan ditentukan helper murni trimCandidates (teruji), DELETE per-baris.
async function trimHistory(user: string): Promise<void> {
  const rows = (await db()`SELECT domain, ref, updated_at FROM history WHERE user_id = ${user}`) as Array<{
    domain: Domain;
    ref: string;
    updated_at: unknown;
  }>;
  const victims = trimCandidates(
    rows.map((r) => ({
      domain: r.domain,
      ref: r.ref,
      updatedAt: r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at),
    })),
    HISTORY_MAX,
  );
  for (const v of victims) {
    await db()`DELETE FROM history WHERE user_id = ${user} AND domain = ${v.domain} AND ref = ${v.ref}`;
  }
}

export async function recordComicRead(p: {
  mangaSlug: string;
  title: string;
  chapterSlug: string;
  chapterNumber: number | null;
  posterUrl?: string | null;
}): Promise<void> {
  const user = await authUserId();
  if (!user) return;
  const prev = await selectPayload(user, "komik", p.mangaSlug);
  const readSet =
    p.chapterNumber === null
      ? (prev?.readSet ?? [])
      : mergeRanges(prev?.readSet ?? [], p.chapterNumber);
  const prevLast = prev?.lastChapter ?? null;
  const lastChapter =
    p.chapterNumber === null
      ? prevLast
      : prevLast !== null && p.chapterNumber <= prevLast.number
        ? prevLast
        : { slug: p.chapterSlug, number: p.chapterNumber };
  await upsert(user, "komik", p.mangaSlug, p.title, p.posterUrl, { lastChapter, readSet });
  await trimHistory(user);
}

export async function recordAnimeWatch(p: {
  source: string;
  animeSlug: string;
  title: string;
  episodeId: string;
  episodeNumber: number | null;
  posterUrl?: string | null;
}): Promise<void> {
  const user = await authUserId();
  if (!user) return;
  const payload = {
    source: p.source,
    animeSlug: p.animeSlug,
    episode: { episodeId: p.episodeId, number: p.episodeNumber },
  };
  await upsert(user, "anime", `${p.source}:${p.animeSlug}`, p.title, p.posterUrl, payload);
  await trimHistory(user);
}

export async function recordDrakorProgress(p: {
  id: string;
  title: string;
  episodeId: string;
  episode: number | null;
  position: number | null;
  duration: number | null;
  posterUrl?: string | null;
}): Promise<void> {
  const user = await authUserId();
  if (!user) return;
  const prev = await selectPayload(user, "drakor", p.id);
  const payload = mergeWatchPayload(prev, {
    episodeId: p.episodeId,
    episode: p.episode,
    position: p.position,
    duration: p.duration,
  });
  await upsert(user, "drakor", p.id, p.title, p.posterUrl, payload);
  await trimHistory(user);
}

export async function recordMovieProgress(p: {
  slug: string;
  kind: "movie" | "series";
  episodeId: string;
  title: string;
  season?: number | null;
  episode?: number | null;
  position: number | null;
  duration: number | null;
  posterUrl?: string | null;
}): Promise<void> {
  const user = await authUserId();
  if (!user) return;
  const prev = await selectPayload(user, "movie", p.slug);
  const payload = mergeWatchPayload(prev, {
    episodeId: p.episodeId,
    kind: p.kind,
    season: p.season ?? null,
    episode: p.episode ?? null,
    position: p.position,
    duration: p.duration,
  });
  await upsert(user, "movie", p.slug, p.title, p.posterUrl, payload);
  await trimHistory(user);
}

export async function getHistoryRows(
  page: number,
): Promise<{ rows: HistoryRow[]; hasNext: boolean; hasPrev: boolean }> {
  const user = await authUserId();
  if (!user) return { rows: [], hasNext: false, hasPrev: false };
  const p = Number.isInteger(page) && page > 0 ? page : 1;
  const recs = (await db()`
    SELECT domain, ref, title, poster_url, payload, updated_at
    FROM history
    WHERE user_id = ${user}
    ORDER BY updated_at DESC
    LIMIT ${PAGE_SIZE + 1} OFFSET ${(p - 1) * PAGE_SIZE}
  `) as HistoryRecord[];
  const hasNext = recs.length > PAGE_SIZE;
  const rows = recs.slice(0, PAGE_SIZE).map((r) => ({
    domain: r.domain,
    ref: r.ref,
    title: r.title,
    posterUrl: r.poster_url,
    payload: (r.payload ?? {}) as Record<string, unknown>,
    updatedAtISO: new Date(r.updated_at).toISOString(),
  }));
  return { rows, hasNext, hasPrev: p > 1 };
}

export async function getComicReadState(mangaSlug: string): Promise<ChapterRead> {
  const user = await authUserId();
  if (!user) return { lastChapter: null, readSet: [] };
  const prev = await selectPayload(user, "komik", mangaSlug);
  return {
    lastChapter: prev?.lastChapter ?? null,
    readSet: Array.isArray(prev?.readSet) ? prev.readSet : [],
  };
}

export async function getWatchResume(d: {
  domain: Domain;
  ref: string;
  episodeId: string;
}): Promise<{ resumeAt: number } | null> {
  const user = await authUserId();
  if (!user) return null;
  const prev = await selectPayload(user, d.domain, d.ref);
  const at = resumeFor(prev, d.episodeId);
  return at === null ? null : { resumeAt: at };
}

export async function deleteHistoryRow(d: {
  domain: Domain;
  ref: string;
}): Promise<void> {
  const user = await authUserId();
  if (!user) return;
  await db()`
    DELETE FROM history WHERE user_id = ${user} AND domain = ${d.domain} AND ref = ${d.ref}
  `;
}
