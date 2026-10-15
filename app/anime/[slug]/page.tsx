import { redirect } from "next/navigation";
import { legacySlugTarget } from "@/lib/anime-sources";

export default async function LegacyAnimeRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(legacySlugTarget(slug));
}
