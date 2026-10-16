import MovieFilterBar from "@/components/MovieFilterBar";
import MovieListBody from "@/components/MovieListBody";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { LIST_SORTS, getFilters, getSeries, type MovieItem } from "@/lib/movie";
import { requireOwner } from "@/lib/gate";

export const metadata = {
  title: "Jelajahi Series",
  description: "Daftar series subtitle Indonesia dengan filter genre dan urutan.",
};

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function SeriesListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; genre?: string; sort?: string }>;
}) {
  await requireOwner();
  const sp = await searchParams;
  const page = normPage(sp.page);
  const genre = (sp.genre ?? "").trim();
  const sort = (sp.sort ?? "releaseDate").trim();

  const [filtersRes, listRes] = await Promise.allSettled([
    getFilters(),
    getSeries({ page, genre, sort }),
  ]);
  const filters = filtersRes.status === "fulfilled" ? filtersRes.value : null;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="layers" size={22} className="text-[var(--accent)]" />
        Series
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        {filters ? `${filters.genres.length} genre tersedia` : "Jelajahi katalog series"}
      </p>

      <div className="mt-5">
        <MovieFilterBar
          action="/movie/series"
          genres={filters?.genres ?? []}
          sorts={[...LIST_SORTS]}
          genre={genre}
          sort={sort}
        />
      </div>

      {listRes.status === "rejected" ? (
        <div className="mt-6">
          <StatePanel
            icon="alert"
            title="Gagal memuat daftar series"
            message={
              listRes.reason instanceof Error ? listRes.reason.message : "Coba lagi sebentar lagi."
            }
            actionLabel="Kembali"
            actionHref="/movie"
          />
        </div>
      ) : (
        <MovieListBody
          list={listRes.value.items as MovieItem[]}
          page={page}
          totalPages={listRes.value.pagination?.totalPages ?? 0}
          basePath="/movie/series"
          query={{ genre, sort }}
        />
      )}
    </main>
  );
}
