import DrakorCard from "@/components/DrakorCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getTrending, type DrakorItem } from "@/lib/drakor";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Trending Drakor",
  description: "Drama Korea trending hari ini, minggu ini, dan bulan ini.",
};

function Section({ id, title, list }: { id: string; title: string; list: DrakorItem[] }) {
  if (!list.length) return null;
  return (
    <section className="mt-10" aria-labelledby={id}>
      <h2 id={id} className="inline-flex items-center gap-2 text-lg font-semibold">
        <Icon name="fire" size={18} className="text-[var(--accent)]" />
        {title}
        <span className="text-xs font-normal text-[var(--text-muted)]">{list.length} judul</span>
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {list.map((a) => (
          <DrakorCard
            key={`${id}-${a.id}`}
            id={a.id}
            title={a.title}
            cover={a.imageUrl}
            badge={a.rank ? `#${a.rank}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default async function TrendingPage() {
  await requireOwner();

  let hari: DrakorItem[] = [];
  let minggu: DrakorItem[] = [];
  let bulan: DrakorItem[] = [];
  try {
    const res = await getTrending();
    hari = res.hari_ini ?? [];
    minggu = res.minggu_ini ?? [];
    bulan = res.bulan_ini ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat trending"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/drakor"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="fire" size={22} className="text-[var(--accent)]" />
        Trending Drakor
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Peringkat dari sumber, per periode.</p>
      <Section id="hari-ini" title="Hari ini" list={hari} />
      <Section id="minggu-ini" title="Minggu ini" list={minggu} />
      <Section id="bulan-ini" title="Bulan ini" list={bulan} />
    </main>
  );
}
