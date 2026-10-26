import Link from "next/link";
import Icon from "@/components/Icon";

// Panel untuk kondisi kosong/error. Selalu menyebut sebab dan langkah berikutnya.
export default function StatePanel({
  icon = "info",
  title,
  message,
  actionLabel,
  actionHref,
}: {
  icon?: "info" | "search" | "alert" | "book" | "shieldOff" | "riwayat";
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/50 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--text-muted)]">
        <Icon name={icon} size={22} />
      </span>
      <p className="mt-4 text-sm font-semibold text-[var(--text)]">{title}</p>
      <p className="mt-1 max-w-md text-sm text-[var(--text-muted)]">{message}</p>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
