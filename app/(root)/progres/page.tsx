"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Play } from "lucide-react";

interface WatchProgressItem {
  mediaType: "anime" | "movie" | "tv";
  mediaId: string;
  title: string;
  image?: string | null;
  lastEpisode?: number;
  notes?: string;
}

export default function KeepWatchingPage() {
  const [watchList, setWatchList] = useState<WatchProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/watchProgres");
        const data = await res.json();
        if (res.ok) setWatchList(data.watchProgress);
      } catch (err) {
        console.error("Error loading watch progress:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const updateProgress = async (item: WatchProgressItem) => {
    try {
      setUpdatingId(item.mediaId);
      const res = await fetch("/api/watchProgres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Failed to update progress");
      setWatchList((prev) =>
        prev.map((w) =>
          w.mediaId === item.mediaId && w.mediaType === item.mediaType
            ? { ...w, lastEpisode: item.lastEpisode, notes: item.notes }
            : w
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteProgress = async (item: WatchProgressItem) => {
    try {
      const res = await fetch("/api/watchProgres", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaType: item.mediaType,
          mediaId: item.mediaId,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete progress");
      setWatchList((prev) =>
        prev.filter(
          (w) =>
            !(w.mediaId === item.mediaId && w.mediaType === item.mediaType)
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh] text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (!watchList.length)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-lg text-muted-foreground">
          You haven't started watching anything yet 😢
        </p>
      </div>
    );

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8">Keep Watching 🎬</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {watchList.map((item) => (
          <div
            key={`${item.mediaType}-${item.mediaId}`}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg p-3 flex flex-col"
          >
            <div className="relative aspect-[2/3] w-full mb-2">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="bg-zinc-800 flex items-center justify-center h-full rounded-lg">
                  <span className="text-zinc-500 text-sm">No image</span>
                </div>
              )}
            </div>
            <h2 className="text-sm font-semibold truncate">{item.title}</h2>
            <p className="text-xs text-zinc-400 mt-1 capitalize">
              {item.mediaType === "anime"
                ? "Anime"
                : item.mediaType === "movie"
                ? "Movie"
                : "TV Show"}
            </p>

            {/* Last Episode Input */}
            <input
              type="number"
              min={1}
              placeholder="Last Episode"
              value={item.lastEpisode ?? ""}
              onChange={(e) =>
                setWatchList((prev) =>
                  prev.map((w) =>
                    w.mediaId === item.mediaId
                      ? { ...w, lastEpisode: Number(e.target.value) }
                      : w
                  )
                )
              }
              className="mt-2 p-1 rounded bg-zinc-800 text-sm text-white"
            />

            {/* Notes Input */}
            <textarea
              placeholder="Notes"
              value={item.notes ?? ""}
              onChange={(e) =>
                setWatchList((prev) =>
                  prev.map((w) =>
                    w.mediaId === item.mediaId
                      ? { ...w, notes: e.target.value }
                      : w
                  )
                )
              }
              className="mt-2 p-1 rounded bg-zinc-800 text-sm text-white resize-none"
            />

            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateProgress(item)}
                disabled={updatingId === item.mediaId}
                className="bg-green-600 px-2 py-1 rounded text-white text-sm flex-1 hover:bg-green-500 transition"
              >
                {updatingId === item.mediaId ? "Updating..." : "Save"}
              </button>
              <button
                onClick={() => deleteProgress(item)}
                className="bg-red-600 px-2 py-1 rounded text-white text-sm flex-1 hover:bg-red-500 transition flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>

            {/* Resume Watching Button */}
            <a
              href={
                item.mediaType === "anime" || item.mediaType === "tv"
                  ? `/${item.mediaType}/${item.mediaId}?episode=${item.lastEpisode ?? 1}`
                  : `/${item.mediaType}/${item.mediaId}`
              }
              className="mt-2 block text-center bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm transition items-center justify-center gap-1"
            >
              <Play className="w-4 h-4" /> Resume Watching
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
