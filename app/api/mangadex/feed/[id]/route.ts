import { NextResponse } from "next/server";
import { getFeed } from "@/lib/mangadex";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") === "en" ? "en" : "id";
  try {
    const data = await getFeed(id, lang);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal" },
      { status: 502 }
    );
  }
}
