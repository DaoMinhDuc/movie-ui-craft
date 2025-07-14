
import type { SearchParams, MovieListParams, CategoryParams, CountryParams, YearParams } from '@/types/movie';

// Auth query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

// Movie query keys
export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (params: MovieListParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (slug: string) => [...movieKeys.details(), slug] as const,
  search: (params: SearchParams) => [...movieKeys.all, 'search', params] as const,
  newMovies: (page: number, version: 'v1' | 'v2' | 'v3') => 
    [...movieKeys.all, 'new', page, version] as const,
  categories: () => ['categories'] as const,
  categoryMovies: (slug: string, params: CategoryParams) => 
    ['categories', slug, params] as const,
  countries: () => ['countries'] as const,
  countryMovies: (slug: string, params: CountryParams) => 
    ['countries', slug, params] as const,
  yearMovies: (year: number, params: YearParams) => 
    ['years', year, params] as const,
};
