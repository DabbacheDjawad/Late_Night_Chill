export const dynamic = "force-dynamic";
export const revalidate = 0;
import AnimeGrid from "@/Components/AnimeGrid";
import AnimeGridSkeleton from "@/Components/AnimeGridSkeleton";
import SearchForm from "@/Components/SearchForm";
import { Button } from "@/Components/ui/button";
import { Suspense } from "react";
import { fetchInitialAnimes } from "@/lib/AnimeApi";


const Page = async ({ searchParams }: {searchParams : Promise<{name : string}>}) => {
  const query =( await searchParams)?.name || "";

  const initialData = await fetchInitialAnimes(query);

  return (
    <section>
      {/* hero */}
      <div className="w-[90%] ml-[5%] rounded-lg h-[400px] bg-cover bg-no-repeat bg-center anime-bg">
        <div className="relative z-10 text-white top-[15%] left-[5%]">
          <h1 className="text-3xl max-md:text-xl font-bold mb-5">
            Discover Amazing Anime
          </h1>
          <p className="max-w-[500px] max-md:max-w-[300px]">
            Explore the world of japanese animations with our curated collection
            of the best anime series and movies
          </p>
          <Button className="bg-transparent border border-white text-white mt-2">
            Get Started
          </Button>
        </div>
      </div>

      {/* actual content */}
      <div className="mt-10">
        <SearchForm name={query} />
        <Suspense fallback={<AnimeGridSkeleton />}>
          <AnimeGrid searchName={query} initialData={initialData} />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
