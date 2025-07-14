import apiClient from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  Movie, 
  MovieDetailResponse,
  Category, 
  Country,
  SearchParams, 
  MovieListParams,
  CategoryParams,
  CountryParams,
  YearParams
} from '@/types/movie';

// Movies API
export const moviesApi = {
  // Get new movies
  getNewMovies: async (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v2') => {
    const endpoint = version === 'v1' 
      ? API_CONFIG.ENDPOINTS.NEW_MOVIES
      : version === 'v2' 
      ? API_CONFIG.ENDPOINTS.NEW_MOVIES_V2
      : API_CONFIG.ENDPOINTS.NEW_MOVIES_V3;
    
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${endpoint}?page=${page}`
    );
    
    // Handle various API response formats
    if (!data) {
      throw new Error('Empty API response');
    }
    
    // Case 1: Standard format with data.data.items
    if (data.data?.items) {
      return data;
    }
    
    // Case 2: Array directly in data.data
    if (Array.isArray(data.data)) {
      return {
        ...data,
        data: {
          items: data.data,
          params: {
            pagination: {
              totalItems: data.data.length,
              totalItemsPerPage: data.data.length,
              currentPage: page,
              totalPages: 1
            }
          }
        }
      };
    }
    
    // Case 3: Items at the top level
    if (typeof data === 'object' && 'items' in data) {
      return {
        status: true,
        data: {
          items: (data as unknown as { items: Movie[] }).items,
          params: {
            pagination: {
              totalItems: (data as unknown as { items: Movie[] }).items.length,
              totalItemsPerPage: (data as unknown as { items: Movie[] }).items.length,
              currentPage: page,
              totalPages: 1
            }
          }
        }
      };
    }
    
    // Case 4: Array directly as the response
    if (Array.isArray(data)) {
      return {
        status: true,
        data: {
          items: data as unknown as Movie[],
          params: {
            pagination: {
              totalItems: data.length,
              totalItemsPerPage: data.length,
              currentPage: page,
              totalPages: 1
            }
          }
        }
      };
    }
    
    // If we couldn't adapt the data
    throw new Error('Unknown API response format');
  },

  // Get movie detail by slug
  getMovieDetail: async (slug: string): Promise<MovieDetailResponse> => {
    const { data } = await apiClient.get<MovieDetailResponse>(
      `${API_CONFIG.ENDPOINTS.MOVIE_DETAIL}/${slug}`
    );
    return data;
  },

  // Get movie list by type
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

    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },

  // Search movies
  searchMovies: async (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(
      `${API_CONFIG.ENDPOINTS.SEARCH}?${searchParams.toString()}`
    );
    return data;
  },

  // Get categories
  getCategories: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>(
      API_CONFIG.ENDPOINTS.CATEGORIES
    );
    return data;
  },

  // Get movies by category
  getMoviesByCategory: async (categorySlug: string, params: CategoryParams = {}) => {
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

    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },

  // Get countries
  getCountries: async () => {
    const { data } = await apiClient.get<ApiResponse<Country[]>>(
      API_CONFIG.ENDPOINTS.COUNTRIES
    );
    return data;
  },

  // Get movies by country
  getMoviesByCountry: async (countrySlug: string, params: CountryParams = {}) => {
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

    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },

  // Get movies by year
  getMoviesByYear: async (year: number, params: YearParams = {}) => {
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

    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(url);
    return data;
  },
};
