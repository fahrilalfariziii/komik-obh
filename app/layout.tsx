import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Komik Reader",
  description: "Baca manga, manhwa, manhua Bahasa Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{ ...dark, variables: { colorPrimary: "#fbbf24" } }}
    >
      <html lang="id" className="dark">
        <link rel="preconnect" href="https://www.sankavollerei.web.id" />
        <link rel="dns-prefetch" href="https://www.sankavollerei.web.id" />
        <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
          <Navbar />
          <div className="pb-16 sm:pb-0">{children}</div>
          <BottomNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
