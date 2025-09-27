import Anime, { EpisodesResponse } from "@/types/Anime";
import { AnimeCharacter } from "@/types/Anime";
const JIKAN_BASE_URL = "https://api.jikan.moe/v4/anime";

interface AnimeResponse {
  animes: Anime[];
  hasMore: boolean;
}

export async function fetchInitialAnimes(
  searchName?: string,
  startDate?: string, // YYYY-MM-DD
  endDate?: string,   // YYYY-MM-DD
  genres?: number[],  // MAL genre IDs
  rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx",
  type?: "tv" | "movie" | "ova" | "special" | "ona" | "music",
  orderBy?: "mal_id" | "title" | "start_date" | "end_date" | "episodes" | "score" | "scored_by" | "rank" | "popularity" | "members" | "favorites",
  sort?: "asc" | "desc"
): Promise<AnimeResponse> {
  try {
    const params = new URLSearchParams({
      page: "1",
      limit: "25",
    });

    // Search query
    if (searchName) params.set("q", searchName);

    // Date filters
    if (startDate) params.set("start_date", startDate);
    if (endDate) params.set("end_date", endDate);

    // Genres
    if (genres && genres.length > 0) params.set("genres", genres.join(","));

    // Rating
    if (rating) params.set("rating", rating);

    // Type
    if (type) params.set("type", type);

    // Sorting
    if (orderBy) params.set("order_by", orderBy);
    if (sort) params.set("sort", sort);

    const url = `${JIKAN_BASE_URL}?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: searchName ? 300 : 3600 }, // Cache search for 5min, browse for 1hr
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const newAnimes = data.data || [];

    // Filter out hentai content
    const filteredAnimes = newAnimes.filter(
      (anime: Anime) =>
        !anime.genres.some((genre) => genre.name.toLowerCase() === "hentai")
    );

    return {
      animes: filteredAnimes,
      hasMore: newAnimes.length >= 25,
    };
  } catch (error) {
    console.error("Error fetching initial anime:", error);
    return { animes: [], hasMore: false };
  }
}




export async function fetchMoreAnimes(
  page: number,
  searchName?: string,
  startDate?: string,
  endDate?: string,
  genres?: number[],
  rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx",
  type?: "tv" | "movie" | "ova" | "special" | "ona" | "music",
  orderBy?: "mal_id" | "title" | "start_date" | "end_date" | "episodes" | "score" | "scored_by" | "rank" | "popularity" | "members" | "favorites",
  sort?: "asc" | "desc"
): Promise<AnimeResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "25",
    });

    // Apply filters again
    if (searchName) params.set("q", searchName);
    if (startDate) params.set("start_date", startDate);
    if (endDate) params.set("end_date", endDate);
    if (genres && genres.length > 0) params.set("genres", genres.join(","));
    if (rating) params.set("rating", rating);
    if (type) params.set("type", type);
    if (orderBy) params.set("order_by", orderBy);
    if (sort) params.set("sort", sort);

    const url = `${JIKAN_BASE_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const newAnimes = data.data || [];

    // Filter out hentai content
    const filteredAnimes = newAnimes.filter(
      (anime: Anime) =>
        !anime.genres.some((genre) => genre.name.toLowerCase() === "hentai")
    );

    return {
      animes: filteredAnimes,
      hasMore: newAnimes.length >= 25,
    };
  } catch (error) {
    console.error("Error fetching more anime:", error);
    return { animes: [], hasMore: false };
  }
}


//Anime Details
export async function fetchAnimeDetails(
  animeId: string
): Promise<Anime | null> {
  try {
    const response = await fetch(`${JIKAN_BASE_URL}/${animeId}`);
    if (!response.ok) throw new Error(`Error Status ${response.status}`);

    const { data } = await response.json();
    return data as Anime;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Anime Episodes
export async function fetchAnimeEpisodes(
  animeId: string,
  page: number = 1
): Promise<EpisodesResponse | null> {
  try {
    const response = await fetch(
      `${JIKAN_BASE_URL}/${animeId}/episodes?page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status}`);
    }

    const data: EpisodesResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchAnimeCharacters(id : string) : Promise<AnimeCharacter | null>{
    try{
      const response = await fetch(`${JIKAN_BASE_URL}/${id}/characters`)
      if(!response.ok) throw new Error(`Error fetching anime Characters . server failed , status : ${response.status}`)
      
      const characters : AnimeCharacter = await response.json();
      return characters;
    }catch(error){
      console.log(error);
      return null
    }
}
