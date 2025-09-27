export default interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_name: string;
  genre_ids: number[];
  origin_country: string[];
  adult : boolean;
}
