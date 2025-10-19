import Image from "next/image"
import { Star } from "lucide-react"
import fallbackImage from "@/public/fallback.png"
import Anime from "@/types/Anime"
import React from "react"
import Link from "next/link"
import EpisodesList from "@/Components/episodesList"

const page = async ({ params }: { params:Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <section className="w-[90%] ml-[5%] mt-10">
      <h1 className="text-3xl font-bold mb-6">Episodes</h1>
      <EpisodesList animeId={id} />
    </section>
  );
};

export default page;