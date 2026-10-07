import { NextResponse } from "next/server";
import { getManga } from "@/lib/mangadex";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const data = await getManga(id);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal" },
      { status: 502 }
    );
  }
}
