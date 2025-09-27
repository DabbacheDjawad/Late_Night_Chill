"use client";

import { useEffect, useState } from "react";
import { fetchAnimeEpisodes } from "@/lib/AnimeApi";
import { AnimeEpisode, EpisodesResponse } from "@/types/Anime";

export default function EpisodesList({ animeId }: { animeId: string }) {
  const [episodes, setEpisodes] = useState<AnimeEpisode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisodes = async () => {
      setLoading(true);
      try {
        const res: EpisodesResponse | null = await fetchAnimeEpisodes(
          animeId,
          page
        );
        if (!res) throw new Error("Failed getting episodes, please try again");
        setEpisodes(res.data);
        setTotalPages(res.pagination.last_visible_page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, [animeId, page]);

  return (
    <div className="space-y-6">
      {/* Episodes */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : episodes.length === 0 ? (
        <p className="text-center">No episodes found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => (
            <div
              key={ep.mal_id}
              className="border dark:border-white/30 border-black/20 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Episode Title */}
              <h2 className="font-semibold text-lg mb-2">
                {ep.mal_id}. {ep.title}
              </h2>

              {/* Japanese & Romaji Titles */}
              <p className="text-sm text-muted-foreground">
                <span className="block italic">{ep.title_japanese || "N/A"}</span>
                <span className="block">{ep.title_romanji || "N/A"}</span>
              </p>

              {/* Extra Info */}
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Aired:</strong> {ep.aired || "Unknown"}
                </p>
                <p>
                  <strong>Score:</strong> {ep.score ?? "N/A"}
                </p>
                {ep.filler && <p className="text-red-500">Filler Episode</p>}
                {ep.recap && <p className="text-blue-500">Recap Episode</p>}
              </div>

              {/* Forum Link */}
              {ep.forum_url && (
                <a
                  href={ep.forum_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-[#f7374f] dark:text-green-400 hover:underline"
                >
                  Discussion →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1
                  ? "bg-[#f7374f] text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => {
              setPage((p) => p + 1)
              window.scrollTo(0 , 0);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
