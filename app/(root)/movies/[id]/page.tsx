export const dynamic = "force-dynamic";
export const revalidate = 0;
import Image from "next/image";
import { getShowDetails } from "@/lib/ShowApi";
import { MovieDetails } from "@/types/Movie";
import AddToFavouritesButton from "@/Components/AddToFavouritesButton";
import WishlistButton from "@/Components/wishListButton";

interface MoviePageProps {
  params: { id: string };
}

export default async function MovieDetailsPage({ params }: {params : Promise<{id : string}>}) {

    const {id} = (await params)

  const movie = (await getShowDetails("movie", Number(id))) as MovieDetails;

  if (!movie) {
    return <div className="text-center text-red-500 py-10">Movie not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      {/* Backdrop Banner */}
      {movie.backdrop_path && (
        <div className="relative w-full h-[400px] mb-10 rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-extrabold">
            {movie.title}
          </h1>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        {movie.poster_path && (
          <div className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          {movie.tagline && (
            <p className="italic text-gray-400 text-lg mb-4">“{movie.tagline}”</p>
          )}

          {/* Genres */}
          <div className="flex justify-between items-baseline">
            <div className="flex flex-wrap gap-3 mb-6">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium shadow-md"
                >
                  {g.name}
                </span>
              ))}
            </div>
            <div className="flex">
                <AddToFavouritesButton mediaId={movie.id} mediaType="movie"/>
                <WishlistButton mediaId={movie.id} mediaType={"movie"} />
            </div>
          </div>
          {/* Overview */}
          <p className="text-gray-200 leading-relaxed">{movie.overview}</p>

          {/* Extra Info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <p>
              <span className="font-semibold text-white">📅 Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="font-semibold text-white">⏳ Runtime:</span>{" "}
              {movie.runtime} min
            </p>
            <p>
              <span className="font-semibold text-white">🎬 Status:</span>{" "}
              {movie.status}
            </p>
            <p>
              <span className="font-semibold text-white">⭐ Rating:</span>{" "}
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
