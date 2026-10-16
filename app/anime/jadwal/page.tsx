import AnimeCard from "@/components/AnimeCard";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getSchedule } from "@/lib/anime";

export const metadata = {
  title: "Jadwal Rilis Anime",
  description: "Jadwal rilis anime per hari.",
};

export default async function JadwalPage() {
  let days: Array<{
    day: string;
    anime_list: Array<{ title: string; slug: string; poster: string }>;
  }> = [];
  try {
    const res = await getSchedule();
    days = res.data ?? [];
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat jadwal"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/anime"
        />
      </main>
    );
  }

  const todayName = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="clock" size={22} className="text-[var(--accent)]" />
        Jadwal Rilis
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Waktu acuan WIB (Asia/Jakarta).</p>
      <div className="mt-6 space-y-10">
        {days.map((d) => {
          const isToday = d.day.toLowerCase() === todayName.toLowerCase();
          return (
            <section key={d.day} aria-labelledby={`hari-${d.day}`}>
              <div className="flex items-center gap-2">
                <h2 id={`hari-${d.day}`} className="text-lg font-semibold">
                  {d.day}
                </h2>
                {isToday ? (
                  <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-ink)]">
                    Hari ini
                  </span>
                ) : null}
                <span className="text-xs text-[var(--text-muted)]">{d.anime_list.length} judul</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {d.anime_list.map((a) => (
                  <AnimeCard key={a.slug} id={a.slug} title={a.title} cover={a.poster} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
