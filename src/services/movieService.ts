
import api from './api';
import { API_CONFIG } from '@/config/api';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  Movie, 
  MovieDetail, 
  MovieDetailResponse,
  Category, 
  SearchParams, 
  MovieListParams 
} from '@/types/movie';

export const movieService = {
  // Lấy danh sách phim mới cập nhật
  getNewMovies: async (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v2') => {
    const endpoint = version === 'v1' 
      ? API_CONFIG.ENDPOINTS.NEW_MOVIES
      : version === 'v2' 
      ? API_CONFIG.ENDPOINTS.NEW_MOVIES_V2
      : API_CONFIG.ENDPOINTS.NEW_MOVIES_V3;
    
    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${endpoint}?page=${page}`
    );
    return data;
  },

  // Lấy chi tiết phim - sử dụng slug
  getMovieDetail: async (slug: string): Promise<MovieDetailResponse> => {
    const { data } = await api.get<MovieDetailResponse>(
      `${API_CONFIG.ENDPOINTS.MOVIE_DETAIL}/${slug}`
    );
    return data;
  },

  // Lấy danh sách phim theo loại
  getMovieList: async (params: MovieListParams) => {
    const { type_list, ...queryParams } = params;
    const searchParams = new URLSearchParams();
    
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const url = queryString 
      ? `${API_CONFIG.ENDPOINTS.MOVIE_LIST}/${type_list}?${queryString}`
      : `${API_CONFIG.ENDPOINTS.MOVIE_LIST}/${type_list}`;

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },

  // Tìm kiếm phim
  searchMovies: async (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${API_CONFIG.ENDPOINTS.SEARCH}?${searchParams.toString()}`
    );
    return data;
  },

  // Lấy danh sách thể loại
  getCategories: async () => {
    const { data } = await api.get<ApiResponse<Category[]>>(
      API_CONFIG.ENDPOINTS.CATEGORIES
    );
    return data;
  },

  getMoviesByCategory: async (categorySlug: string, params: Omit<SearchParams, 'keyword'> = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const url = queryString 
      ? `${API_CONFIG.ENDPOINTS.CATEGORY_DETAIL}/${categorySlug}?${queryString}`
      : `${API_CONFIG.ENDPOINTS.CATEGORY_DETAIL}/${categorySlug}`;

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },

  getMoviesByCountry: async (countrySlug: string, params: Omit<SearchParams, 'keyword'> = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const url = queryString 
      ? `${API_CONFIG.ENDPOINTS.COUNTRY_DETAIL}/${countrySlug}?${queryString}`
      : `${API_CONFIG.ENDPOINTS.COUNTRY_DETAIL}/${countrySlug}`;

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },

  getMoviesByYear: async (year: number, params: Omit<SearchParams, 'keyword' | 'year'> = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const url = queryString 
      ? `${API_CONFIG.ENDPOINTS.YEAR}/${year}?${queryString}`
      : `${API_CONFIG.ENDPOINTS.YEAR}/${year}`;

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  }
};
