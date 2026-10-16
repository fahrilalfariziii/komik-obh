import MovieDetailView from "@/components/MovieDetailView";
import StatePanel from "@/components/StatePanel";
import { getDetail } from "@/lib/movie";

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const detail = await getDetail(slug, "movie");
    return <MovieDetailView detail={detail} kind="movie" />;
  } catch (e) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Gagal memuat detail film"
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali ke film"
          actionHref="/movie/film"
        />
      </main>
    );
  }
}
