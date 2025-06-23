
import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import { movieKeys } from './queryKeys';
import type { SearchParams, MovieListParams } from '@/types/api';

export const useNewMovies = (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v1') => {
  return useQuery({
    queryKey: movieKeys.newMovies(page, version),
    queryFn: () => movieService.getNewMovies(page, version),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMovieDetail = (slug: string) => {
  return useQuery({
    queryKey: movieKeys.detail(slug),
    queryFn: () => movieService.getMovieDetail(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMovieList = (params: MovieListParams) => {
  return useQuery({
    queryKey: movieKeys.list(params),
    queryFn: () => movieService.getMovieList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchMovies = (params: SearchParams) => {
  return useQuery({
    queryKey: movieKeys.search(params),
    queryFn: () => movieService.searchMovies(params),
    enabled: !!params.keyword,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: movieKeys.categories(),
    queryFn: () => movieService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useMoviesByCategory = (categorySlug: string, params: Omit<SearchParams, 'keyword'> = {}) => {
  return useQuery({
    queryKey: movieKeys.categoryMovies(categorySlug, params),
    queryFn: () => movieService.getMoviesByCategory(categorySlug, params),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: movieKeys.countries(),
    queryFn: () => movieService.getCountries(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useMoviesByCountry = (countrySlug: string, params: Omit<SearchParams, 'keyword'> = {}) => {
  return useQuery({
    queryKey: movieKeys.countryMovies(countrySlug, params),
    queryFn: () => movieService.getMoviesByCountry(countrySlug, params),
    enabled: !!countrySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMoviesByYear = (year: number, params: Omit<SearchParams, 'keyword' | 'year'> = {}) => {
  return useQuery({
    queryKey: movieKeys.yearMovies(year, params),
    queryFn: () => movieService.getMoviesByYear(year, params),
    enabled: !!year,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
