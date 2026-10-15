import Link from "next/link";
import { toRoman } from "@/lib/roman";

type Props = {
  rank: number;
  href: string;
  title: string;
  cover?: string;
  meta?: string;
  size?: "display-1" | "display-2";
};

const SIZE = {
  "display-1": {
    numeral: "text-2xl sm:text-3xl",
    box: "w-9 sm:w-14",
    cover: "h-16 w-11",
    title: "text-sm sm:text-base",
    gap: "gap-2.5 sm:gap-4",
    pad: "px-2 py-2 sm:px-3",
  },
  "display-2": {
    numeral: "text-lg sm:text-xl",
    box: "w-8 sm:w-11",
    cover: "h-14 w-10",
    title: "text-sm",
    gap: "gap-2.5 sm:gap-4",
    pad: "px-2 py-2",
  },
} as const;

export default function RankRow({ rank, href, title, cover, meta, size = "display-1" }: Props) {
  const s = SIZE[size];
  return (
    <Link
      href={href}
      className={`group flex items-center transition-colors hover:bg-[var(--surface)] focus-visible:bg-[var(--surface)] ${s.gap} ${s.pad}`}
    >
      <span
        className={`shrink-0 text-center font-semibold tracking-tight text-[var(--accent)] tabular-nums ${s.box} ${s.numeral}`}
      >
        {toRoman(rank)}
      </span>
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          className={`shrink-0 rounded-md border border-[var(--border)] object-cover ${s.cover}`}
        />
      ) : null}
      <span className="min-w-0 flex-1">
        <span
          className={`line-clamp-1 font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)] ${s.title}`}
        >
          {title}
        </span>
        {meta ? (
          <span className="mt-0.5 block truncate text-xs text-[var(--text-muted)]">{meta}</span>
        ) : null}
      </span>
    </Link>
  );
}
