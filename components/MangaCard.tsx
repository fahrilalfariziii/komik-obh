import Link from "next/link";

export default function MangaCard({
  id,
  title,
  cover,
  status,
}: {
  id: string;
  title: string;
  cover: string;
  status?: string;
}) {
  return (
    <Link
      href={`/manga/${id}`}
      className="group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt={title} loading="lazy" className="aspect-[3/4] w-full object-cover" />
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center text-xs text-zinc-500">
          Tanpa cover
        </div>
      )}
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-medium text-zinc-100">{title}</p>
        {status ? <p className="mt-1 text-xs text-zinc-400">{status}</p> : null}
      </div>
    </Link>
  );
}
