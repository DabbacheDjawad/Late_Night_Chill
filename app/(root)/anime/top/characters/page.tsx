// app/(root)/characters/top/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { fetchTopCharacters } from "@/lib/AnimeApi";
import TopCharactersClient from "@/Components/topCharacterClient";

export default async function page() {
  const initialData = await fetchTopCharacters(1);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Top Anime Characters</h1>
      <TopCharactersClient initialData={initialData} />
    </section>
  );
}
