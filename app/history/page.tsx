import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import HistoryRow from "@/components/HistoryRow";
import StatePanel from "@/components/StatePanel";
import { getHistoryRows } from "@/lib/history";

export const metadata: Metadata = {
  title: "Riwayat",
  description: "Progres baca dan tontonmu, tersambung ke akun.",
};

function pageParam(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "1", 10);
  return Number.isInteger(n) && n > 0 ? n : 1;
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = pageParam(sp.page);

  let body;
  if (!process.env.DATABASE_URL) {
    body = (
      <StatePanel
        icon="alert"
        title="Penyimpanan belum dikonfigurasi"
        message="Riwayat butuh Neon Postgres: jalankan db/history.sql sekali di console Neon, lalu isi DATABASE_URL di .env.local dan muat ulang."
      />
    );
  } else {
    try {
      const res = await getHistoryRows(page);
      body = res.rows.length ? (
        <>
          <ol className="mt-6 divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-1">
            {res.rows.map((row) => (
              <HistoryRow key={`${row.domain}:${row.ref}`} data={row} />
            ))}
          </ol>
          {res.hasPrev || res.hasNext ? (
            <nav
              aria-label="Paginasi riwayat"
              className="mt-4 flex items-center justify-center gap-3 text-sm"
            >
              {res.hasPrev ? (
                <Link
                  href={`/history?page=${page - 1}`}
                  className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Sebelumnya
                </Link>
              ) : (
                <span className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border)] px-4 text-[var(--text-muted)] opacity-50">
                  Sebelumnya
                </span>
              )}
              <span className="text-[var(--text-muted)]">Halaman {page}</span>
              {res.hasNext ? (
                <Link
                  href={`/history?page=${page + 1}`}
                  className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Berikutnya
                </Link>
              ) : (
                <span className="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--border)] px-4 text-[var(--text-muted)] opacity-50">
                  Berikutnya
                </span>
              )}
            </nav>
          ) : null}
        </>
      ) : (
        <StatePanel
          icon="riwayat"
          title="Belum ada riwayat"
          message="Mulai baca komik atau nonton anime/drakor/movie — progresmu tercatat otomatis di sini."
          actionLabel="Ke beranda"
          actionHref="/"
        />
      );
    } catch {
      body = (
        <StatePanel
          icon="alert"
          title="Riwayat gagal dimuat"
          message="Penyimpanan tidak dapat dijangkau. Pastikan DATABASE_URL benar dan tabel history sudah dibuat (db/history.sql)."
        />
      );
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 pt-8 sm:pb-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Icon name="riwayat" size={22} className="text-[var(--accent)]" />
            Riwayat
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Progres baca dan tontonmu, tersambung ke akun.
          </p>
        </div>
      </header>
      <div className="mt-2">{body}</div>
    </main>
  );
}
