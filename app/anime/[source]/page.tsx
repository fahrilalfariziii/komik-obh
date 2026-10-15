import { redirect, RedirectType } from "next/navigation";
import { legacySlugTarget } from "@/lib/anime-sources";
import { requireOwner } from "@/lib/gate";

export default async function LegacyAnimeRedirect({
  params,
}: {
  params: Promise<{ source: string }>;
}) {
  await requireOwner();
  const { source: slug } = await params;
  redirect(legacySlugTarget(slug), RedirectType.replace);
}
