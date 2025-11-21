// app/popular/movies/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { fetchPopularMovies } from "@/lib/ShowApi";
import ShowsGrid from "@/Components/ShowsGrid";
import ShowsHero from "@/Components/ShowsHero";
export default async function PopularMoviesPage() {
  const result = await fetchPopularMovies(1);

  return (
    <>
    <ShowsHero text="popular" inHome={false} type="movie"/>
    <ShowsGrid
      type="movie"
      mode="popular"
      searchQuery=""
      initialShows={result.movies}
      hasMore={result.hasMore}
    />
    </>
  );
}
