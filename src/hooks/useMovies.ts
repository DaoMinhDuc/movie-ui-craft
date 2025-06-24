
import { useState, useEffect } from 'react';
import { movieService } from '@/services/movieService';
import type { Movie, MovieDetail, Category, Country, SearchParams, MovieListParams } from '@/types/movie';

export const useNewMovies = (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v1') => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await movieService.getNewMovies(page, version);
        setData(response.data.items || []);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, version]);

  return { data, loading, error };
};

export const useMovieDetail = (slug: string) => {
  const [data, setData] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovieDetail(slug);
        setData(response.data.item);
        setError(null);
      } catch (err) {
        setError(err as Error);
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
        setData(response.data.items || []);
        setError(null);
      } catch (err) {
        setError(err as Error);
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
        setData(response.data.items || []);
        setError(null);
      } catch (err) {
        setError(err as Error);
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
        setData(response.data || []);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
