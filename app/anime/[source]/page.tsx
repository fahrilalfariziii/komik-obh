import { redirect, RedirectType } from "next/navigation";
import { legacySlugTarget } from "@/lib/anime-sources";

export default async function LegacyAnimeRedirect({
  params,
}: {
  params: Promise<{ source: string }>;
}) {
  const { source: slug } = await params;
  redirect(legacySlugTarget(slug), RedirectType.replace);
}
