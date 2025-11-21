export const dynamic = "force-dynamic";
export const revalidate = 0;
import { fetchLatestTv } from "@/lib/ShowApi";
import ShowsGrid from "@/Components/ShowsGrid";
import ShowsHero from "@/Components/ShowsHero";

export default async function LatestTvPage() {
  const shows = await fetchLatestTv();

  return (
    <div className="mx-auto px-4 py-8 text-white">
      <ShowsHero text="latest" type="tvShow" inHome={false} />
      <ShowsGrid
        type="tv"
        mode="latest"
        initialShows={shows.shows}
        hasMore={true}
      />
    </div>
  );
}
