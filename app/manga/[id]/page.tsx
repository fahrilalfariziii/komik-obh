import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ChapterList from "@/components/ChapterList";
import { getComicDetail } from "@/lib/sanka";
import { requireOwner } from "@/lib/gate";

export default async function MangaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireOwner();
  const { id } = await params;

  let detail;
  try {
    detail = await getComicDetail(id);
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 text-sm">
        <p className="text-zinc-100">Gagal memuat detail.</p>
        <p className="mt-2 text-zinc-400">
          {e instanceof Error ? e.message : "Coba lagi."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: detail.title },
        ]}
      />
      <div className="mt-3 flex flex-col gap-4 min-[380px]:flex-row">
        {detail.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={detail.image}
            alt={detail.title}
            className="w-28 shrink-0 self-start rounded-md border border-zinc-800 object-cover"
          />
        ) : null}
        <div>
          <h1 className="text-xl font-semibold">{detail.title}</h1>
          <p className="mt-1 text-xs uppercase text-zinc-400">
            {[detail.metadata?.type, detail.metadata?.status]
              .filter(Boolean)
              .join(" • ")}
          </p>
          {detail.metadata?.author ? (
            <p className="mt-1 text-sm text-zinc-300">{detail.metadata.author}</p>
          ) : null}
          {detail.genres?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {detail.genres.map((g) => (
                <span
                  key={g.name}
                  className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                >
                  {g.name}
                </span>
              ))}
            </div>
          ) : null}
          {detail.chapters.length ? (
            <Link
              href={`/chapter/${detail.chapters[detail.chapters.length - 1].slug}?manga=${detail.slug}`}
              className="mt-3 inline-flex min-h-[44px] items-center rounded-md bg-amber-400 px-5 text-sm font-medium text-black"
            >
              Mulai Baca
            </Link>
          ) : null}
        </div>
      </div>
      {detail.synopsis ? (
        <p className="mt-4 line-clamp-6 text-sm text-zinc-300">{detail.synopsis}</p>
      ) : null}
      <h2 className="mt-6 mb-2 text-sm font-medium text-zinc-200">
        Daftar chapter ({detail.chapters.length})
      </h2>
      <ChapterList chapters={detail.chapters} mangaSlug={detail.slug} />
    </main>
  );
}
