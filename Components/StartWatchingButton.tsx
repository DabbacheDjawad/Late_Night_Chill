"use client";

import { useState } from "react";

interface StartWatchingButtonProps {
  mediaId: number;
  title : string,
  image : string
}

export default function StartWatchingButton({ mediaId , title , image }: StartWatchingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
       const res = await fetch("/api/watchProgres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaType: "anime",
          mediaId: String(mediaId),
          title,
          image,
          lastEpisode: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to start watching");
      setAdded(true);
      console.log("Added to watch progress");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || added}
      className={`rounded-lg cursor-pointer py-1 px-4 transition ${
        added
          ? "bg-gray-600 text-white cursor-not-allowed"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {loading ? "Loading..." : added ? "Watching" : "Start Watching"}
    </button>
  );
}
