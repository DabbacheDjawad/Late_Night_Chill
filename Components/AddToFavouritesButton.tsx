"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface AddToFavouritesButtonProps {
  mediaId: number;
  mediaType: "anime" | "movie" | "tv";
}

const AddToFavouritesButton: React.FC<AddToFavouritesButtonProps> = ({
  mediaId,
  mediaType,
}) => {
  const { data: session } = useSession();
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch initial favourite state
  useEffect(() => {
    const fetchFavourite = async () => {
      if (!session?.user) return;
      try {
        const res = await fetch(`/api/favourite/${mediaId}?mediaType=${mediaType}` , {method : "POST"});
        const data = await res.json();
        if (res.ok && data.isFavourite) setIsFavourite(true);
        console.log(data);
        
      } catch (err) {
        console.error("Error checking favourite:", err);
      }
    };
    fetchFavourite();
  }, [mediaId, mediaType, session]);

  const toggleFavourite = async () => {
    if (!session?.user) {
      alert("Please log in to add to favourites!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/favourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId, mediaType }),
      });

      if (res.ok) {
        setIsFavourite((prev) => !prev);
      } else {
        console.error("failed to toggle" + res);
      }
    } catch (err) {
      console.error("Error toggling favourite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={toggleFavourite}
      whileTap={{ scale: 0.9 }}
      disabled={loading}
      className="flex items-center justify-center p-2 rounded-full transition-colors"
      aria-label="Add to favourites"
    >
      <Heart
        className={`w-6 h-6 transition-all duration-200 ${
          isFavourite
            ? "fill-red-500 stroke-red-500"
            : "stroke-zinc-400 hover:stroke-red-500"
        }`}
      />
    </motion.button>
  );
};

export default AddToFavouritesButton;
