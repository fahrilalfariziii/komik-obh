"use client";

import { useEffect, useRef } from "react";
import { recordAnimeWatch } from "@/lib/history";

// Rekam nonton anime sekali per mount: episode-level saja, tanpa posisi menit
// (pemutar anime tidak menyediakan durasi yang andal). Fire-and-forget.
export default function AnimeWatchRecorder({
  source,
  animeSlug,
  animeTitle,
  episodeId,
  episodeNumber,
}: {
  source: string;
  animeSlug: string;
  animeTitle: string;
  episodeId: string;
  episodeNumber: number | null;
}) {
  const doneRef = useRef<string | null>(null);

  // Guard per-episode (bukan per-mount): navigasi Prev/Next mempertahankan
  // instance komponen, jadi guard reset saat episodeId ganti.
  useEffect(() => {
    if (doneRef.current === episodeId) return;
    doneRef.current = episodeId;
    void recordAnimeWatch({ source, animeSlug, title: animeTitle, episodeId, episodeNumber }).catch(
      () => {},
    );
  }, [source, animeSlug, animeTitle, episodeId, episodeNumber]);

  return null;
}
