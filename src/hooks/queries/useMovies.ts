import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { moviesApi } from '@/services/movieApi';
import type { MovieListParams, SearchParams } from '@/types/movie';
import { movieKeys } from '@/hooks/queryKeys';

// Get new movies
export const useNewMoviesQuery = (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v2') => {
  return useQuery({
    queryKey: movieKeys.newMovies(page, version),
    queryFn: () => moviesApi.getNewMovies(page, version),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  params: Omit<SearchParams, 'keyword'> = {}
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
  params: Omit<SearchParams, 'keyword'> = {}
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
