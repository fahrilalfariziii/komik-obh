import Link from "next/link";

export default function DitolakPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-bold">Akses ditolak</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Akun ini tidak terdaftar sebagai pemilik web ini.
      </p>
      <Link
        href="/sign-in"
        className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-amber-400 px-5 text-sm font-medium text-black"
      >
        Ganti akun
      </Link>
    </main>
  );
}
