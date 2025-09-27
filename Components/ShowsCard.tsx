import Image from "next/image";
import fallbackImage from "@/public/fallback.png";
import { Star } from "lucide-react";
import Movie from "@/types/Movie";
import TvShow from "@/types/Show";
import { log } from "console";

interface ShowCardProps {
  show: Movie | TvShow;
}

export default function ShowsCard({ show }: ShowCardProps) {
  const getTitle = (show: Movie | TvShow): string => {
    return (show as Movie)?.title || (show as TvShow)?.name || 'Unknown Title';
  };
  

  const getReleaseYear = (show: Movie | TvShow): string => {
    const releaseDate = (show as Movie)?.release_date || (show as TvShow)?.first_air_date;
    return releaseDate?.slice(0, 4) || 'N/A';
  };

  return (
    <div className="border dark:border-white border-black rounded-lg p-2 h-fit dark:shadow-[3px_3px_8px_white] hover:scale-105 transition-all duration-75 shadow-[3px_3px_10px_black] cursor-pointer hover:dark:shadow-[3px_3px_20px_white] hover:shadow-[3px_3px_20px_black]">
      <div>
        <Image
          src={show?.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : fallbackImage}
          alt={getTitle(show)}
          width={200}
          height={300}
          className="max-h-[300px] rounded-lg"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <h2 className="font-bold w-[180px] truncate text-center text-lg">
          {getTitle(show)}
        </h2>
        <div className="flex justify-between text-sm mt-2">
          <span>{getReleaseYear(show)}</span>
          <div className="flex items-center gap-1">
            <Star color={"yellow"} size={16} />
            <span>{show?.vote_average?.toFixed(1)}</span>
          </div>
          <span>{show?.adult ? "+18" : "-18"}</span>
        </div>
      </div>
    </div>
  );
}