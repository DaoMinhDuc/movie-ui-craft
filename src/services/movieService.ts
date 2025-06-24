
import api from './api';
import { API_CONFIG } from '@/config/api';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  Movie, 
  MovieDetail, 
  Category, 
  Country, 
  SearchParams, 
  MovieListParams 
} from '@/types/movie';

export const movieService = {
  // Lấy danh sách phim mới cập nhật
  getNewMovies: async (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v1') => {
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

  // Lấy chi tiết phim
  getMovieDetail: async (slug: string) => {
    const { data } = await api.get<ApiResponse<{ item: MovieDetail }>>(
      `${API_CONFIG.ENDPOINTS.MOVIE_DETAIL}/${slug}`
    );
    return data;
  },

  // Lấy danh sách phim theo loại
  getMovieList: async (params: MovieListParams) => {
    const { type_list, ...queryParams } = params;
    const searchParams = new URLSearchParams();
    
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${API_CONFIG.ENDPOINTS.MOVIE_LIST}/${type_list}?${searchParams.toString()}`
    );
    return data;
  },

  // Tìm kiếm phim
  searchMovies: async (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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

  // Lấy phim theo thể loại
  getMoviesByCategory: async (categorySlug: string, params: Omit<SearchParams, 'keyword'> = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${API_CONFIG.ENDPOINTS.CATEGORY_DETAIL}/${categorySlug}?${searchParams.toString()}`
    );
    return data;
  },

  // Lấy danh sách quốc gia
  getCountries: async () => {
    const { data } = await api.get<ApiResponse<Country[]>>(
      API_CONFIG.ENDPOINTS.COUNTRIES
    );
    return data;
  },

  // Lấy phim theo quốc gia
  getMoviesByCountry: async (countrySlug: string, params: Omit<SearchParams, 'keyword'> = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${API_CONFIG.ENDPOINTS.COUNTRY_DETAIL}/${countrySlug}?${searchParams.toString()}`
    );
    return data;
  },

  // Lấy phim theo năm
  getMoviesByYear: async (year: number, params: Omit<SearchParams, 'keyword' | 'year'> = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const { data } = await api.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${API_CONFIG.ENDPOINTS.YEAR}/${year}?${searchParams.toString()}`
    );
    return data;
  }
};
