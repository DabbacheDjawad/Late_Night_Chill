import { fetchTvSeasonEpisodes } from "@/lib/ShowApi";
import Image from "next/image";

interface SeasonEpisodesPageProps {
  params: { id: string; seasonId: string };
}

export default async function SeasonEpisodesPage({
  params,
}: SeasonEpisodesPageProps) {
  const { id, seasonId } = await params;
  
  const seasonData = await fetchTvSeasonEpisodes(id, seasonId);

  if (!seasonData?.episodes || seasonData.episodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400 text-lg">
        No episodes found for this season.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      {/* Season Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
        {seasonData.name} — Episodes
      </h1>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {seasonData.episodes.map((episode: any) => (
          <div
            key={episode.id}
            className="group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-transform transform hover:scale-[1.02] bg-gray-900/40 backdrop-blur-sm border border-gray-700"
          >
            {/* Still Image */}
            <div className="relative w-full aspect-video">
              <Image
                src={
                  episode.still_path
                    ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                    : "/fallback.png"
                }
                alt={episode.name}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="font-bold text-lg truncate group-hover:text-blue-400 transition-colors">
                {episode.episode_number}. {episode.name}
              </h2>
              {episode.air_date && (
                <p className="text-xs text-gray-400 mt-1">
                  Aired: {episode.air_date}
                </p>
              )}
              <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                {episode.overview || "No description available."}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Runtime: {episode.runtime || "?"} min
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
