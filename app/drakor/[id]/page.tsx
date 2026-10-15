import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { getDetail } from "@/lib/drakor";
import { requireOwner } from "@/lib/gate";

export default async function DrakorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireOwner();
  const { id } = await params;

  let d;
  try {
    d = await getDetail(id);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat detail drakor"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali ke drakor"
          actionHref="/drakor"
        />
      </main>
    );
  }

  const episodes = d.episodes ?? [];
  const cast = d.cast ?? [];
  const info = d.details ?? {};
  const chips = [info["Network"], info["Episodes"] ? `${info["Episodes"]} episode` : undefined].filter(
    Boolean
  ) as string[];
  const genreChips = (info["Genres"] ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);
  const synopsis = (d.synopsis ?? "").trim();

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Drakor", href: "/drakor" },
          { label: d.title },
        ]}
      />

      <section className="mt-4 flex flex-col gap-5 min-[480px]:flex-row">
        <div className="mx-auto w-40 shrink-0 min-[480px]:mx-0 min-[480px]:w-36">
          {d.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={d.poster}
              alt={d.title}
              className="w-full rounded-[var(--radius-card)] border border-[var(--border)] object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0 text-center min-[480px]:text-left">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">{d.title}</h1>

          {chips.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-2 min-[480px]:justify-start">
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-[var(--surface-raised)] px-2.5 py-1 text-xs">
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          {[info["Release Date"], info["Runtime"], info["Language"]].filter(Boolean).length ? (
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {[info["Release Date"], info["Runtime"], info["Language"]]
                .filter(Boolean)
                .join(" • ")}
            </p>
          ) : null}

          {episodes[0] ? (
            <div className="mt-5">
              <Link
                href={`/drakor/watch/${d.slug || d.id}?episode=${episodes[0].number}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
              >
                <Icon name="film" size={17} />
                Nonton terbaru
                <span className="text-xs font-normal opacity-70">Ep {episodes[0].number}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {genreChips.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Genre">
          {genreChips.map((g) => (
            <li key={g}>
              <span className="inline-flex min-h-[36px] items-center rounded-full bg-[var(--surface-raised)] px-3 text-xs text-[var(--text-muted)]">
                {g}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {synopsis ? (
        <section className="mt-6">
          <h2 className="mb-2 inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="info" size={18} className="text-[var(--accent)]" />
            Sinopsis
          </h2>
          <p className="prose-reader text-sm">{synopsis}</p>
        </section>
      ) : null}

      {cast.length ? (
        <section className="mt-6" aria-labelledby="pemeran">
          <h2 id="pemeran" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
            <Icon name="user" size={18} className="text-[var(--accent)]" />
            Pemeran
          </h2>
          <ul className="flex flex-wrap gap-2">
            {cast.map((c) => (
              <li
                key={c.name}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)]/40 px-3 py-1.5 text-xs text-[var(--text-muted)]"
              >
                {c.name}
                {c.role && c.role !== c.name ? (
                  <span className="opacity-70"> sebagai {c.role}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8" aria-labelledby="daftar-episode">
        <h2 id="daftar-episode" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
          <Icon name="layers" size={18} className="text-[var(--accent)]" />
          Daftar episode
          <span className="text-sm font-normal text-[var(--text-muted)]">({episodes.length})</span>
        </h2>
        {episodes.length ? (
          <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
            {episodes.map((e) => (
              <li key={e.number}>
                <Link
                  href={`/drakor/watch/${d.slug || d.id}?episode=${e.number}`}
                  className="flex min-h-[48px] items-center gap-3 px-3 py-2.5 hover:bg-[var(--surface-raised)]"
                >
                  <span className="w-10 shrink-0 text-center text-xs font-semibold text-[var(--accent)] tabular-nums">
                    {e.number}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">{e.episode}</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Belum ada episode.</p>
        )}
      </section>
    </main>
  );
}
