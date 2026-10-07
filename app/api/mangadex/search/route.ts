import { NextResponse } from "next/server";
import { searchManga } from "@/lib/mangadex";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  if (!q.trim()) {
    return NextResponse.json({ data: [] });
  }
  try {
    const data = await searchManga(q);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Coba lagi 30 detik" },
      { status: 502 }
    );
  }
}
