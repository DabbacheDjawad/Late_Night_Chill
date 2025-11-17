"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface WishListMedia {
  id: string;
  malId?: string;
  tmdbId?: string;
  type: "anime" | "movie" | "tv";
  title: string;
  image: string | null;
  rating?: number;
  releaseDate?: string;
}

export default function WishListPage() {
  const [wishlist, setWishList] = useState<WishListMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishListeds = async () => {
      try {
        const res = await fetch("/api/wishList");
        const data = await res.json();
        if (res.ok) setWishList(data.allwishlists);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishListeds();
  }, []);

  const handleDelete = async (item : WishListMedia) => {
    setDeletingId(item.id);
    try {
      const res = await fetch(`/api/wishList`, { method: "DELETE" ,
        body: JSON.stringify({
        type: item.type,
        mediaId: item.id,})});
      if (res.ok) {
        setWishList((prev) => prev.filter((wishItem) => item.id !== wishItem.id));
      } else {
        console.error("Failed to delete wishlist item");
      }
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
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

  if (wishlist.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-lg text-muted-foreground">No WishListings yet 😢</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add some anime, movies, or TV shows to your Wishlist to see them here.
        </p>
      </div>
    );

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8">Your WishList</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {wishlist.map((item) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all relative"
          >
            <button
              onClick={() => handleDelete(item)}
              disabled={deletingId === item.id}
              className="absolute z-10 top-2 right-2 bg-zinc-800/80 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              {deletingId === item.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>

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
