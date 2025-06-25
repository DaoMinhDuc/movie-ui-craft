
export interface ApiResponse<T> {
  status: boolean;
  msg: string;
  data: T;
}

export interface MovieDetailResponse {
  status: boolean;
  msg: string;
  movie: MovieDetail;
  episodes: Episode[];
}

export interface PaginatedResponse<T> {
  items: T[];
  params: {
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      totalPages: number;
    };
  };
}

export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
}

export interface MovieDetail extends Movie {
  tmdb?: {
    type: string;
    id: string;
    season?: number;
    vote_average?: number;
    vote_count?: number;
  };
  imdb?: {
    id: string | null;
  };
}

export interface Episode {
  server_name: string;
  server_data: EpisodeData[];
}

export interface EpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface SearchParams {
  keyword?: string;
  page?: number;
  sort_field?: 'modified.time' | '_id' | 'year';
  sort_type?: 'desc' | 'asc';
  sort_lang?: 'vietsub' | 'thuyet-minh' | 'long-tieng';
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
}

export interface MovieListParams extends Omit<SearchParams, 'keyword'> {
  type_list: 'phim-bo' | 'phim-le' | 'tv-shows' | 'hoat-hinh' | 'phim-vietsub' | 'phim-thuyet-minh' | 'phim-long-tieng';
}
