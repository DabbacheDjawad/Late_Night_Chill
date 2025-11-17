"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface FavouriteMedia {
  id: string;
  malId?: string;
  tmdbId?: string;
  type: "anime" | "movie" | "tv";
  title: string;
  image: string | null;
  rating?: number;
  releaseDate?: string;
}

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<FavouriteMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch favourites on mount
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await fetch("/api/favourite");
        const data = await res.json();
        if (res.ok) setFavourites(data.favourites);
      } catch (err) {
        console.error("Error loading favourites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  // Delete favourite handler
  const handleDelete = async (item: FavouriteMedia) => {
    if (!confirm(`Remove "${item.title}" from favourites?`)) return;

    setDeletingId(item.id);
    try {
      const res = await fetch("/api/favourite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: item.type,
          mediaId: item.id,
        }),
      });

      if (res.ok) {
        setFavourites((prev) => prev.filter((f) => f.id !== item.id));
      } else {
        console.error("Failed to delete favourite:", await res.text());
      }
    } catch (err) {
      console.error("Error deleting favourite:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh] text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (favourites.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-lg text-muted-foreground">No favourites yet 😢</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add some anime, movies, or TV shows to your favourites to see them here.
        </p>
      </div>
    );

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Favourites ❤️</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {favourites.map((item) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            whileHover={{ scale: 1.05 }}
            className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item)}
              disabled={deletingId === item.id}
              className="absolute top-2 right-2 cursor-pointer z-10 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              {deletingId === item.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>

            {/* Media Card */}
            <Link
              href={
                item.type === "anime"
                  ? `/anime/${item.malId}`
                  : item.type === "movie"
                  ? `/movies/${item.tmdbId}`
                  : `/tvShows/${item.tmdbId}`
              }
            >
              <div className="relative aspect-[2/3] w-full">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                ) : (
                  <div className="bg-zinc-800 flex items-center justify-center h-full">
                    <span className="text-zinc-500 text-sm">No image</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h2 className="text-sm font-semibold truncate">{item.title}</h2>
                <p className="text-xs text-zinc-400 mt-1 capitalize">
                  {item.type === "anime"
                    ? "Anime"
                    : item.type === "movie"
                    ? "Movie"
                    : "TV Show"}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
