import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { moviesApi } from '@/services/movieApi';
import type { MovieListParams, SearchParams, CategoryParams, CountryParams, YearParams } from '@/types/movie';
import { movieKeys } from '@/hooks/queryKeys';

// Get new movies
export const useNewMoviesQuery = (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v2') => {
  return useQuery({
    queryKey: movieKeys.newMovies(page, version),
    queryFn: () => moviesApi.getNewMovies(page, version),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry failed requests up to 2 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
  });
};

// Get movie detail
export const useMovieDetailQuery = (slug: string) => {
  return useQuery({
    queryKey: movieKeys.detail(slug),
    queryFn: () => moviesApi.getMovieDetail(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get movie list
export const useMovieListQuery = (params: MovieListParams) => {
  return useQuery({
    queryKey: movieKeys.list(params),
    queryFn: () => moviesApi.getMovieList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get infinite movie list (for pagination)
export const useInfiniteMovieListQuery = (params: MovieListParams) => {
  return useInfiniteQuery({
    queryKey: movieKeys.list(params),
    queryFn: ({ pageParam = 1 }) => 
      moviesApi.getMovieList({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Check if there's a next page based on your API response structure
      if (!lastPage.data) return undefined;
      
      const { currentPage, totalPages } = lastPage.data.params.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Search movies
export const useSearchMoviesQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: movieKeys.search(params),
    queryFn: () => moviesApi.searchMovies(params),
    enabled: !!params.keyword,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Get infinite search results (for pagination)
export const useInfiniteSearchMoviesQuery = (params: SearchParams) => {
  return useInfiniteQuery({
    queryKey: movieKeys.search(params),
    queryFn: ({ pageParam = 1 }) => 
      moviesApi.searchMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Check if there's a next page based on your API response structure
      if (!lastPage.data) return undefined;
      
      const { currentPage, totalPages } = lastPage.data.params.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!params.keyword,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Get categories
export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: movieKeys.categories(),
    queryFn: () => moviesApi.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get movies by category
export const useMoviesByCategoryQuery = (
  categorySlug: string, 
  params: CategoryParams = {}
) => {
  return useQuery({
    queryKey: movieKeys.categoryMovies(categorySlug, params),
    queryFn: () => moviesApi.getMoviesByCategory(categorySlug, params),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get infinite movies by category (for pagination)
export const useInfiniteMoviesByCategoryQuery = (
  categorySlug: string, 
  params: CategoryParams = {}
) => {
  return useInfiniteQuery({
    queryKey: movieKeys.categoryMovies(categorySlug, params),
    queryFn: ({ pageParam = 1 }) => 
      moviesApi.getMoviesByCategory(categorySlug, { ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Check if there's a next page based on your API response structure
      if (!lastPage.data) return undefined;
      
      const { currentPage, totalPages } = lastPage.data.params.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get countries
export const useCountriesQuery = () => {
  return useQuery({
    queryKey: movieKeys.countries(),
    queryFn: () => moviesApi.getCountries(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get movies by country
export const useMoviesByCountryQuery = (
  countrySlug: string, 
  params: CountryParams = {}
) => {
  return useQuery({
    queryKey: movieKeys.countryMovies(countrySlug, params),
    queryFn: () => moviesApi.getMoviesByCountry(countrySlug, params),
    enabled: !!countrySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get infinite movies by country (for pagination)
export const useInfiniteMoviesByCountryQuery = (
  countrySlug: string, 
  params: CountryParams = {}
) => {
  return useInfiniteQuery({
    queryKey: movieKeys.countryMovies(countrySlug, params),
    queryFn: ({ pageParam = 1 }) => 
      moviesApi.getMoviesByCountry(countrySlug, { ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Check if there's a next page based on your API response structure
      if (!lastPage.data) return undefined;
      
      const { currentPage, totalPages } = lastPage.data.params.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!countrySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get movies by year
export const useMoviesByYearQuery = (
  year: number, 
  params: YearParams = {}
) => {
  return useQuery({
    queryKey: movieKeys.yearMovies(year, params),
    queryFn: () => moviesApi.getMoviesByYear(year, params),
    enabled: !!year,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get infinite movies by year (for pagination)
export const useInfiniteMoviesByYearQuery = (
  year: number, 
  params: YearParams = {}
) => {
  return useInfiniteQuery({
    queryKey: movieKeys.yearMovies(year, params),
    queryFn: ({ pageParam = 1 }) => 
      moviesApi.getMoviesByYear(year, { ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Check if there's a next page based on your API response structure
      if (!lastPage.data) return undefined;
      
      const { currentPage, totalPages } = lastPage.data.params.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!year,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
