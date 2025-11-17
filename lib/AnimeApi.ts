import { EpisodesResponse, SeasonResponse, TopCharacter , Anime} from "@/types/Anime";
import { AnimeCharacter } from "@/types/Anime";
const JIKAN_BASE_URL = "https://api.jikan.moe/v4/anime";
import { AnimeResponse } from "@/types/Anime";
import { CharactersResponse } from "@/types/Anime";
import { Pagination } from "@/types/Anime";

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
  sort?: "asc" | "desc",
  latest ?: boolean,
  latestEpisodes ?:boolean
): Promise<AnimeResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "25",
    });

    if(latest && latest === true) return await fetchLatestAndRecentlyFinished(page);
    if(latestEpisodes && latestEpisodes === true) return await fetchLatestEpisodes(page);

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
    const response = await fetch(`${JIKAN_BASE_URL}/${animeId}` , {next : {revalidate : 60}});
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


//STILL AIRING OR RECENTLY FINISHED
export async function fetchLatestAndRecentlyFinished(page: number = 1): Promise<AnimeResponse> {
  try {
    // Fetch currently airing
    const airingRes = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}&limit=25`);
    const airingData = await airingRes.json();
    
    
    // Fetch recently finished (order by end_date, desc)
    const finishedRes = await fetch(
      `${JIKAN_BASE_URL}/anime?status=complete&order_by=end_date&sort=desc&page=${page}&limit=15`
    );
    const finishedData = await finishedRes.json();

    // Combine results
    const combined = [...(airingData.data || []), ...(finishedData.data || [])];

    // Filter hentai
    const filtered = combined.filter(
      (anime: Anime) =>
        !anime.genres.some((g) => g.name.toLowerCase() === "hentai")
    );

    return {
      animes: filtered,
      hasMore: filtered.length >= 25,
    };
  } catch (error) {
    console.error("Error fetching latest and recently finished anime:", error);
    return { animes: [], hasMore: false };
  }
}


//LATEST EPISODES
export async function fetchLatestEpisodes(page: number = 1) {
  try {
    const url = `https://api.jikan.moe/v4/watch/episodes?page=${page}&limit=25`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const episodes = data.data || [];

    // Extract anime info and add episode details
    const mapped = episodes.map((ep: any) => ({
      ...ep.entry,              // anime details (mal_id, title, images, etc.)
      latestEpisode: {
        title: ep.episodes[0]?.title,
        aired: ep.episodes[0]?.aired,
        mal_id: ep.episodes[0]?.mal_id,
        url: ep.episodes[0]?.url,
      },
    }));

    return {
      animes: mapped,
      hasMore: data.pagination?.has_next_page ?? false,
    };
  } catch (err) {
    console.error("Error fetching latest episodes:", err);
    return { animes: [], hasMore: false };
  }
}


//top characters
export async function fetchTopCharacters(page : number = 1 ): Promise<CharactersResponse>{
  try{
    const url = `https://api.jikan.moe/v4/top/characters?page=${page}&limit=24`;
    const res = await fetch(url);
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const characters = await res.json();

    return {
      characters :characters.data,
      pagination : characters.pagination as Pagination
    }
  }catch(error){
    console.log(error);
    return {
      characters : [],
      pagination : {has_next_page : false}
    }
  }
}


//current seasons
export async function fetchCurrentSeason(page: number = 1): Promise<SeasonResponse> {
  try {
    const url = `https://api.jikan.moe/v4/seasons/now?page=${page}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const { data, pagination } = await res.json();
    return {
      animes: data as Anime[],
      pagination: { has_next_page: pagination.has_next_page },
    };
  } catch (error) {
    console.error("Error fetching current season:", error);
    return { animes: [], pagination: { has_next_page: false } };
  }
}