"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

export default function BackToTop() {
  // Cek posisi saat mount agar tombol tetap benar bila halaman dibuka
  // dalam keadaan sudah tergulir (mis. lewat tautan ke anchor).
  const [show, setShow] = useState(
    () => typeof window !== "undefined" && window.scrollY > 1200
  );

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
      className="fixed bottom-40 right-4 z-40 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--app-bg)]/95 text-[var(--text)] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur sm:bottom-32"
    >
      <Icon name="arrowUp" size={19} />
    </button>
  );
}
