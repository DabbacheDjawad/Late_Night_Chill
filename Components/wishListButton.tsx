"use client";

import { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";

interface WishlistButtonProps {
  mediaId: number;
  mediaType: "anime" | "movie" | "tv";
}

const WishlistButton = ({ mediaId, mediaType }: WishlistButtonProps) => {
  const [isWishListed, setIsWishListed] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if item is already in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await fetch(`/api/wishList/${mediaId}?mediaType=${mediaType}`,{method : "POST"});
        const data = await res.json();
        if (res.ok && data.isWishListed !== undefined) {
          setIsWishListed(data.isWishListed);
        }
      } catch (error) {
        console.error("❌ Failed to check wishlist:", error);
      }
    };

    checkWishlist();
  }, [mediaId, mediaType]);


  const toggleWishlist = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wishList`, {
         method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId, mediaType }),
      });
      const data = await res.json();
      if (res.ok && data.isWishListed !== undefined) {
        setIsWishListed(data.isWishListed);
      }
    } catch (error) {
      console.error("❌ Error toggling wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all"
      aria-label="Toggle wishlist"
    >
      <FaClipboardList
        className={`w-6 h-6 transition-all duration-200 ${
          isWishListed
            ? "fill-red-500 text-red-500"
            : "text-gray-300 group-hover:text-red-400"
        }`}
      />
    </button>
  );
};

export default WishlistButton;
