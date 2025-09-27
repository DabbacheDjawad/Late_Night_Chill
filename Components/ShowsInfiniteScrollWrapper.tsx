'use client';

import { useEffect, useRef, useState } from "react";
import Movie from "@/types/Movie";
import TvShow from "@/types/Show";
import ShowCard from "./ShowsCard";
import LoadingSpinner from "@/app/loading";
import { fetchMoreShows } from "../lib/ShowApi";

interface InfiniteScrollWrapperProps {
  children: React.ReactNode;
  initialShows: (Movie | TvShow)[];
  hasMore: boolean;
  type: 'movie' | 'tv';
  searchQuery : string
}

export default function InfiniteScrollWrapper({ 
  children, 
  initialShows, 
  hasMore: initialHasMore, 
  type ,
  searchQuery
}: InfiniteScrollWrapperProps) {
  const [shows, setShows] = useState<(Movie | TvShow)[]>(initialShows);
  const [page, setPage] = useState(2); // Start from page 2 since page 1 is SSR'd
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset when type changes
  useEffect(() => {
    setShows(initialShows);
    setPage(2);
    setHasMore(initialHasMore);
  }, [initialShows, initialHasMore, type]);

  const fetchMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchMoreShows(type, page , searchQuery);
      setShows(prev => [...prev, ...result.shows]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching more shows:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      },
      {
        threshold: 1.0,
        rootMargin: "0px 0px 600px 0px",
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, hasMore, type, page]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {shows.map((show: Movie | TvShow, index: number) => (
          <ShowCard key={`${show.id}-${index}`} show={show} />
        ))}
      </div>

      <div
        ref={observerRef}
        className="h-10 mt-20 mb-10 flex justify-center items-center"
      >
        {loading && <LoadingSpinner />}
        {!hasMore && (
          <p className="text-gray-400">No more shows to load.</p>
        )}
      </div>
    </>
  );
}