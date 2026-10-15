"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const ITEMS = [
  { href: "/", label: "Beranda", icon: "home" as const },
  { href: "/anime", label: "Anime", icon: "play" as const },
  { href: "/drakor", label: "Drakor", icon: "film" as const },
  { href: "/peringkat", label: "Peringkat", icon: "trophy" as const },
  { href: "/search", label: "Cari", icon: "search" as const },
];

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/chapter")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--app-bg)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
    >
      <div className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[56px] flex-col items-center justify-center gap-1 text-xs transition-colors ${
                active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
              }`}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
