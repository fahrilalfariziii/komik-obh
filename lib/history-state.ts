export type Range = { from: number; to: number };

export type ChapterRead = {
  lastChapter: { slug: string; number: number } | null;
  readSet: Range[];
};

export type WatchPayload = {
  episodeId?: string;
  position?: number | null;
  duration?: number | null;
};

// Tenggelamkan nomor chapter ke set rentang. Nomor berjarak <= 1 dianggap
// berurutan (10.5 → 11 menyatu), jauh dipisah (1,2 lalu 9) tetap rentang sendiri.
export function mergeRanges(set: Range[], n: number): Range[] {
  if (!Number.isFinite(n)) return set.map((r) => ({ ...r }));
  const sorted = set.map((r) => ({ ...r })).sort((a, b) => a.from - b.from);
  // n sudah tercakup → tidak ada yang berubah.
  if (sorted.some((r) => r.from <= n && n <= r.to)) return sorted;

  const list = [...sorted, { from: n, to: n }].sort((a, b) => a.from - b.from);
  const out: Range[] = [];
  let cur: Range | null = null;
  for (const r of list) {
    if (!cur) {
      cur = { ...r };
      continue;
    }
    if (r.from <= cur.to + 1) {
      cur.to = Math.max(cur.to, r.to);
    } else {
      out.push(cur);
      cur = { ...r };
    }
  }
  if (cur) out.push(cur);
  return out;
}

// Exact: nomor di dalam rentang; float dibedakan dari bulat (10.5 ≠ 10).
export function inRanges(set: Range[], n: number): boolean {
  return set.some((r) => n >= r.from && n <= r.to);
}

// Posisi nonton hanya boleh maju: rewind tidak menurunkan tersimpanan.
export function mergeWatchPayload(
  prev: WatchPayload | null,
  next: WatchPayload,
): WatchPayload {
  const a = typeof prev?.position === "number" ? prev.position : null;
  const b = typeof next.position === "number" ? next.position : null;
  const position = a !== null && b !== null ? Math.max(a, b) : a ?? b;
  return { ...prev, ...next, position };
}

export function isCompleted(
  position: number | null | undefined,
  duration: number | null | undefined,
): boolean {
  if (typeof position !== "number" || !Number.isFinite(position)) return false;
  if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0) {
    return false;
  }
  return position / duration >= 0.95;
}

// Resume hanya untuk episode yang sama dan belum selesai; balik detik.
export function resumeFor(
  payload: WatchPayload | null | undefined,
  wantedEpisodeId: string,
): number | null {
  if (!payload || payload.episodeId !== wantedEpisodeId) return null;
  if (isCompleted(payload.position, payload.duration)) return null;
  return typeof payload.position === "number" ? payload.position : null;
}

export function formatPosition(sec: number | null | undefined): string {
  if (typeof sec !== "number" || !Number.isFinite(sec) || sec < 0) return "0:00";
  const total = Math.floor(sec);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (v: number) => String(v).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

const BULAN = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
] as const;

export function fmtRel(dateISO: string): string {
  const t = Date.parse(dateISO);
  if (Number.isNaN(t)) return "-";
  const diff = Date.now() - t;
  if (diff < 60_000) return "baru saja";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} menit lalu`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} jam lalu`;
  if (diff < 30 * 86_400_000) return `${Math.floor(diff / 86_400_000)} hari lalu`;
  const d = new Date(t);
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

// "Chapter 10.5" → 10.5, "Ep 12" → 12, "TBD"/"•" → null.
export function parseNum(v: string | number | null | undefined): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  const m = v.match(/-?\d+(?:\.\d+)?/);
  if (!m) return null;
  const n = Number.parseFloat(m[0]);
  return Number.isFinite(n) ? n : null;
}
