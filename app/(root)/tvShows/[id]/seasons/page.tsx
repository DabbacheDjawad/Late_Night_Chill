export const dynamic = "force-dynamic";
export const revalidate = 0;
import { fetchTvShowSeasons } from "@/lib/ShowApi";
import Image from "next/image";
import Link from "next/link";

interface SeasonPageProps {
  params: { id: string };
}

export default async function TVSeasonsPage({ params }: {params : Promise<{id : string}>}) {
  const { id } = await params;
  const seasons = await fetchTvShowSeasons(id);

  if (!seasons || seasons.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400 text-lg">
        No seasons available.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
        📺 Seasons
      </h1>

      {/* Seasons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {seasons.map((season: any) => (
          <Link
            key={season.id}
            href={`/tvShows/${id}/seasons/${season.season_number}`}
            className="group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-transform transform hover:scale-105 bg-gray-900/40 backdrop-blur-sm border border-gray-700"
          >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                    : "/fallback.png"
                }
                alt={season.name}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
            {/* Info */}
            <div className="p-3">
              <h2 className="font-bold text-lg truncate group-hover:text-blue-400 transition-colors">
                {season.name}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Episodes:{" "}
                <span className="text-gray-200 font-medium">
                  {season.episode_count}
                </span>
              </p>
              {season.air_date && (
                <p className="text-xs text-gray-500 mt-1">
                  Aired: {season.air_date}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
