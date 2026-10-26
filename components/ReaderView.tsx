"use client";

import { useEffect, useRef, useState } from "react";
import { recordComicRead } from "@/lib/history";

export type ReaderRecord = {
  mangaSlug: string;
  mangaTitle: string;
  chapterSlug: string;
  chapterNumber: number | null;
  posterUrl: string | null;
};

function PageImage({
  src,
  index,
  eager,
  onLoaded,
}: {
  src: string;
  index: number;
  eager: boolean;
  onLoaded?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [retry, setRetry] = useState(0);

  if (failed) {
    return (
      <div className="mx-auto flex min-h-64 w-full max-w-3xl flex-col items-center justify-center gap-3 p-8 text-sm">
        <p className="text-[var(--text)]">Halaman {index + 1} gagal dimuat.</p>
        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setRetry((r) => r + 1);
          }}
          className="flex min-h-[44px] items-center gap-2 rounded-[var(--radius-control)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)]"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {!loaded ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 min-h-64 animate-pulse bg-[var(--surface)]"
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`${src}-${retry}`}
        src={retry ? `${src}?r=${retry}` : src}
        alt={`Halaman ${index + 1}`}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        onLoad={() => {
          setLoaded(true);
          onLoaded?.();
        }}
        onError={() => setFailed(true)}
        className={`relative mx-auto block h-auto w-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function ReaderView({
  pages,
  record,
}: {
  pages: string[];
  record?: ReaderRecord;
}) {
  const [current, setCurrent] = useState(1);
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const recordedRef = useRef(false);

  // Riwayat baca: sekali per mount, dipicu halaman pertama yang berhasil dimuat.
  function onFirstPageLoaded() {
    if (!record || recordedRef.current) return;
    recordedRef.current = true;
    void recordComicRead({
      mangaSlug: record.mangaSlug,
      title: record.mangaTitle,
      chapterSlug: record.chapterSlug,
      chapterNumber: record.chapterNumber,
      posterUrl: record.posterUrl,
    }).catch(() => {});
  }

  // Lacak halaman yang sedang terlihat untuk indikator posisi baca.
  useEffect(() => {
    if (!pages.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx >= 0) setCurrent(idx + 1);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [pages.length]);

  if (!pages.length) {
    return <p className="p-8 text-center text-sm text-[var(--text-muted)]">Tidak ada gambar.</p>;
  }

  const pct = Math.round((current / pages.length) * 100);

  return (
    <div>
      <div className="reader-stage flex flex-col py-2">
        {pages.map((src, i) => (
          <div
            key={src}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <PageImage
              src={src}
              index={i}
              eager={i < 3}
              onLoaded={i === 0 ? onFirstPageLoaded : undefined}
            />
          </div>
        ))}
      </div>
      <p className="p-4 text-center text-xs text-[var(--text-muted)]" aria-live="polite">
        Halaman <span className="tabular-nums text-[var(--text)]">{current}</span> dari{" "}
        {pages.length} <span className="tabular-nums">({pct}%)</span>
      </p>
    </div>
  );
}
