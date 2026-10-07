"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/chapter")) return null;
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
    >
      <div className="grid grid-cols-2 text-center text-sm">
        <Link href="/" className="flex min-h-[48px] items-center justify-center text-zinc-200">
          Beranda
        </Link>
        <Link href="/search" className="flex min-h-[48px] items-center justify-center text-zinc-200">
          Cari
        </Link>
      </div>
    </nav>
  );
}
