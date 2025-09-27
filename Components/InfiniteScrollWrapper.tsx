'use client';
import { useEffect, useRef, useState } from "react";
import Anime from "@/types/Anime";
import AnimeCard from "./AnimeCard";
import LoadingSpinner from "@/app/loading";
import { fetchMoreAnimes } from "../lib/AnimeApi";
import { Rating, type, orderBy, Sort } from "@/types/Anime";

interface InfiniteScrollWrapperProps {
  children: React.ReactNode;
  initialAnimes: Anime[];
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
}

export default function InfiniteScrollWrapper({
  children,
  initialAnimes,
  hasMore: initialHasMore,
  searchName,
  filters
}: InfiniteScrollWrapperProps) {
  const [animes, setAnimes] = useState<Anime[]>(initialAnimes);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset when search or filters change
  useEffect(() => {
    setAnimes(initialAnimes);
    setPage(2);
    setHasMore(initialHasMore);
  }, [initialAnimes, initialHasMore, searchName, JSON.stringify(filters)]);

  const fetchMore = async () => {
    if (loading || !hasMore) return;

    console.log(`Fetching page ${page} with filters:`, filters);
    setLoading(true);

    try {
      let result;
        // For regular anime with filters - FIXED: Added sort parameter
        result = await fetchMoreAnimes(
          page,
          searchName,
          filters?.startDate,
          filters?.endDate,
          filters?.genre,
          filters?.rating,
          filters?.type,
          filters?.orderBy,
          filters?.sort // ✅ FIXED: Added missing sort parameter
        );

      setAnimes(prev => {
        // Prevent duplicates by filtering out anime that already exist
        const existingIds = new Set(prev.map(anime => anime.mal_id));
        const newAnimes = result.animes.filter(anime => !existingIds.has(anime.mal_id));
        return [...prev, ...newAnimes];
      });
      
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching more anime:", error);
      setHasMore(false); // Stop trying to fetch more on error
    } finally {
      setLoading(false);
    }
  };

  // Fixed Intersection Observer
  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px", // Start loading when 100px away from bottom
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, hasMore, page, searchName, JSON.stringify(filters)]); // ✅ FIXED: Added proper dependencies

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {animes.map((anime: Anime, index: number) => (
          <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
        ))}
      </div>
      
      <div 
        ref={observerRef} 
        className="h-10 mt-20 mb-10 flex justify-center items-center"
      >
        {loading && <LoadingSpinner />}
        {!hasMore && animes.length > 0 && (
          <p className="text-gray-400">
            {searchName ? 'No more search results.' : 'No more anime to load.'}
          </p>
        )}
        {!hasMore && animes.length === 0 && (
          <p className="text-gray-400">No anime found.</p>
        )}
      </div>
    </>
  );
}