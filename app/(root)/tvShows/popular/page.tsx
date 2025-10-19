import { fetchPopularTv } from "@/lib/ShowApi";
import ShowsGrid from "@/Components/ShowsGrid";
import ShowsHero from "@/Components/ShowsHero";

export default async function page() {
  const shows = await fetchPopularTv();

  return (
    <div className="mx-auto px-4 py-8 text-white">
        <ShowsHero text="popular" inHome={false} type="tvShow"/>
      <ShowsGrid
        type="tv"
        mode="popular"
        initialShows={shows.shows}
        hasMore={true}
      />
    </div>
  );
}
