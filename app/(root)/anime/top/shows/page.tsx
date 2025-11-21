export const dynamic = "force-dynamic";
export const revalidate = 0;
import { Button } from "@/Components/ui/button";
import { Suspense } from "react";
import { fetchInitialAnimes } from "@/lib/AnimeApi";
import InfiniteScrollWrapper from "@/Components/InfiniteScrollWrapper";
import AnimeCard from "@/Components/AnimeCard";

const Page = async () => {
  const initialData = await fetchInitialAnimes(
    "",
    "",
    "",
    undefined,
    undefined,
    undefined,
    "score",
    "desc"
  );
  return (
    <section>
      {/* hero */}
      <div className="w-[90%] ml-[5%] rounded-lg h-[400px] bg-cover bg-no-repeat bg-center topAnime-bg">
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
        <Suspense>
          <InfiniteScrollWrapper
            initialAnimes={initialData.animes}
            hasMore={initialData.hasMore}
            searchName={""}
            filters={{
              orderBy: "score",
              sort: "desc",
              startDate: "",
              endDate: "",
              genre: undefined,
              type: undefined,
              rating: undefined,
            }}
          >
            <div className="flex flex-wrap justify-center gap-10 mt-6">
              {initialData.animes.map((anime, index) => (
                <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
              ))}
            </div>
          </InfiniteScrollWrapper>
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
