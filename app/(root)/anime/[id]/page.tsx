import Image from "next/image"
import { Star } from "lucide-react"
import fallbackImage from "@/public/fallback.png"
import {Anime} from "@/types/Anime"
import React from "react"
import { fetchAnimeDetails } from "@/lib/AnimeApi"
import Link from "next/link"

const AnimeDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const anime: Anime | null = await fetchAnimeDetails(id);
  if (!anime) return <p className="text-center mt-10">Anime not found.</p>;

  return (
    <section className="w-full">
      {/* Hero Section with Banner */}
      <div
        className="w-[90%] ml-[5%] rounded-lg h-[400px] bg-contain bg-right relative anime-bg"
        style={{
          backgroundImage: `url(${anime.images.webp?.image_url || fallbackImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
        <div className="relative z-10 text-white top-[20%] left-[5%]">
          <h1 className="text-4xl max-md:text-2xl font-bold mb-4">
            {anime.titles[0].title}
          </h1>
          <div className="flex gap-4 items-center text-sm mb-3">
            <span>{anime.status}</span>
            <span>{anime.year || "N/A"}</span>
            <div className="flex items-center gap-1">
              <Star color={"yellow"} size={18} />
              <span>{anime.score || "N/A"}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {anime.genres.map((genre) => (
              <span
                key={genre.name}
                className="bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex gap-5 mt-5 max-sm:text-sm ">
            <Link href={`/anime/${id}/episodes`} className="border border-black dark:border-white rounded-lg py-1 px-4">Episodes</Link>            
            <Link href={`/anime/${id}/characters`} className="border border-black dark:border-white rounded-lg py-1 px-4">Characters</Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-[90%] ml-[5%] mt-10 flex flex-col xl:flex-row gap-10">
        {/* Poster */}
        <div className="lg:w-1/4 flex flex-col sm:flex-row xl:flex-col gap-4 items-center">
          <Image
            src={anime.images.webp?.image_url || fallbackImage}
            alt={anime.titles[0].title}
            width={300}
            height={400}
            className="rounded-lg shadow-lg"
          />

          {/* Extra Info */}
          <div className="text-sm text-muted-foreground space-y-2 w-full 2xl:ml-20">
            <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
            <p><strong>Duration:</strong> {anime.duration || "N/A"}</p>
            <p><strong>Rating:</strong> {anime.rating || "N/A"}</p>
            <p><strong>Type:</strong> {anime.type || "N/A"}</p>
            <p><strong>Source:</strong> {anime.source || "N/A"}</p>
            <p><strong>Studios:</strong> {anime.studios?.map(s => s.name).join(", ") || "N/A"}</p>
            <p><strong>Producers:</strong> {anime.producers?.map(p => p.name).join(", ") || "N/A"}</p>
            <Link href={`/anime/${id}/episodes`} className="border dark:border-white border-black text-black
             dark:text-white rounded-lg py-2 px-10 relative top-5">
            Episodes
            </Link>
          </div>
        </div>

        {/* Details */}
        <div className=" space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {anime.synopsis || "No synopsis available."}
            </p>
          </div>

          {/* Background Info */}
          {anime.background && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Background</h2>
              <p className="text-muted-foreground leading-relaxed">
                {anime.background}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Trailer */}
          {anime.trailer?.embed_url && (
            <div className="mt-15 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-3 ml-[5%]">Trailer</h2>
              <iframe
                className="w-[90%] min-2xl:w-[70%] aspect-video rounded-lg shadow"
                src={anime.trailer.embed_url}
                allowFullScreen
              />
            </div>
          )}
    </section>
  );
};

export default AnimeDetailsPage;
