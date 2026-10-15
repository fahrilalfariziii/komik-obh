import Link from "next/link";
import DrakorCard from "@/components/DrakorCard";
import DrakorSearchForm from "@/components/DrakorSearchForm";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getOngoing, getTerbaru, getTrending } from "@/lib/drakor";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Nonton Drakor",
  description: "Nonton drama Korea subtitle Indonesia: ongoing, terbaru, dan trending.",
};

const clean = (s?: string) => (s ?? "").replace(/\s+/g, " ").trim() || undefined;

export default async function DrakorHome() {
  await requireOwner();
  const [ongoing, trending, terbaru] = await Promise.allSettled([
    getOngoing(1),
    getTrending(),
    getTerbaru(1),
  ]);
  const ongoingList = ongoing.status === "fulfilled" ? ongoing.value.items ?? [] : [];
  const trendingHariIni =
    trending.status === "fulfilled" ? trending.value.hari_ini ?? [] : [];
  const terbaruList = terbaru.status === "fulfilled" ? terbaru.value.items ?? [] : [];

  if (!ongoingList.length && !trendingHariIni.length && !terbaruList.length) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Nonton Drakor</h1>
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Gagal memuat daftar drakor"
            message="Sumber drakor tidak bisa dihubungi. Periksa koneksi lalu coba lagi."
            actionLabel="Coba lagi"
            actionHref="/drakor"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Nonton drakor subtitle Indonesia
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
          Drama ongoing, terbaru, dan trending harian.
        </p>
        <div className="mt-5">
          <DrakorSearchForm />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="ongoing">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="ongoing" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="film" size={18} className="text-[var(--accent)]" />
            Ongoing terbaru
          </h2>
          <Link
            href="/drakor/ongoing"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {ongoingList.slice(0, 10).map((a) => (
            <DrakorCard key={a.id} id={a.id} title={a.title} cover={a.imageUrl} meta={clean(a.episode)} />
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="trending">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="trending" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="fire" size={18} className="text-[var(--accent)]" />
            Trending hari ini
          </h2>
          <Link
            href="/drakor/trending"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            Lihat semua periode
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {trendingHariIni.slice(0, 10).map((a) => (
            <DrakorCard
              key={a.id}
              id={a.id}
              title={a.title}
              cover={a.imageUrl}
              badge={a.rank ? `#${a.rank}` : undefined}
            />
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="terbaru">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="terbaru" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="clock" size={18} className="text-[var(--accent)]" />
            Terbaru
          </h2>
          <Link
            href="/drakor/terbaru"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {terbaruList.slice(0, 10).map((a) => (
            <DrakorCard key={a.id} id={a.id} title={a.title} cover={a.imageUrl} />
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="kategori">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="kategori" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="grid" size={18} className="text-[var(--accent)]" />
            Jelajahi kategori
          </h2>
          <Link
            href="/drakor/kategori"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            Semua kategori
          </Link>
        </div>
      </section>
    </main>
  );
}
