export const dynamic = "force-dynamic";
export const revalidate = 0;
import AnimeGridSkeleton from "@/Components/AnimeGridSkeleton";
import SearchForm from "@/Components/SearchForm";
import ShowsGrid from "@/Components/ShowsGrid";
import ShowsSearchForm from "@/Components/ShowsSearchForm";
import { Button } from "@/Components/ui/button";
import { Suspense } from "react";
const page = async ({ searchParams }: {searchParams : Promise<{name : string}>}) => {
     const query = (await searchParams).name;
  return (
 <section>
      {/* hero */}
      <div className="w-[90%] ml-[5%] rounded-lg h-[400px] bg-cover bg-no-repeat bg-center show-bg">
        <div className="relative z-10 text-white top-[15%] left-[5%]">
          <h1 className="text-3xl max-md:text-xl font-bold mb-5">
            Discover Amazing Anime
          </h1>
          <p className="max-w-[500px] max-md:max-w-[300px]">
            Explore the worldwide tv series with our huge library
            of the best and latest TV Shows
          </p>
          <Button className="bg-transparent border border-white text-white mt-2">
            Get Started
          </Button>
        </div>
      </div>

      {/* actual content */}
      <div className="mt-10">
        <div>
          <ShowsSearchForm name={query} type="tv" />
          <Suspense fallback={<AnimeGridSkeleton />}>
              <ShowsGrid mode="discover" type="tv" searchQuery={query as string}/>
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default page
