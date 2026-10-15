"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Icon from "@/components/Icon";

const NAV = [
  { href: "/", label: "Beranda", icon: "home" as const },
  { href: "/anime", label: "Anime", icon: "play" as const },
  { href: "/drakor", label: "Drakor", icon: "film" as const },
  { href: "/peringkat", label: "Peringkat", icon: "trophy" as const },
];

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/chapter")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--app-bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-3">
        <Link
          href="/"
          aria-label="KomikReader, ke beranda"
          className="flex min-h-[44px] shrink-0 items-center gap-2 text-base font-bold tracking-tight text-[var(--text)]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-ink)]">
            <Icon name="book" size={17} />
          </span>
          <span>
            Komik<span className="text-[var(--accent)]">Reader</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm sm:flex" aria-label="Navigasi utama">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-control)] px-3 transition-colors ${
                  active
                    ? "bg-[var(--surface)] text-[var(--accent)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          action="/search"
          method="get"
          role="search"
          className="ml-auto hidden items-center gap-2 md:flex"
        >
          <label htmlFor="nav-search" className="sr-only">
            Cari komik
          </label>
          <div className="flex h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
            <Icon name="search" size={16} className="text-[var(--text-muted)]" />
            <input
              id="nav-search"
              name="q"
              placeholder="Cari judul"
              autoComplete="off"
              className="w-36 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] lg:w-52"
            />
          </div>
          <button
            type="submit"
            className="h-11 shrink-0 rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Cari
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Show when="signed-out">
            <SignInButton>
              <button className="flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)]">
                Masuk
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
