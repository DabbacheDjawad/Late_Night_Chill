import { StaticImport } from "next/dist/shared/lib/get-img-props";
export interface Anime {
  mal_id: number;

  titles: {
    type: string; 
    title: string;
  }[];

  synopsis?: string;
  background ?: string;
  score?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;

  episodes?: number;
  status?: string;
  rating?: string; 
  season?: string; 
  year?: number;
  type?: string; 

  duration?: string;
  source?: string; 

  aired?: {
    from?: string;
    to?: string;
    prop?: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
    string?: string;
  };

  images: {
    jpg: { image_url: string };
    webp?: { image_url: string };
  };

  genres: {
    mal_id: number;
    name: string;
  }[];

  themes?: {
    mal_id: number;
    name: string;
  }[];

  studios?: {
    mal_id: number;
    name: string;
  }[];

  producers?: {
    mal_id: number;
    name: string;
  }[];

  licensors?: {
    mal_id: number;
    name: string;
  }[];

  trailer?: {
    url?: string;
    youtube_id?: string;
    embed_url : string;
    images?: {
      image_url?: string;
      small_image_url?: string;
      medium_image_url?: string;
      maximum_image_url?: string;
    };
  };
}

export interface AnimeResponse {
  animes: Anime[];
  hasMore: boolean;
}


export interface AnimeEpisode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  title_romanji: string;
  aired: string;
  score: number | null;
  filler: boolean;
  recap: boolean;
  forum_url: string;
}

export interface Pagination {
  last_visible_page?: number;
  has_next_page: boolean;
}

export interface EpisodesResponse {
  data: AnimeEpisode[];
  pagination: Pagination;
}


//Character
export interface AnimeCharacter {
  data: {
    character: {
      mal_id: number;
      url: string;
      images: {
        jpg?: { image_url: string };
        webp?: { image_url: string };
        [key: string]: any;
      };
      name: string;
    };
    role: string;
    voice_actors: {
      person: {
        mal_id?: number;
        url?: string;
        images?: {
          jpg?: { image_url: string };
        };
        name?: string;
      };
      language: string;
    }[];
  }[];
}


export interface TopCharacter {
  mal_id: number;
  url: string;
  images: {
    jpg?: { image_url: string };
    webp?: { image_url: string };
  };
  name: string;
  nicknames?: string[];
  favorites: number;
  about?: string;
  rank?:number
}


export type Rating = "g" | "pg" | "pg13" | "r17" | "r" | "rx" | undefined;
export type type = "tv" | "movie" | "ova" | "special" | "ona" | "music" | undefined;
export type orderBy =
  | "mal_id"
  | "title"
  | "start_date"
  | "end_date"
  | "episodes"
  | "score"
  | "scored_by"
  | "rank"
  | "popularity"
  | "members"
  | "favorites";
  export type Sort = "asc"|"desc"|undefined;


export interface Episode {
    mal_id: number;
    title: string;
    url: string;
    images: {
      jpg: { image_url: string };
      webp?: { image_url: string };
    };
  latestEpisode: {
    mal_id: number;
    url: string;
    title: string;
    aired: string;
    score: number | null;
  };
}

export interface CharactersResponse {
  characters: TopCharacter[];
  pagination:Pagination
}

export interface SeasonResponse {
  animes: Anime[];
  pagination:Pagination
}