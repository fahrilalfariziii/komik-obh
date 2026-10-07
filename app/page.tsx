import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Komik Reader
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Cari manga, manhwa, manhua lalu baca chapter Bahasa Indonesia.
      </p>
      <form
        action="/search"
        method="get"
        className="mt-6 flex gap-2"
        role="search"
      >
        <input
          name="q"
          placeholder="Cari judul, misal Solo Leveling"
          className="h-11 flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="h-11 rounded-md bg-amber-400 px-4 text-sm font-medium text-black"
        >
          Cari
        </button>
      </form>
      <div className="mt-8 text-sm text-zinc-400">
        <p>Empty: belum ada pencarian.</p>
        <p className="mt-2">
          Coba buka <Link href="/search?q=solo%20leveling" className="text-amber-300 underline">contoh pencarian</Link>.
        </p>
      </div>
    </main>
  );
}
