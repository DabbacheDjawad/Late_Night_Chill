import Image from "next/image";
import { Star } from "lucide-react";
import {Episode} from "@/types/Anime";

interface EpisodeCardProps {
  episode: Episode;
}

export default function page({ episode }: EpisodeCardProps) {
    
  return (
    <div className="border rounded-lg p-4 w-[300px] shadow-md bg-white dark:bg-gray-900">
      {/* Anime Info */}
      <div className="flex gap-3 mb-3">
        <Image
          src={episode.images.jpg.image_url}
          alt={episode.title}
          width={70}
          height={100}
          className="rounded-md object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold line-clamp-2">
            {episode.title}
          </h2>
        </div>
      </div>

      {/* Latest Episodes */}
      <div className="space-y-2">
          <div
            key={episode.latestEpisode.mal_id}
            className="border-t pt-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-sm">{episode.latestEpisode.title}</p>
              <p className="text-xs text-gray-500">{episode.latestEpisode.aired}</p>
            </div>
          </div>
      </div>
    </div>
  );
}
