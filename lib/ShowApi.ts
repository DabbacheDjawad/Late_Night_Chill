import Movie from '@/types/Movie';
import TvShow from '@/types/Show';
import { MovieDetails } from '@/types/Movie';
import { TVShowDetails } from '@/types/Show';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

interface ShowsResponse {
  shows: (Movie | TvShow)[];
  hasMore: boolean;
}

export async function fetchInitialShows(
  type: 'movie' | 'tv',
  searchQuery?: string
): Promise<ShowsResponse> {
  try {
    const endpoint = searchQuery
      ? `${TMDB_BASE_URL}/search/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchQuery}&page=1`
      : `${TMDB_BASE_URL}/${type}/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const shows = data.results || [];

    return {
      shows,
      hasMore: data.page < data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching initial shows:', error);
    return { shows: [], hasMore: false };
  }
}

export async function fetchMoreShows(
  type: 'movie' | 'tv',
  page: number,
  searchQuery?: string
): Promise<ShowsResponse> {
  try {
    const endpoint = searchQuery
      ? `${TMDB_BASE_URL}/search/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchQuery}&page=${page}`
      : `${TMDB_BASE_URL}/${type}/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const shows = data.results || [];

    return {
      shows,
      hasMore: data.page < data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching more shows:', error);
    return { shows: [], hasMore: false };
  }
}


//details
export async function getShowDetails(
  type: "movie" | "tv",
  id: number
): Promise<MovieDetails | TVShowDetails | null> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error("Error with status: " + res.status);
    }

    const show = await res.json();
    if (type === "movie") return show as MovieDetails;
    return show as TVShowDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}


//top Rated Movies
export async function fetchTopRatedMovies(page: number = 1): Promise<{ shows: Movie[], hasMore: boolean }> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Failed to fetch top rated movies");

  const data = await res.json();

  return {
    shows: data.results as Movie[],
    hasMore: page < data.total_pages,
  };
}


//LATEST MOVIES
export async function fetchLatestMovies(
  page: number = 1
): Promise<{ movies: Movie[]; hasMore: boolean }> {
  const query = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
    language: "en-US",
    page: String(page),
  });

  const res = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?${query.toString()}`,
    { next: { revalidate: 1800 } }
  );

  if (!res.ok) throw new Error("Failed to fetch latest movies");

  const data = await res.json();

  return {
    movies: data.results as Movie[],
    hasMore: page < data.total_pages,
  };
}

//POPULAR MOVIES
export async function fetchPopularMovies(
  page: number = 1
): Promise<{ movies: Movie[]; hasMore: boolean }> {
  const query = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
    language: "en-US",
    page: String(page),
  });

  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?${query.toString()}`,
    { next: { revalidate: 1800 } }
  );

  if (!res.ok) throw new Error("Failed to fetch popular movies");

  const data = await res.json();

  return {
    movies: data.results as Movie[],
    hasMore: page < data.total_pages,
  };
}


//TV SHOW SEASONS
export async function fetchTvShowSeasons(tvId: string) {
  const query = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
    language: "en-US",
  });

  const res = await fetch(
    `${TMDB_BASE_URL}/tv/${tvId}?${query.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Failed to fetch TV show seasons");

  const data = await res.json();

  return data.seasons;
}


//SEASONS EPISODES
export async function fetchTvSeasonEpisodes(tvId: string, seasonNumber: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 60 * 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch season episodes" + res.status);
  }

  return res.json();
}


//TOP TV SHOWS
export async function fetchTopRatedTv(page: number = 1): Promise<{ shows: TvShow[], hasMore: boolean }> {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
    {cache : "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch top rated TV shows");
  }

  const data = await res.json();
 return {
    shows: data.results as TvShow[],
    hasMore: page < data.total_pages,
  };
}


//POPULAR TV SHOWS
export async function fetchPopularTv(page: number = 1): Promise<{ shows: TvShow[], hasMore: boolean }> {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 60 * 60 } } // cache 1h
  );

  if (!res.ok) {
    throw new Error("Failed to fetch popular TV shows");
  }

  const data = await res.json();
 return {
    shows: data.results as TvShow[],
    hasMore: page < data.total_pages,
  };
}


//LATEST TV SHOW
export async function fetchLatestTv(page = 1) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const res = await fetch(
      `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=first_air_date.desc&first_air_date.lte=${new Date().toISOString().split("T")[0]}&vote_count.gte=10&with_original_language=en&page=${page}`,
      { next: { revalidate: 60 * 60 } }
    );

    if (!res.ok) throw new Error("Failed to fetch latest TV shows");

    const data = await res.json();

    const filtered = data.results.filter((show: any) => {
      if (!show.first_air_date || !show.poster_path) return false;

      const airDate = new Date(show.first_air_date);
      if (isNaN(airDate.getTime())) return false;

      return airDate <= today;
    });

    const hasMore = data.page < data.total_pages;

    return { shows: filtered, hasMore };
  } catch (error) {
    console.error("Error fetching latest TV shows:", error);
    return { shows: [], hasMore: false };
  }
}
