import type { Metadata } from "next";
import RankRow from "@/components/RankRow";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getLatest, getPopular, slugFromLink } from "@/lib/sanka";
import { requireOwner } from "@/lib/gate";

export const metadata: Metadata = {
  title: "Peringkat Komik",
  description: "Urutan komik paling populer dari data sumber.",
};

export default async function PeringkatPage() {
  await requireOwner();

  const [popularResult, latestResult] = await Promise.allSettled([getPopular(), getLatest()]);
  const popular = popularResult.status === "fulfilled" ? popularResult.value.comics ?? [] : [];
  const latest = latestResult.status === "fulfilled" ? latestResult.value.comics ?? [] : [];
  const rows = popular.length ? popular : latest;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 pt-8 sm:pb-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Icon name="trophy" size={22} className="text-[var(--accent)]" />
            Peringkat Komik
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {popular.length ? "Urutan popularitas dari data sumber." : "Peringkat belum tersedia, menampilkan update terbaru."}
          </p>
        </div>
      </header>

      {rows.length ? (
        <ol className="mt-6 divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40 p-1">
          {rows.map((c, i) => (
            <li key={c.link}>
              <RankRow
                rank={i + 1}
                href={`/manga/${slugFromLink(c.link)}`}
                title={c.title}
                cover={c.image}
                meta={c.chapter}
              />
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Peringkat belum bisa dimuat"
            message="Data komik tidak tersedia saat ini. Coba muat ulang beberapa saat lagi."
            actionLabel="Ke beranda"
            actionHref="/"
          />
        </div>
      )}
    </main>
  );
}
