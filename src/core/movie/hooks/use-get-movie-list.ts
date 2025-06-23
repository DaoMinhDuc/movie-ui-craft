
import { useMemo } from 'react';
import { ObjectKey, useAxiosSWR } from '@/shared/hooks/use-axios-swr';
import { FETCH_MOVIE_LIST } from '@/constants/swr-keys';
import { movieApi } from '@/services/rest-api/app-api/movie/movie';
import { MovieListParams } from '@/services/rest-api/app-api/types';

type TFetchingKey = ObjectKey<MovieListParams>;

const fetcher = ({ key, ...params }: TFetchingKey) => movieApi.fetchMovieList(params);

export const useGetMovieList = (params: MovieListParams) => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useAxiosSWR(
    {
      key: FETCH_MOVIE_LIST,
      ...params,
    } as TFetchingKey,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  const movieList = useMemo(() => data?.data?.items ?? [], [data]);

  return {
    data,
    movieList,
    error,
    isLoading,
    refetch,
  };
};
