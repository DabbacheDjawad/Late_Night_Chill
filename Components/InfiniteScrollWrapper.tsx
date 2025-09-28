"use client";
import { useEffect, useRef, useState } from "react";
import Anime from "@/types/Anime";
import { Episode } from "@/types/Anime"; //
import AnimeCard from "./AnimeCard";
import EpisodeCard from ".//EpisodesCard";
import LoadingSpinner from "@/app/loading";
import { fetchMoreAnimes } from "../lib/AnimeApi";
import { Rating, type, orderBy, Sort } from "@/types/Anime";

interface InfiniteScrollWrapperProps {
  children?: React.ReactNode;
  initialAnimes: Anime[] | Episode[];
  hasMore: boolean;
  searchName?: string;
  filters?: {
    genre?: number[] | undefined;
    rating?: Rating;
    type?: type;
    sort: Sort;
    orderBy: orderBy | undefined;
    startDate: string;
    endDate: string;
  };
  latest?: boolean;
  latestEpisodes?: boolean;
}

export default function InfiniteScrollWrapper({
  children,
  initialAnimes,
  hasMore: initialHasMore,
  searchName,
  filters,
  latest,
  latestEpisodes,
}: InfiniteScrollWrapperProps) {
  const [items, setItems] = useState<(Anime | Episode)[]>(initialAnimes);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset when search or filters change
  useEffect(() => {
    setItems(initialAnimes);
    setPage(2);
    setHasMore(initialHasMore);
  }, [initialAnimes, initialHasMore, searchName, JSON.stringify(filters)]);

  const fetchMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchMoreAnimes(
        page,
        searchName,
        filters?.startDate,
        filters?.endDate,
        filters?.genre,
        filters?.rating,
        filters?.type,
        filters?.orderBy,
        filters?.sort,
        latest,
        latestEpisodes
      );

      setItems((prev) => {
        const existingIds = new Set(
          prev.map((item) =>
            latestEpisodes
              ? (item as Episode).mal_id +
                "-" +
                (item as Episode).latestEpisode?.mal_id
              : (item as Anime).mal_id
          )
        );
        const newItems = result.animes.filter((item: Anime | Episode) =>
          latestEpisodes
            ? !existingIds.has(
                (item as Episode).mal_id +
                  "-" +
                  (item as Episode).latestEpisode?.mal_id
              )
            : !existingIds.has((item as Anime).mal_id)
        );

        return [...prev, ...newItems];
      });

      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer
  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, hasMore, page, searchName, JSON.stringify(filters)]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {items.map((item, index) =>
          latestEpisodes ? (
            <EpisodeCard key={`ep-${index}`} episode={item as Episode} />
          ) : (
            <AnimeCard
              key={`anime-${(item as Anime).mal_id}-${index}`}
              anime={item as Anime}
            />
          )
        )}
      </div>

      <div
        ref={observerRef}
        className="h-10 mt-20 mb-10 flex justify-center items-center"
      >
        {loading && <LoadingSpinner />}
        {!hasMore && items.length > 0 && (
          <p className="text-gray-400">
            {searchName ? "No more search results." : "No more items to load."}
          </p>
        )}
        {!hasMore && items.length === 0 && (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>
    </>
  );
}
