import Image from "next/image";
import fallbackImage from "@/public/fallback.png";
import { Star } from "lucide-react";
import Link from "next/link";
import TvShow from "@/types/Show";

interface TvShowCardProps {
  show: TvShow;
}

export default function TvShowCard({ show }: TvShowCardProps) {
  const releaseYear = show.first_air_date
    ? show.first_air_date.slice(0, 4)
    : "N/A";

  return (
    <div className="border dark:border-white dark:text-white text-black border-black rounded-lg p-2 h-fit dark:shadow-[3px_3px_8px_white] hover:scale-105 transition-all duration-75 shadow-[3px_3px_10px_black] cursor-pointer hover:dark:shadow-[3px_3px_20px_white] hover:shadow-[3px_3px_20px_black]">
      <Link href={`/tvShows/${show.id}`}>
        <Image
          src={
            show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : fallbackImage
          }
          alt={show.name}
          width={200}
          height={300}
          className="max-h-[300px] rounded-lg"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
        />
        <h2 className="font-bold w-[180px] truncate text-center text-lg">
          {show.name}
        </h2>
        <div className="flex justify-between text-sm mt-2">
          <span>{releaseYear}</span>
          <div className="flex items-center gap-1">
            <Star color={"yellow"} size={16} />
            <span>{show.vote_average?.toFixed(1)}</span>
          </div>
          <span>{show.adult ? "+18" : "-18"}</span>
        </div>
      </Link>
    </div>
  );
}
