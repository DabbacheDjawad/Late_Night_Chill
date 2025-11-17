import Image from "next/image";
import fallbackImage from "@/public/fallback.png";
import { Star } from "lucide-react";
import { AnimeResponse,Anime } from "@/types/Anime";
import Link from "next/link";
import AddToFavouritesButton from "./AddToFavouritesButton";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="border max-sm:w-[40%] dark:border-white border-black rounded-lg p-2 dark:shadow-[3px_3px_10px_white]
     shadow-[3px_3px_10px_black] hover:dark:shadow-[3px_3px_20px_white] hover:shadow-[3px_3px_20px_black]">
      <Link href={`/anime/${anime.mal_id}`}>
        <Image
          src={anime.images.webp?.image_url || fallbackImage}
          alt={anime.titles[0].title}
          width={200}
          height={100}
          className="max-h-[300px] min-h-[250px] rounded-lg"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <h2 className="font-bold w-[180px] truncate text-center max-sm:text-start max-sm:w-full text-lg max-sm:text-xs">
          {anime.titles[0].title}
        </h2>
        <div className="flex justify-between text-sm mt-2 flex-wrap gap-2">
          <span>{anime.status?.split(" ")[0]}</span>
          <span>{anime.aired?.from?.slice(0, 4)}</span>
          <div className="flex items-center gap-1">
            <Star color={"yellow"} size={16} />
            <span>{anime.score}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}