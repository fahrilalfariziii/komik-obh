import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import AnimeSearchForm from "@/components/AnimeSearchForm";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getAnimeHome, getSchedule } from "@/lib/anime";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Nonton Anime",
  description: "Nonton anime subtitle Indonesia: ongoing, tamat, dan jadwal rilis.",
};

export default async function AnimeHome() {
  await requireOwner();
  const [home, schedule] = await Promise.allSettled([getAnimeHome(), getSchedule()]);
  const ongoing = home.status === "fulfilled" ? home.value.data?.ongoing?.animeList ?? [] : [];
  const completed =
    home.status === "fulfilled" ? home.value.data?.completed?.animeList ?? [] : [];

  if (home.status === "rejected" || (!ongoing.length && !completed.length)) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Nonton Anime</h1>
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Gagal memuat daftar anime"
            message={
              home.status === "rejected"
                ? String(home.reason instanceof Error ? home.reason.message : home.reason)
                : "Sumber anime tidak bisa dihubungi."
            }
            actionLabel="Coba lagi"
            actionHref="/anime"
          />
        </div>
      </main>
    );
  }

  const todayName = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
  const todaySchedule =
    schedule.status === "fulfilled"
      ? (schedule.value.data ?? [])
          .find((d) => d.day.toLowerCase() === todayName.toLowerCase())
          ?.anime_list.slice(0, 6) ?? []
      : [];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Nonton anime subtitle Indonesia
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
          Ongoing, tamat, dan jadwal rilis harian.
        </p>
        <div className="mt-5">
          <AnimeSearchForm />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="ongoing">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="ongoing" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="play" size={18} className="text-[var(--accent)]" />
            Ongoing terbaru
          </h2>
          <Link
            href="/anime/ongoing"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {ongoing.slice(0, 10).map((a) => (
            <AnimeCard
              key={a.animeId}
              id={a.animeId}
              title={a.title}
              cover={a.poster}
              meta={a.episodes ? `Ep ${a.episodes}` : a.latestReleaseDate}
              badge={a.releaseDay}
            />
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="tamat">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="tamat" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="check" size={18} className="text-[var(--accent)]" />
            Tamat
          </h2>
          <Link
            href="/anime/tamat"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {completed.slice(0, 10).map((a) => (
            <AnimeCard
              key={a.animeId}
              id={a.animeId}
              title={a.title}
              cover={a.poster}
              meta={a.score ? `Skor ${a.score}` : undefined}
              badge={a.episodes ? `${a.episodes} eps` : undefined}
            />
          ))}
        </div>
      </section>

      {todaySchedule.length ? (
        <section className="mt-12" aria-labelledby="jadwal-hari-ini">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="jadwal-hari-ini" className="inline-flex items-center gap-2 text-lg font-semibold">
              <Icon name="clock" size={18} className="text-[var(--accent)]" />
              Tayang hari ini ({todayName})
            </h2>
            <Link
              href="/anime/jadwal"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline"
            >
              Jadwal seminggu
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {todaySchedule.map((a) => (
              <AnimeCard key={a.slug} id={a.slug} title={a.title} cover={a.poster} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
