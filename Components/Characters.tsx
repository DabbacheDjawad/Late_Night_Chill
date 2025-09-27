"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAnimeCharacters } from "@/lib/AnimeApi";
import { AnimeCharacter } from "@/types/Anime";

export default function Characters({ id }: { id: string }) {
  const [characters, setCharacters] = useState<AnimeCharacter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAnimeCharacters(id)
      .then(setCharacters)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading characters...</p>;
  if (!characters) return <p className="p-6">No characters found.</p>;

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {characters.data.map((entry) => (
        <div
          key={entry.character.mal_id}
          className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition"
        >
          <Link href={entry.character.url} target="_blank">
            <Image
              src={entry.character.images.jpg?.image_url || "/fallback.png"}
              alt={entry.character.name}
              width={150}
              height={200}
              className="rounded-md object-cover"
            />
          </Link>
          <h3 className="mt-2 font-semibold text-center">
            {entry.character.name}
          </h3>
          <p className="text-sm text-gray-500">{entry.role}</p>
          {entry.voice_actors[0] && (
            <p className="text-xs text-gray-400 mt-1">
              VA: {entry.voice_actors[0].person.name} (
              {entry.voice_actors[0].language})
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
