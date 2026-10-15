import Link from "next/link";
import Icon from "@/components/Icon";
import { slugFromLink } from "@/lib/sanka";

export default function UpdateRow({
  title,
  link,
  image,
  chapter,
  timeAgo,
  type,
}: {
  title: string;
  link: string;
  image: string;
  chapter?: string;
  timeAgo?: string;
  type?: string;
}) {
  return (
    <Link
      href={`/manga/${slugFromLink(link)}`}
      className="group flex items-center gap-3 rounded-[var(--radius-control)] p-2 transition-colors hover:bg-[var(--surface)] focus-visible:bg-[var(--surface)]"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
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
        <p className="line-clamp-1 text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {title}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--text-muted)]">
          {type ? <span>{type}</span> : null}
          {chapter ? (
            <span className="inline-flex items-center gap-1">
              <Icon name="book" size={12} />
              {chapter}
            </span>
          ) : null}
          {timeAgo ? (
            <span className="inline-flex items-center gap-1">
              <Icon name="clock" size={12} />
              {timeAgo}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
