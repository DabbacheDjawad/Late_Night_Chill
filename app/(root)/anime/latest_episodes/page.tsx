export const dynamic = "force-dynamic";
export const revalidate = 0;
import { Button } from "@/Components/ui/button";
import { Suspense } from "react";
import InfiniteScrollWrapper from "@/Components/InfiniteScrollWrapper";
import EpisodesCard from "@/Components/EpisodesCard";
import { fetchLatestEpisodes } from "@/lib/AnimeApi";
import { Episode } from "@/types/Anime";

const Page = async () => {
  const initialData = await fetchLatestEpisodes();
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
            latestEpisodes={true}
          >
            <div className="flex flex-wrap justify-center gap-10 mt-6">
              {initialData.animes.map((episode : Episode, index : number) => (
                <EpisodesCard key={`${episode.mal_id}-${index}`} episode={episode} /> 
              ))}
            </div>
          </InfiniteScrollWrapper>
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
