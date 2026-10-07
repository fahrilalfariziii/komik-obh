import Link from "next/link";
import type { SankaChapterEntry } from "@/lib/sanka";

export default function ChapterList({
  chapters,
  mangaSlug,
}: {
  chapters: SankaChapterEntry[];
  mangaSlug: string;
}) {
  if (!chapters.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-sm">
        <p className="font-medium text-zinc-100">Belum ada chapter.</p>
        <p className="mt-1 text-zinc-400">Coba cari judul lain.</p>
      </div>
    );
  }

  return (
    <ol className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900">
      {chapters.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/chapter/${c.slug}?manga=${mangaSlug}`}
            className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-zinc-800"
          >
            <span className="text-sm text-zinc-100">{c.chapter}</span>
            {c.date ? (
              <span className="shrink-0 text-xs text-zinc-400">{c.date}</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ol>
  );
}
