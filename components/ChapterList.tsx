import Link from "next/link";

type Chapter = {
  id: string;
  attributes: {
    chapter?: string;
    title?: string;
    translatedLanguage?: string;
    publishAt?: string;
  };
};

export default function ChapterList({
  chapters,
  mangaId,
  lang,
}: {
  chapters: Chapter[];
  mangaId: string;
  lang: string;
}) {
  if (!chapters.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-sm">
        <p className="font-medium text-zinc-100">Belum ada chapter Indonesia.</p>
        <p className="mt-1 text-zinc-400">
          Switch ke EN untuk cek ketersediaan, atau cari judul lain.
        </p>
        <Link
          href={`/manga/${mangaId}?lang=en`}
          className="mt-4 inline-block rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-black"
        >
          Lihat versi EN
        </Link>
      </div>
    );
  }

  const sorted = [...chapters].sort(
    (a, b) => Number(b.attributes.chapter ?? 0) - Number(a.attributes.chapter ?? 0)
  );

  return (
    <ol className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900">
      {sorted.map((c) => (
        <li key={c.id}>
          <Link
            href={`/chapter/${c.id}?manga=${mangaId}&lang=${lang}`}
            className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-zinc-800"
          >
            <span className="text-sm text-zinc-100">
              Ch. {c.attributes.chapter ?? "?"} {c.attributes.title ? `- ${c.attributes.title}` : ""}
            </span>
            <span className="shrink-0 rounded bg-zinc-800 px-2 py-0.5 text-xs uppercase text-zinc-300">
              {c.attributes.translatedLanguage}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
