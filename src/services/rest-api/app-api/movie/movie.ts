
import { BaseJSONResponse, PaginationParams, ExtendingParams, Movie, MovieDetail, Category, Country, SearchParams, MovieListParams } from '../types';
import { movieServiceInstance } from './_service-instance';

const apiPrefix = '';

// API Methods
const fetchNewMovies = (params: PaginationParams<{ version?: 'v1' | 'v2' | 'v3' }>) => {
  const { version = 'v1', page = 1, ...rest } = params;
  const endpoint = version === 'v1' 
    ? '/danh-sach/phim-moi-cap-nhat'
    : version === 'v2' 
    ? '/danh-sach/phim-moi-cap-nhat-v2'
    : '/danh-sach/phim-moi-cap-nhat-v3';
    
  return movieServiceInstance.get<BaseJSONResponse<Movie>>(`${endpoint}?page=${page}`, { params: rest });
};

const fetchMovieDetail = ({ slug, ...params }: ExtendingParams<{ slug: string }>) =>
  movieServiceInstance.get<{ status: boolean; msg: string; data: { item: MovieDetail } }>(`/phim/${slug}`, { params });

const fetchMovieList = (params: MovieListParams) => {
  const { type_list, ...queryParams } = params;
  return movieServiceInstance.get<BaseJSONResponse<Movie>>(`/v1/api/danh-sach/${type_list}`, { params: queryParams });
};

const searchMovies = (params: SearchParams) =>
  movieServiceInstance.get<BaseJSONResponse<Movie>>('/v1/api/tim-kiem', { params });

const fetchCategories = () =>
  movieServiceInstance.get<{ status: boolean; msg: string; data: Category[] }>('/the-loai');

const fetchMoviesByCategory = (params: ExtendingParams<{ categorySlug: string }>) => {
  const { categorySlug, ...queryParams } = params;
  return movieServiceInstance.get<BaseJSONResponse<Movie>>(`/v1/api/the-loai/${categorySlug}`, { params: queryParams });
};

const fetchCountries = () =>
  movieServiceInstance.get<{ status: boolean; msg: string; data: Country[] }>('/quoc-gia');

const fetchMoviesByCountry = (params: ExtendingParams<{ countrySlug: string }>) => {
  const { countrySlug, ...queryParams } = params;
  return movieServiceInstance.get<BaseJSONResponse<Movie>>(`/v1/api/quoc-gia/${countrySlug}`, { params: queryParams });
};

const fetchMoviesByYear = (params: ExtendingParams<{ year: number }>) => {
  const { year, ...queryParams } = params;
  return movieServiceInstance.get<BaseJSONResponse<Movie>>(`/v1/api/nam/${year}`, { params: queryParams });
};

export const movieApi = Object.freeze({
  fetchNewMovies,
  fetchMovieDetail,
  fetchMovieList,
  searchMovies,
  fetchCategories,
  fetchMoviesByCategory,
  fetchCountries,
  fetchMoviesByCountry,
  fetchMoviesByYear,
});
