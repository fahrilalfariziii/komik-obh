import { redirect, RedirectType } from "next/navigation";
import { legacySlugTarget } from "@/lib/anime-sources";
import { requireOwner } from "@/lib/gate";

export default async function LegacyAnimeRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireOwner();
  const { slug } = await params;
  redirect(legacySlugTarget(slug), RedirectType.replace);
}
