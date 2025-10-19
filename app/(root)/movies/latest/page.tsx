// app/latest/movies/page.tsx
import { fetchLatestMovies } from "@/lib/ShowApi";
import ShowsGrid from "@/Components/ShowsGrid";
import ShowsHero from "@/Components/ShowsHero";

export default async function page() {
  const result = await fetchLatestMovies(1);

  return (
    <>
    <ShowsHero text="latest" inHome={false} type="movie"/>
    <ShowsGrid
      type="movie"
      mode="latest"
      searchQuery=""
      initialShows={result.movies}
      hasMore={result.hasMore}
    />
    </>
  );
}
