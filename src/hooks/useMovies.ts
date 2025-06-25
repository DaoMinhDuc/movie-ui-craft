
import { useState, useEffect } from 'react';
import { movieService } from '@/services/movieService';
import type { Movie, MovieDetail, Category, SearchParams, MovieListParams, MovieDetailResponse, Episode } from '@/types/movie';

export const useNewMovies = (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v1') => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await movieService.getNewMovies(page, version);
        console.log('useNewMovies response:', response);
        
        // Kiểm tra response structure an toàn
        if (response?.data?.items && Array.isArray(response.data.items)) {
          setData(response.data.items);
        } else if (response?.items && Array.isArray(response.items)) {
          // Fallback cho trường hợp response trực tiếp chứa items
          setData(response.items);
        } else {
          console.warn('Invalid response structure for new movies:', response);
          setData([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching new movies:', err);
        setError(err as Error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, version]);

  return { data, loading, error };
};

export const useMovieDetail = (slug: string) => {
  const [data, setData] = useState<{ movie: MovieDetail; episodes: Episode[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response: MovieDetailResponse = await movieService.getMovieDetail(slug);
        console.log('useMovieDetail response:', response);
        
        if (response?.movie) {
          setData({
            movie: response.movie,
            episodes: response.episodes || []
          });
        } else {
          throw new Error('Invalid movie detail response');
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching movie detail:', err);
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error };
};

export const useMovieList = (params: MovieListParams) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovieList(params);
        console.log('useMovieList response:', response);
        
        // Kiểm tra response structure an toàn
        if (response?.data?.items && Array.isArray(response.data.items)) {
          setData(response.data.items);
        } else if (response?.items && Array.isArray(response.items)) {
          setData(response.items);
        } else {
          console.warn('Invalid response structure for movie list:', response);
          setData([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching movie list:', err);
        setError(err as Error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
};

export const useSearchMovies = (params: SearchParams) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!params.keyword) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await movieService.searchMovies(params);
        console.log('useSearchMovies response:', response);
        
        // Kiểm tra response structure an toàn
        if (response?.data?.items && Array.isArray(response.data.items)) {
          setData(response.data.items);
        } else if (response?.items && Array.isArray(response.items)) {
          setData(response.items);
        } else {
          console.warn('Invalid response structure for search:', response);
          setData([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError(err as Error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
};

export const useCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await movieService.getCategories();
        console.log('useCategories response:', response);
        
        // Kiểm tra response structure an toàn
        if (response?.data && Array.isArray(response.data)) {
          setData(response.data);
        } else if (Array.isArray(response)) {
          setData(response);
        } else {
          console.warn('Invalid response structure for categories:', response);
          setData([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err as Error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
