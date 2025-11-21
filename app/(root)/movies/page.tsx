
import AnimeGridSkeleton from "@/Components/AnimeGridSkeleton";
import SearchForm from "@/Components/SearchForm";
import ShowsGrid from "@/Components/ShowsGrid";
import ShowsSearchForm from "@/Components/ShowsSearchForm";
import { Button } from "@/Components/ui/button";
import { Suspense } from "react";
import ShowsHero from "@/Components/ShowsHero";
const page = async ({ searchParams }: {searchParams : Promise<{name : string}>}) => {
  const query = (await searchParams).name; 

  return (
    <section>
      <ShowsHero text="discover" inHome={true} type="movie"/>
      {/* actual content */}
      <div className="mt-10">
        <div>
          <ShowsSearchForm name={query} type="movie" />
          <Suspense fallback={<AnimeGridSkeleton />}>
              <ShowsGrid type="movie" searchQuery={query as string} mode="discover"/>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default page;