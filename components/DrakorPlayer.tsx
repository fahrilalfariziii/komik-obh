"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function DrakorPlayer({
  sources,
  title,
}: {
  sources: string[];
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = sources[srcIndex] ?? "";

  useEffect(() => {
    setFailed(false);
    const video = videoRef.current;
    if (!video || !src) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }
    if (!Hls.isSupported()) {
      setFailed(true);
      return;
    }
    const hls = new Hls();
    hls.on(Hls.Events.ERROR, (_e, data) => {
      if (data.fatal) setFailed(true);
    });
    hls.loadSource(src);
    hls.attachMedia(video);
    return () => {
      hls.destroy();
    };
  }, [src]);

  if (!src || failed) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-black px-6 text-center">
        <p className="text-sm font-semibold text-[var(--text)]">Stream gagal dimuat</p>
        <p className="text-xs text-[var(--text-muted)]">
          Coba episode lain atau muat ulang halaman ini.
        </p>
        {srcIndex + 1 < sources.length ? (
          <button
            type="button"
            onClick={() => setSrcIndex((i) => i + 1)}
            className="inline-flex min-h-[40px] items-center rounded-[var(--radius-control)] bg-[var(--accent)] px-4 text-xs font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            Coba sumber berikutnya
          </button>
        ) : (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-[40px] items-center rounded-[var(--radius-control)] border border-[var(--border-strong)] px-4 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Muat ulang
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-black">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        title={`Nonton ${title}`}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full"
      />
    </div>
  );
}
