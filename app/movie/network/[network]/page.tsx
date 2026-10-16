import MovieFilterBar from "@/components/MovieFilterBar";
import MovieListBody from "@/components/MovieListBody";
import StatePanel from "@/components/StatePanel";
import Icon from "@/components/Icon";
import { NETWORKS, NETWORK_SORTS, getNetwork, type MovieItem } from "@/lib/movie";
import { requireOwner } from "@/lib/gate";

function networkLabel(slug: string) {
  return NETWORKS.find((n) => n.slug === slug)?.label ?? slug;
}

function normPage(v?: string) {
  const n = Number.parseInt(v ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function NetworkPage({
  params,
  searchParams,
}: {
  params: Promise<{ network: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  await requireOwner();
  const { network } = await params;
  const sp = await searchParams;
  const page = normPage(sp.page);
  const sort = (sp.sort ?? "latest").trim();

  if (!NETWORKS.some((n) => n.slug === network)) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title="Network tidak dikenal"
          message={`Tidak ada network "${network}". Pilih salah satu dari daftar network.`}
          actionLabel="Kembali ke film"
          actionHref="/movie"
        />
      </main>
    );
  }

  const basePath = `/movie/network/${network}`;

  let items: MovieItem[] = [];
  let totalPages = 0;
  try {
    const res = await getNetwork(network, page, sort);
    items = res.items;
    totalPages = res.pagination?.totalPages ?? 0;
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
        <StatePanel
          icon="alert"
          title={`Gagal memuat ${networkLabel(network)}`}
          message={e instanceof Error ? e.message : "Coba lagi."}
          actionLabel="Kembali"
          actionHref="/movie"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:pb-12">
      <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Icon name="clapper" size={22} className="text-[var(--accent)]" />
        {networkLabel(network)}
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Original dan judul unggulan network ini.</p>

      <div className="mt-5">
        <MovieFilterBar
          action={basePath}
          sorts={[...NETWORK_SORTS]}
          sort={sort}
        />
      </div>

      <MovieListBody
        list={items}
        page={page}
        totalPages={totalPages}
        basePath={basePath}
        query={{ sort }}
      />
    </main>
  );
}
