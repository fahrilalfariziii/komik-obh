"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { recordMovieProgress } from "@/lib/history";

export type PlayerSubtitle = { lang: string; label: string; url: string };

export type MovieHistoryRef = {
  kind: "movie" | "series";
  slug: string;
  episodeId: string;
  season?: number;
  episode?: number;
};

const BEAT_MS = 10_000;

export default function MoviePlayer({
  sources,
  subtitles = [],
  title,
  historyRef = null,
  initialSeek = 0,
}: {
  sources: string[];
  subtitles?: PlayerSubtitle[];
  title: string;
  historyRef?: MovieHistoryRef | null;
  initialSeek?: number;
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

  // Resume posisi: seek sekali per mount saat metadata siap; 0 = mulai dari awal.
  const didSeekRef = useRef(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !initialSeek) return;
    const onMeta = () => {
      if (didSeekRef.current) return;
      didSeekRef.current = true;
      video.currentTime = initialSeek;
    };
    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [initialSeek]);

  // Heartbeat riwayat: record di playing pertama lalu tiap 10 s selama berjalan;
  // pagehide/hidden mengirim posisi terakhir (kehilangan ≤10 s terakhir diterima).
  const hKind = historyRef?.kind;
  const hSlug = historyRef?.slug;
  const hEpisodeId = historyRef?.episodeId;
  const hSeason = historyRef?.season;
  const hEpisode = historyRef?.episode;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hKind || !hSlug || !hEpisodeId) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const record = () => {
      void recordMovieProgress({
        slug: hSlug,
        kind: hKind,
        episodeId: hEpisodeId,
        title,
        season: hSeason ?? null,
        episode: hEpisode ?? null,
        position: video.currentTime,
        duration: video.duration,
      }).catch(() => {});
    };
    const start = () => {
      record();
      if (interval) return;
      interval = setInterval(() => {
        if (video.paused || !Number.isFinite(video.duration) || video.duration <= 0) return;
        record();
      }, BEAT_MS);
    };
    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
    const onPlay = () => start();
    const onPause = () => stop();
    const onHide = () => {
      stop();
      try {
        record();
      } catch {
        // kehilangan detak terakhir diterima.
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") onHide();
    };

    video.addEventListener("playing", onPlay);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      video.removeEventListener("playing", onPlay);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
      stop();
    };
  }, [hKind, hSlug, hEpisodeId, hSeason, hEpisode, title]);

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
