// app/(root)/anime/season-now/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { fetchCurrentSeason } from "@/lib/AnimeApi";
import SeasonNowClient from "@/Components/seasonsNowClient";

export default async function page() {
  const initialData = await fetchCurrentSeason(1);

  return (
    <section className="w-[90%] ml-[5%] mt-10">
      <h1 className="text-2xl font-bold mb-6">Currently Airing Anime</h1>
      <SeasonNowClient initialData={initialData} />
    </section>
  );
}
