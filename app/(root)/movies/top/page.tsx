import { fetchTopRatedMovies } from "@/lib/ShowApi";
import { Suspense } from "react";
import ShowsGrid from "@/Components/ShowsGrid";
import AnimeGridSkeleton from "@/Components/AnimeGridSkeleton";
import ShowsHero from "@/Components/ShowsHero";

export default async function page() {
  const movies = await fetchTopRatedMovies();

  return (
    <>
    <ShowsHero text="topRated" inHome={true} type="movie"/>
    <Suspense fallback={<AnimeGridSkeleton />}>
      <ShowsGrid type="movie" initialShows={movies.shows} hasMore={false} mode="topRated" />
    </Suspense>
    </>
  );
}
