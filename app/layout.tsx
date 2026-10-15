import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: {
    default: "KomikReader",
    template: "%s | KomikReader",
  },
  description: "Baca manga, manhwa, dan manhua Bahasa Indonesia dengan update chapter terbaru.",
  applicationName: "KomikReader",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ ...dark, variables: { colorPrimary: "#fbbf24" } }}>
      <html lang="id" className="dark">
        <head>
          <link rel="preconnect" href="https://www.sankavollerei.web.id" />
          <link rel="dns-prefetch" href="https://www.sankavollerei.web.id" />
        </head>
        <body className="min-h-screen bg-[var(--app-bg)] text-[var(--text)] antialiased">
          <a
            href="#konten"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-control)] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--accent-ink)]"
          >
            Lompat ke konten
          </a>
          <Navbar />
          <div id="konten" className="pb-16 sm:pb-0">
            {children}
          </div>
          <BottomNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
