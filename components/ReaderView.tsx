"use client";

import { useState } from "react";

function PageImage({ src, index, eager }: { src: string; index: number; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [retry, setRetry] = useState(0);
  if (failed) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-2 border-b border-zinc-900 p-8 text-sm">
        <p className="text-zinc-300">Halaman {index + 1} gagal dimuat.</p>
        <button
          onClick={() => {
            setFailed(false);
            setRetry((r) => r + 1);
          }}
          className="flex min-h-[44px] items-center rounded-md bg-amber-400 px-5 text-sm font-medium text-black"
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
          className="absolute inset-0 min-h-64 animate-pulse bg-zinc-900"
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
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`relative mx-auto block h-auto w-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function ReaderView({ pages }: { pages: string[] }) {
  const [read, setRead] = useState(0);
  if (!pages.length) {
    return <p className="p-8 text-center text-sm text-zinc-400">Tidak ada gambar.</p>;
  }
  const pct = Math.round(((read + 1) / pages.length) * 100);
  return (
    <div>
      <div className="sticky top-0 z-0 h-1 bg-zinc-800" aria-hidden="true">
        <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
      </div>
      <div className="reader-stage">
        {pages.map((src, i) => (
          <div key={src} onClick={() => setRead(i)}>
            <PageImage src={src} index={i} eager={i < 3} />
          </div>
        ))}
      </div>
      <p className="p-4 text-center text-xs text-zinc-500">
        {read + 1} / {pages.length} ({pct}%)
      </p>
    </div>
  );
}
