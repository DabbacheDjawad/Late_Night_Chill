"use client"
import ShowsInfiniteScrollWrapper from "./ShowsInfiniteScrollWrapper";
import {
  fetchInitialShows,
  fetchTopRatedMovies,
  fetchTopRatedTv,
  fetchPopularMovies,
  fetchPopularTv,
  fetchLatestMovies,
  fetchLatestTv,
} from "../lib/ShowApi";
import Movie from "@/types/Movie";
import TvShow from "@/types/Show";
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";

interface ShowsGridProps {
  type: "movie" | "tv";
  searchQuery?: string;
  mode: "discover" | "topRated" | "latest" | "popular";
  initialShows?: (Movie | TvShow)[];
  hasMore?: boolean;
}

export default async function ShowsGrid({
  type,
  searchQuery,
  mode,
  initialShows,
  hasMore,
}: ShowsGridProps) {
  let data;

  if (mode === "topRated") {
    if (type === "movie") {
      const result = await fetchTopRatedMovies(1);
      data = { shows: result.shows, hasMore: result.hasMore };
    } else {
      const result = await fetchTopRatedTv(1);
      data = { shows: result.shows, hasMore: result.hasMore };
    }
  } else if (mode === "popular") {
    if (type === "movie") {
      const result = await fetchPopularMovies(1);
      data = { shows: result.movies, hasMore: result.hasMore }; // 👈 note movies
    } else {
      const result = await fetchPopularTv(1);
      data = { shows: result.shows, hasMore: result.hasMore };
    }
  } else if (mode === "latest") {
    if (type === "movie") {
      const result = await fetchLatestMovies(1);
      data = { shows: result.movies, hasMore: result.hasMore }; // 👈 note movies
    } else {
      const result = await fetchLatestTv(1);
      data = { shows: result.shows, hasMore: result.hasMore };
    }
  } else {
    // discover or search
    data = await fetchInitialShows(type, searchQuery);
  }

  return (
    <ShowsInfiniteScrollWrapper
      initialShows={data.shows}
      hasMore={data.hasMore}
      type={type}
      searchQuery={searchQuery as string}
      mode={mode}
    >
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {data.shows.map((show: Movie | TvShow, index: number) =>
          type === "movie" ? (
            <MovieCard key={`${show.id}-${index}`} movie={show as Movie} />
          ) : (
            <TvShowCard key={`${show.id}-${index}`} show={show as TvShow} />
          )
        )}
      </div>
    </ShowsInfiniteScrollWrapper>
  );
}
