"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export type PlayerSubtitle = { lang: string; label: string; url: string };

export default function MoviePlayer({
  sources,
  subtitles = [],
  title,
}: {
  sources: string[];
  subtitles?: PlayerSubtitle[];
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [lang, setLang] = useState<string | null>(subtitles[0]?.lang ?? null);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = tracks[i].language === lang ? "showing" : "disabled";
    }
  }, [lang, src, subtitles]);

  if (!src || failed) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-black px-6 text-center">
        <p className="text-sm font-semibold text-[var(--text)]">Stream gagal dimuat</p>
        <p className="text-xs text-[var(--text-muted)]">
          Coba lagi atau mulai ulang dari detail judul.
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
        crossOrigin="anonymous"
        className="aspect-video w-full"
      >
        {subtitles.map((s) => (
          <track key={s.lang} kind="subtitles" src={s.url} srcLang={s.lang} label={s.label} />
        ))}
      </video>
      {subtitles.length ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
          <span className="text-xs text-[var(--text-muted)]">Subtitle</span>
          {subtitles.map((s) => (
            <button
              key={s.lang}
              type="button"
              onClick={() => setLang(s.lang)}
              aria-pressed={lang === s.lang}
              className={
                lang === s.lang
                  ? "min-h-[32px] rounded-full bg-[var(--accent)] px-3 text-xs font-semibold text-[var(--accent-ink)]"
                  : "min-h-[32px] rounded-full border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }
            >
              {s.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLang(null)}
            aria-pressed={lang === null}
            className={
              lang === null
                ? "min-h-[32px] rounded-full bg-[var(--accent)] px-3 text-xs font-semibold text-[var(--accent-ink)]"
                : "min-h-[32px] rounded-full border border-[var(--border-strong)] px-3 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }
          >
            Mati
          </button>
        </div>
      ) : null}
    </div>
  );
}
