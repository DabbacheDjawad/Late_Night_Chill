"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCurrentSeason } from "@/lib/AnimeApi";
import {Anime} from "@/types/Anime";
import { SeasonResponse } from "@/types/Anime";
import fallback from "@/public/fallback.png";
import LoadingSpinner from "@/app/loading";

export default function SeasonNowClient({ initialData }: { initialData: SeasonResponse }) {
  const [animes, setAnimes] = useState<Anime[]>(initialData.animes);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialData.pagination.has_next_page);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const { animes: newAnimes, pagination } = await fetchCurrentSeason(nextPage);
    setAnimes((prev) => [...prev, ...newAnimes]);
    setPage(nextPage);
    setHasNextPage(pagination.has_next_page);
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <Link
            key={anime.mal_id}
            href={`/anime/${anime.mal_id}`}
            className="border rounded-lg shadow hover:shadow-md transition p-2 flex flex-col items-center"
          >
            <Image
              src={anime.images.webp?.image_url ?? anime.images.jpg?.image_url ?? fallback}
              alt={anime.titles[0].title}
              width={150}
              height={200}
              className="rounded-md object-cover"
            />
            <span className="mt-2 text-center text-sm font-medium">{anime.titles[0].title}</span>
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            disabled={loading}
            onClick={loadMore}
            className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 cursor-pointer "
          >
            {loading ? <LoadingSpinner /> : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
