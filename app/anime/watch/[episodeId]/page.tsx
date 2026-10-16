import { redirect, RedirectType } from "next/navigation";

export default async function LegacyWatchRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ episodeId: string }>;
  searchParams: Promise<{ server?: string; quality?: string }>;
}) {
  const { episodeId } = await params;
  const sp = await searchParams;
  const qs = new URLSearchParams({
    ...(sp.server ? { server: sp.server } : {}),
    ...(sp.quality ? { quality: sp.quality } : {}),
  }).toString();
  redirect(`/anime/otakudesu/watch/${episodeId}${qs ? `?${qs}` : ""}`, RedirectType.replace);
}
