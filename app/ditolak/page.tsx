import Link from "next/link";
import Icon from "@/components/Icon";

export default function DitolakPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-muted)]">
        <Icon name="shieldOff" size={26} />
      </span>
      <h1 className="mt-5 text-xl font-bold tracking-tight">Akses ditolak</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Akun ini tidak terdaftar sebagai pemilik KomikReader. Masuk dengan akun pemilik untuk
        melanjutkan.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/sign-in"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
        >
          Ganti akun
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-5 text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Ke beranda
        </Link>
      </div>
    </main>
  );
}
