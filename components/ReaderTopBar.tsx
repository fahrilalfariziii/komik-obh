"use client";

import { useEffect, useState } from "react";

export default function ReaderTopBar({
  mangaTitle,
  chapterTitle,
}: {
  mangaTitle: string;
  chapterTitle: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0);
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-3xl bg-zinc-950/85 px-4 pb-2 pt-2.5 text-center backdrop-blur">
        <p className="truncate text-sm font-semibold text-zinc-50">{mangaTitle}</p>
        <p className="text-xs text-amber-300">{chapterTitle}</p>
      </div>
      <div className="mx-auto h-0.5 max-w-3xl bg-zinc-800" aria-hidden="true">
        <div className="h-full bg-amber-400" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
