import Link from "next/link";
import Icon from "@/components/Icon";
import HistoryDeleteButton from "@/components/HistoryDeleteButton";
import { formatPosition, fmtRel, isCompleted, parseNum } from "@/lib/history-state";
import type { Domain, HistoryRow as RowData } from "@/lib/history";

const DOMAIN_LABEL: Record<Domain, string> = {
  komik: "Komik",
  anime: "Anime",
  drakor: "Drakor",
  movie: "Movie",
};

function progressMeta(data: RowData): string | null {
  const p = data.payload;
  if (data.domain === "komik") {
    const last = p.lastChapter as { number?: number } | undefined;
    const num = typeof last?.number === "number" ? last.number : null;
    return num !== null ? `Ch. ${num}` : null;
  }
  if (data.domain === "anime") {
    const ep = p.episode as { episodeId?: string; number?: number | null } | undefined;
    const num = typeof ep?.number === "number" ? ep.number : parseNum(ep?.episodeId);
    return num !== null ? `Ep ${num}` : null;
  }
  // drakor & movie
  const pos = typeof p.position === "number" ? p.position : null;
  const dur = typeof p.duration === "number" ? p.duration : null;
  if (isCompleted(pos, dur)) return null;
  const parts: string[] = [];
  const epNum = parseNum(p.episode as number | string | null | undefined);
  if (epNum !== null) parts.push(`Ep ${epNum}`);
  if (pos !== null) {
    parts.push(`${formatPosition(pos)}${dur !== null ? `/${formatPosition(dur)}` : ""}`);
  }
  return parts.join(" · ") || null;
}

function rowHref(data: RowData): string {
  const p = data.payload;
  if (data.domain === "komik") {
    const last = p.lastChapter as { slug?: string } | undefined;
    return last?.slug
      ? `/chapter/${last.slug}?manga=${data.ref}`
      : `/manga/${data.ref}`;
  }
  if (data.domain === "anime") {
    const ep = p.episode as { episodeId?: string } | undefined;
    return `/anime/${p.source ?? "otakudesu"}/watch/${ep?.episodeId ?? ""}`;
  }
  if (data.domain === "drakor") {
    const epNum = parseNum(p.episode as number | string | null | undefined) ?? 1;
    return `/drakor/watch/${data.ref}?episode=${epNum}`;
  }
  const qs = new URLSearchParams({
    slug: data.ref,
    id: String(p.episodeId ?? ""),
    kind: String(p.kind ?? "movie"),
  });
  if (p.season != null) qs.set("season", String(p.season));
  if (p.episode != null) qs.set("episode", String(p.episode));
  return `/movie/watch?${qs.toString()}`;
}

export default function HistoryRow({ data }: { data: RowData }) {
  const meta = progressMeta(data);
  const done = data.domain !== "komik" && data.domain !== "anime"
    && isCompleted(
      typeof data.payload.position === "number" ? data.payload.position : null,
      typeof data.payload.duration === "number" ? data.payload.duration : null,
    );

  return (
    <li className="group flex items-center gap-3 rounded-[var(--radius-control)] p-2 transition-colors hover:bg-[var(--surface)]">
      {data.posterUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.posterUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-16 w-12 shrink-0 rounded-md border border-[var(--border)] object-cover"
        />
      ) : (
        <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-raised)]">
          <Icon name="book" size={18} className="text-[var(--text-muted)]" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-[var(--text-muted)]">
            {DOMAIN_LABEL[data.domain]}
          </span>
          {done ? (
            <span className="shrink-0 rounded bg-[var(--accent)] px-1.5 py-0.5 text-[0.65rem] font-semibold text-[var(--accent-ink)]">
              Selesai
            </span>
          ) : null}
        </div>
        <Link
          href={rowHref(data)}
          className="mt-0.5 block line-clamp-1 text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]"
        >
          {data.title}
        </Link>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--text-muted)]">
          {meta ? <span>{meta}</span> : null}
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" size={12} />
            {fmtRel(data.updatedAtISO)}
          </span>
        </p>
      </div>
      <HistoryDeleteButton domain={data.domain} refId={data.ref} title={data.title} />
    </li>
  );
}
