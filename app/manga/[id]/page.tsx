import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ChapterList from "@/components/ChapterList";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { komikType } from "@/lib/komik-type";
import { getComicDetail } from "@/lib/sanka";
import { requireOwner } from "@/lib/gate";

export default async function MangaPage({ params }: { params: Promise<{ id: string }> }) {
  await requireOwner();
  const { id } = await params;

  let detail;
  try {
    detail = await getComicDetail(id);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat detail komik"
          message={e instanceof Error ? e.message : "Coba buka halaman ini lagi."}
          actionLabel="Kembali ke beranda"
          actionHref="/"
        />
      </main>
    );
  }

  const chapters = detail.chapters ?? [];
  // Sumber mengirim daftar urut terbaru -> terlama.
  const newest = chapters[0];
  const first = chapters[chapters.length - 1];
  const genres = (detail.genres ?? []).map((g) => g.name);
  const type = detail.metadata?.type ?? komikType(genres);
  const chips = [type, detail.metadata?.status].filter(Boolean) as string[];
  const synopsis = (detail.synopsis ?? "").trim();
  const longSynopsis = synopsis.length > 260;

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:pb-12">
      <Breadcrumb
        trail={[{ label: "Beranda", href: "/" }, { label: detail.title }]}
      />

      <section className="mt-4 flex flex-col gap-5 min-[480px]:flex-row">
        <div className="mx-auto w-40 shrink-0 min-[480px]:mx-0 min-[480px]:w-36">
          {detail.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={detail.image}
              alt={detail.title}
              className="w-full rounded-[var(--radius-card)] border border-[var(--border)] object-cover shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)]"
            />
          ) : null}
        </div>

        <div className="min-w-0 text-center min-[480px]:text-left">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-[var(--text)]">
            {detail.title}
          </h1>

          {chips.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-2 min-[480px]:justify-start">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[var(--surface-raised)] px-2.5 py-1 text-xs text-[var(--text)]"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          {detail.metadata?.author ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Icon name="user" size={14} />
              {detail.metadata.author}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap">
            {newest ? (
              <Link
                href={`/chapter/${newest.slug}?manga=${detail.slug}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                <Icon name="book" size={17} />
                Baca terbaru
                <span className="text-xs font-normal opacity-70">{newest.chapter}</span>
              </Link>
            ) : null}
            {first && first.slug !== newest?.slug ? (
              <Link
                href={`/chapter/${first.slug}?manga=${detail.slug}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] px-5 text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Chapter pertama
                <span className="text-xs text-[var(--text-muted)]">{first.chapter}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {genres.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Genre">
          {genres.map((g) => (
            <li key={g}>
              <Link
                href={`/search?q=${encodeURIComponent(g)}`}
                className="inline-flex min-h-[36px] items-center rounded-full bg-[var(--surface-raised)] px-3 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                {g}
              </Link>
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
          <p
            className={`prose-reader text-sm text-[var(--text)] ${
              longSynopsis ? "line-clamp-4" : ""
            }`}
          >
            {synopsis}
          </p>
          {longSynopsis ? (
            <details className="group mt-2">
              <summary className="inline-flex min-h-[36px] cursor-pointer list-none items-center gap-1 text-sm text-[var(--accent)]">
                <span className="group-open:hidden">Baca selengkapnya</span>
                <span className="hidden group-open:inline">Tutup sinopsis</span>
                <Icon name="chevronRight" size={15} className="transition-transform group-open:rotate-90" />
              </summary>
              <p className="prose-reader mt-2 text-sm text-[var(--text)]">{synopsis}</p>
            </details>
          ) : null}
        </section>
      ) : null}

      <section className="mt-8" aria-labelledby="daftar-chapter">
        <h2 id="daftar-chapter" className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
          <Icon name="layers" size={18} className="text-[var(--accent)]" />
          Daftar chapter
          <span className="text-sm font-normal text-[var(--text-muted)]">({chapters.length})</span>
        </h2>
        <ChapterList chapters={chapters} mangaSlug={detail.slug} />
      </section>
    </main>
  );
}
