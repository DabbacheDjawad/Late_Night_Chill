"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchTopCharacters } from "@/lib/AnimeApi";
import { CharactersResponse, TopCharacter } from "@/types/Anime";
import fallback from "../public/fallback.png";
import LoadingSpinner from "@/app/loading";

export default function TopCharactersClient({
  initialData,
}: {
  initialData: CharactersResponse;
}) {
  const [characters, setCharacters] = useState<TopCharacter[]>(initialData.characters);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialData.pagination.has_next_page);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const { characters: newChars, pagination } = await fetchTopCharacters(nextPage);
    setCharacters((prev) => [...prev, ...newChars]);
    setPage(nextPage);
    setHasNextPage(pagination.has_next_page);
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters.map((char) => (
          <Link
            key={char.mal_id}
            href={char.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-lg shadow hover:shadow-md transition p-3 flex flex-col items-center"
          >
            <Image
              src={char.images.webp?.image_url ?? char.images.jpg?.image_url ?? fallback}
              alt={char.name}
              width={150}
              height={200}
              className="rounded-md object-cover"
            />
            <div className="mt-2 text-center">
              <span className="block text-sm font-semibold">{char.name}</span>

              {/* Nicknames (if available) */}
              {char.nicknames && char.nicknames.length > 0 && (
                <span className="block text-xs text-gray-500">
                  AKA :  {char.nicknames.slice(0, 2).join(", ")}
                </span>
              )}

              {/* Favorites count */}
              <span className="block text-xs mt-1 text-gray-600">
                ❤️ {char.favorites.toLocaleString()} favorites
              </span>

              {/* Rank */}
              {char.rank && (
                <span className="block text-xs font-medium text-blue-600 mt-1">
                  Rank #{char.rank}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            disabled={loading}
            onClick={loadMore}
            className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <LoadingSpinner /> : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
