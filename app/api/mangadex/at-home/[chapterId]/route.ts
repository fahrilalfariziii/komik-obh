import { NextResponse } from "next/server";
import { getAtHome } from "@/lib/mangadex";

export async function GET(_req: Request, ctx: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await ctx.params;
  try {
    const data = await getAtHome(chapterId);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gambar tidak tersedia" },
      { status: 502 }
    );
  }
}
