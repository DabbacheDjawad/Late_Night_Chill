import { fetchTopRatedTv } from "@/lib/ShowApi";
import ShowsGrid from "@/Components/ShowsGrid";
import TvShow from "@/types/Show";
import ShowsHero from "@/Components/ShowsHero";

export default async function page() {
  const shows = await fetchTopRatedTv();

  return (
    <div className="mx-auto px-4 py-8 text-white">
        <ShowsHero text="topRated" inHome={false} type="tvShow"/>
      <ShowsGrid
        type="tv"
        mode="topRated"
        initialShows={shows.shows}
        hasMore={true}
      />
    </div>
  );
}
