import Movie from '@/types/Movie';
import TvShow from '@/types/Show';

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
