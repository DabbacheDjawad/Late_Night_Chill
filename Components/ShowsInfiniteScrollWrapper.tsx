"use client";

import { useEffect, useRef, useState } from "react";
import Movie from "@/types/Movie";
import TvShow from "@/types/Show";
import LoadingSpinner from "@/app/loading";
import {
  fetchLatestMovies,
  fetchLatestTv,
  fetchMoreShows,
  fetchPopularMovies,
  fetchPopularTv,
  fetchTopRatedMovies,
  fetchTopRatedTv,
} from "../lib/ShowApi";
import TvShowCard from "./TvShowCard";
import MovieCard from "./MovieCard";

interface InfiniteScrollWrapperProps {
  children?: React.ReactNode;
  initialShows: (Movie | TvShow)[];
  hasMore: boolean;
  type: "movie" | "tv";
  mode: "discover" | "topRated" | "latest" | "popular";
  searchQuery?: string;
}

export default function InfiniteScrollWrapper({
  initialShows,
  hasMore: initialHasMore,
  type,
  mode,
  searchQuery = "",
}: InfiniteScrollWrapperProps) {
  const [shows, setShows] = useState<(Movie | TvShow)[]>(initialShows);
  const [page, setPage] = useState(2); // SSR = page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset on dependency change
  useEffect(() => {
    setShows(initialShows);
    setPage(2);
    setHasMore(initialHasMore);
  }, [initialShows, initialHasMore, type, mode, searchQuery]);

  const fetchMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let newShows: (Movie | TvShow)[] = [];
      let nextHasMore = true;

      if (mode === "topRated") {
        if (type === "movie") {
          const result = await fetchTopRatedMovies(page);
          newShows = result.shows;
          nextHasMore = result.hasMore;
        } else {
          const result = await fetchTopRatedTv(page);
          newShows = result.shows;
          nextHasMore = result.hasMore;
        }
      } else if (mode === "latest") {
        if (type === "movie") {
          const result = await fetchLatestMovies(page);
          newShows = result.movies;
          nextHasMore = result.hasMore;
        } else {
          const result = await fetchLatestTv(page);
          newShows = result.shows;
          nextHasMore = result.hasMore;
        }
      } else if (mode === "popular") {
        if (type === "movie") {
          const result = await fetchPopularMovies(page);
          newShows = result.movies;
          nextHasMore = result.hasMore;
        } else {
          const result = await fetchPopularTv(page);
          newShows = result.shows;
          nextHasMore = result.hasMore;
        }
      } else {
        // discover or search
        const result = await fetchMoreShows(type, page, searchQuery);
        newShows = result.shows;
        nextHasMore = result.hasMore;
      }

      setShows((prev) => [...prev, ...newShows]);
      setHasMore(nextHasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching more shows:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      },
      { threshold: 1.0, rootMargin: "0px 0px 600px 0px" }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, hasMore, type, mode, page]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {shows.map((show: Movie | TvShow, index: number) =>
          type === "movie" ? (
            <MovieCard key={`${show.id}-${index}`} movie={show as Movie} />
          ) : (
            <TvShowCard key={`${show.id}-${index}`} show={show as TvShow} />
          )
        )}
      </div>

      <div
        ref={observerRef}
        className="h-10 mt-20 mb-10 flex justify-center items-center"
      >
        {loading && <LoadingSpinner />}
        {!hasMore && <p className="text-gray-400">No more shows to load.</p>}
      </div>
    </>
  );
}
