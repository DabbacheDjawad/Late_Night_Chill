"use client";

import { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import InfiniteScrollWrapper from "./InfiniteScrollWrapper";
import { fetchInitialAnimes } from "../lib/AnimeApi";
import {Anime} from "@/types/Anime";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { CiFilter } from "react-icons/ci";
import { Rating , type , orderBy , Sort } from "@/types/Anime";


interface AnimeGridProps {
  searchName?: string;
  initialData: {
    animes: Anime[];
    hasMore: boolean;
  };
}



export default function AnimeGrid({ searchName, initialData }: AnimeGridProps) {
  const [filters, setFilters] = useState<{
    genre: number[] | undefined;
    rating: Rating
    type: type
    startDate: string;
    endDate: string;
    orderBy:orderBy| undefined;
    sort: Sort;
  }>({
    genre: undefined,
    rating: undefined,
    type: undefined,
    sort: "desc",
    orderBy: undefined,
    startDate: "",
    endDate: "",
  });

  const [animeList, setAnimeList] = useState<Anime[]>(initialData.animes);
  const [hasMore, setHasMore] = useState(initialData.hasMore);

useEffect(() => {
  const fetchFiltered = async () => {
    const data = await fetchInitialAnimes(
      searchName,
      filters.startDate,
      filters.endDate,
      filters.genre,
      filters.rating,
      filters.type,
      filters.orderBy,
      filters.sort 
    );
    setAnimeList(data.animes);
    setHasMore(data.hasMore);
  };

  fetchFiltered();
}, [searchName, filters])

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="flex justify-center mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="lg:hidden max-sm:translate-x-[40vw] max-lg:-translate-y-[100%] sm:translate-x-[30vw]"
            >
              <CiFilter />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70%]">
            <SheetHeader>
              <SheetTitle>Filter Animes</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-6">
              {/* Date Filter */}
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="border rounded px-2 py-1"
              />

              {/* Rating */}
              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value as Rating })
                }
                className="border rounded px-2 py-1 "
              >
                <option className="text-black" value="">
                  All Ratings
                </option>
                <option className="text-black" value="g">
                  G - All Ages
                </option>
                <option className="text-black" value="pg">
                  PG - Children
                </option>
                <option className="text-black" value="pg13">
                  PG-13 - Teens 13+
                </option>
                <option className="text-black" value="r17">
                  R - 17+
                </option>
                <option className="text-black" value="r">
                  R+ - Mild Nudity
                </option>
                <option className="text-black" value="rx">
                  Rx - Hentai
                </option>
              </select>

              {/* Type */}
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value as type })
                }
                className="border rounded px-2 py-1"
              >
                <option className="text-black" value="">
                  All Types
                </option>
                <option className="text-black" value="tv">
                  TV
                </option>
                <option className="text-black" value="movie">
                  Movie
                </option>
                <option className="text-black" value="ova">
                  OVA
                </option>
                <option className="text-black" value="special">
                  Special
                </option>
                <option className="text-black" value="ona">
                  ONA
                </option>
                <option className="text-black" value="music">
                  Music
                </option>
              </select>

              {/* Order By */}
              <select
                value={filters.orderBy}
                onChange={(e) =>
                  setFilters({ ...filters, orderBy: e.target.value as orderBy })
                }
                className="border rounded px-2 py-1"
              >
                <option className="text-black" value="">
                  Order By
                </option>
                <option className="text-black" value="title">
                  Title
                </option>
                <option className="text-black" value="score">
                  Score
                </option>
                <option className="text-black" value="popularity">
                  Popularity
                </option>
                <option className="text-black" value="favorites">
                  Favorites
                </option>
                <option className="text-black" value="rank">
                  Rank
                </option>
              </select>

              {/* Sort */}
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sort: e.target.value as "asc" | "desc" | undefined,
                  })
                }
                className="border rounded px-2 py-1"
              >
                <option className="text-black" value="asc">
                  Ascending
                </option>
                <option className="text-black" value="desc">
                  Descending
                </option>
              </select>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Filter UI */}
      <div className="max-lg:hidden flex gap-4 mb-6 justify-center mt-5 max-sm:text-sm flex-wrap">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          className="border rounded px-2 py-1"
        />

        {/* <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="border rounded px-2 py-1 text-white"
        >
          <option className="text-black" value="">All Genres</option>
          <option className="text-black" value="1">Action</option>
          <option className="text-black" value="2">Adventure</option>
          <option className="text-black" value="4">Comedy</option>
          <option className="text-black" value="8">Drama</option>
        </select> */}

        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters({ ...filters, rating: e.target.value as Rating })
          }
          className="border rounded px-2 py-1 dark:text-white text-black"
        >
          <option className="text-black" value="">
            All Ratings
          </option>
          <option className="text-black" value="g">
            G - All Ages
          </option>
          <option className="text-black" value="pg">
            PG - Children
          </option>
          <option className="text-black" value="pg13">
            PG-13 - Teens 13+
          </option>
          <option className="text-black" value="r17">
            R - 17+
          </option>
          <option className="text-black" value="r">
            R+ - Mild Nudity
          </option>
          <option className="text-black" value="rx">
            Rx - Hentai
          </option>
        </select>

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value as type })
          }
          className="border rounded px-2 py-1 dark:text-white text-black"
        >
          <option className="text-black" value="">
            All Types
          </option>
          <option className="text-black" value="tv">
            TV
          </option>
          <option className="text-black" value="movie">
            Movie
          </option>
          <option className="text-black" value="ova">
            OVA
          </option>
          <option className="text-black" value="special">
            Special
          </option>
          <option className="text-black" value="ona">
            ONA
          </option>
          <option className="text-black" value="music">
            Music
          </option>
        </select>

        {/* Order By */}
        <select
          value={filters.orderBy || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              orderBy: e.target.value as typeof filters.orderBy,
            })
          }
          className="border rounded px-2 py-1 dark:text-white text-black"
        >
          <option className="text-black" value="">
            Order By
          </option>
          <option className="text-black" value="title">
            Title
          </option>
          <option className="text-black" value="start_date">
            Start Date
          </option>
          <option className="text-black" value="end_date">
            End Date
          </option>
          <option className="text-black" value="episodes">
            Episodes
          </option>
          <option className="text-black" value="score">
            Score
          </option>
          <option className="text-black" value="rank">
            Rank
          </option>
          <option className="text-black" value="popularity">
            Popularity
          </option>
          <option className="text-black" value="members">
            Members
          </option>
          <option className="text-black" value="favorites">
            Favorites
          </option>
        </select>

        {/* Sort Asc/Desc */}
        <select
          value={filters.sort || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              sort: e.target.value as "asc" | "desc",
            })
          }
          className="border rounded px-2 py-1 dark:text-white text-black"
        >
          <option className="text-black" value="asc">
            Ascending
          </option>
          <option className="text-black" value="desc">
            Descending
          </option>
        </select>
      </div>

      {/* Anime Cards */}
      <InfiniteScrollWrapper 
  initialAnimes={animeList} 
  hasMore={hasMore} 
  searchName={searchName} 
  filters={filters} 
>
  <div className="flex flex-wrap justify-center gap-10 mt-6">
    {animeList.map((anime, index) => (
      <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
    ))}
  </div>
</InfiniteScrollWrapper>
    </div>
  );
}
