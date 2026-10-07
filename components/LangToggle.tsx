import Link from "next/link";

export default function LangToggle({ lang, base }: { lang: string; base: string }) {
  const idActive = lang !== "en";
  return (
    <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-1 text-sm" role="group" aria-label="Pilih bahasa">
      <Link
        href={`${base}?lang=id`}
        aria-pressed={idActive}
        className={`rounded px-3 py-1.5 ${idActive ? "bg-amber-400 text-black" : "text-zinc-300"}`}
      >
        ID
      </Link>
      <Link
        href={`${base}?lang=en`}
        aria-pressed={!idActive}
        className={`rounded px-3 py-1.5 ${!idActive ? "bg-amber-400 text-black" : "text-zinc-300"}`}
      >
        EN
      </Link>
    </div>
  );
}
