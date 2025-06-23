
import type { SearchParams, MovieListParams } from '@/types/api';

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
  categoryMovies: (slug: string, params: Omit<SearchParams, 'keyword'>) => 
    ['categories', slug, params] as const,
  countries: () => ['countries'] as const,
  countryMovies: (slug: string, params: Omit<SearchParams, 'keyword'>) => 
    ['countries', slug, params] as const,
  yearMovies: (year: number, params: Omit<SearchParams, 'keyword' | 'year'>) => 
    ['years', year, params] as const,
};
