import Image from "next/image";
import { getShowDetails } from "@/lib/ShowApi";
import { TVShowDetails } from "@/types/Show";
import Link from "next/link";

interface TvShowPageProps {
  params: { id: string };
}

export default async function page({ params }: TvShowPageProps) {
  const { id } = await params;

  const show = (await getShowDetails("tv", Number(id))) as TVShowDetails;

  if (!show) {
    return (
      <div className="text-center text-red-500 py-10">TV Show not found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      {/* Backdrop Banner */}
      {show.backdrop_path && (
        <div className="relative w-full h-[400px] mb-10 rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            alt={show.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-extrabold">
            {show.name}
          </h1>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        {show.poster_path && (
          <div className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              width={300}
              height={450}
              className="rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          {show.tagline && (
            <p className="italic text-gray-400 text-lg mb-4">
              “{show.tagline}”
            </p>
          )}

          {/* Genres */}
          <div className="flex flex-wrap gap-3 mb-6">
            {show.genres.map((g) => (
              <span
                key={g.id}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 rounded-full text-sm font-medium shadow-md"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-gray-200 leading-relaxed">{show.overview}</p>

          {/* Extra Info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <p>
              <span className="font-semibold text-white">📅 First Air Date:</span>{" "}
              {show.first_air_date}
            </p>
            <p>
              <span className="font-semibold text-white">📅 Last Air Date:</span>{" "}
              {show.last_air_date}
            </p>
            <p>
              <span className="font-semibold text-white">📺 Seasons:</span>{" "}
              {show.number_of_seasons}
            </p>
            <p>
              <span className="font-semibold text-white">🎞️ Episodes:</span>{" "}
              {show.number_of_episodes}
            </p>
            <p>
              <span className="font-semibold text-white">🎬 Status:</span>{" "}
              {show.status}
            </p>
            <p>
              <span className="font-semibold text-white">⭐ Rating:</span>{" "}
              {show.vote_average.toFixed(1)}
            </p>
          </div>

          {/* ✅ Button to Seasons */}
          <div className="mt-8">
            <Link
              href={`/tvShows/${id}/seasons`}
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              View Seasons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
